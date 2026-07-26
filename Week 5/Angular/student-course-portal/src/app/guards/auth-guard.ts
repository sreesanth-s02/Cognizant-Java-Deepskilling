import { CanActivateFn } from '@angular/router';

export const authGuard: CanActivateFn = () => {

  const loggedIn = true;

  return loggedIn;

};