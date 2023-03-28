import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { Roles } from './roles';
import { SessionService } from 'src/app/services/session/session-service.service';

export const isAuthorizedGuard = (route: ActivatedRouteSnapshot) => {
  const authorize = route.data['authorize'];
  return validate(authorize);
};

async function validate(authorize: Roles[]) {
  const sessionService = inject(SessionService);
  const router = inject(Router);

  if (!authorize) {
    return true;
  }

  let isAuthorized = false;
  let isLogged = false;

  if (authorize.includes(Roles.NonLoggedUser)) {
    isAuthorized = !sessionService.isLogged();
  }

  if (authorize.includes(Roles.LoggedUser)) {
    isAuthorized = sessionService.isLogged();
    isLogged = true;
  }

  if (authorize.includes(Roles.Admin)) {
    isAuthorized = sessionService.isAdmin();
    isLogged = true;
  }

  if (!isAuthorized && !isLogged) {
    router.navigate(['/auth']);
  }

  if (!isAuthorized && isLogged) {
    router.navigate(['']);
  }

  return isAuthorized;
}
