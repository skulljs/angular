import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SessionService {
  isLogged() {
    return true;
  }

  isAdmin() {
    return true;
  }
}
