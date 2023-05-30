import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { Roles } from './roles';
import { SessionService } from 'src/app/services/session/session-service.service';

export const isAuthorizedGuard = (route: ActivatedRouteSnapshot) => {
  const roles: Roles[] = route.data['authorize'];
  const minimunRoleMode: boolean = route.data['minimunRoleMode'] ?? true;
  const fallbackRoute: string = route.data['fallbackRoute'] ?? '';
  return validate(roles, minimunRoleMode, fallbackRoute);
};

async function validate(roles: Roles[], minimunRoleMode: boolean, fallbackRoute: string) {
  const sessionService = inject(SessionService);
  const router = inject(Router);
  const userRole = sessionService.getRole();

  // ? Public
  if (!roles) return true;
  if (!userRole) return false;

  let isAuthorized = false;
  if (minimunRoleMode) {
    // ? Minimun Role Mode == check if the user have the listed role or a superior one
    if (roles.length != 1) throw new Error("[IsAuthorizedGuard] Can't declare more than one role in minimunRoleMode ");
    isAuthorized = userRole >= roles[0];
  } else {
    // ? List Role Mode == check if the user have one of the listed roles
    isAuthorized = roles.some((role) => userRole == role);
  }

  if (!isAuthorized) {
    router.navigateByUrl(fallbackRoute);
  }

  return isAuthorized;
}
