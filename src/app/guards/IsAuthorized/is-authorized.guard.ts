import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { Roles } from './roles';
import { SessionService } from 'src/app/services/session/session-service.service';

export const isAuthorizedGuard = (route: ActivatedRouteSnapshot) => {
  const roles = route.data['authorize'];
  const minimunRoleMode = route.data['minimunRoleMode'] ?? true;
  return validate(roles, minimunRoleMode);
};

async function validate(roles: Roles[], minimunRoleMode: boolean) {
  const sessionService = inject(SessionService);
  const router = inject(Router);
  const userRole = sessionService.getRole();

  // ? Public
  if (!roles) return true;
  if (!userRole) return false;

  let isAuthorized = false;
  if (minimunRoleMode) {
    // ? Minimun Role Mode == check if the user have the listed role or a superior one
    if (roles.length != 1) {
      throw new Error("[IsAuthorizedGuard] Can't declare more than one role in minimunRoleMode ");
    } else {
      isAuthorized = userRole >= roles[0];
    }
  } else {
    // ? List Role Mode == check if the user have one of the listed roles
    roles.forEach((role) => {
      if (!isAuthorized) {
        isAuthorized = userRole == role;
      }
    });
  }

  if (!isAuthorized) {
    if (roles.includes(Roles.NonLoggedUser)) router.navigate(['']);
    if (roles.includes(Roles.LoggedUser)) router.navigate(['/auth']);
    if (roles.includes(Roles.Admin)) router.navigate(['']);
  }

  return isAuthorized;
}
