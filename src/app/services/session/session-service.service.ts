import { Injectable } from '@angular/core';
import { Roles } from '../../guards/IsAuthorized/roles';

@Injectable({
  providedIn: 'root',
})
export class SessionService {
  // Replace with call to backend => return session role
  getRole() {
    return Roles.Admin;
  }
}
