import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { isAuthorizedGuard } from './guards/IsAuthorized/is-authorized.guard';
import { Roles } from './guards/IsAuthorized/roles';

const routes: Routes = [
  // ? Example of IsAuthorizedGuard usage
  // {
  //   path: 'admin',
  //   component: AdminComponent,
  //   canActivate: [isAuthorizedGuard],
  //   data: {
  //     authorize: [Roles.Admin],
  //     minimunRoleMode: true,
  //     fallbackRoute: '/auth',
  //   },
  // },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
