import {Injectable} from '@angular/core';
import {UserContext} from './user-context.model';

@Injectable({providedIn: 'root'})
export class UserContextHolder {

  private static readonly USER_CONTEXT_KEY: string = 'userContext';
  private userContext: UserContext;

  get(): UserContext {
    if (this.userContext) {
      return this.userContext;
    }

    const userContextAsString = localStorage.getItem(UserContextHolder.USER_CONTEXT_KEY);
    if (userContextAsString) {
      this.userContext = JSON.parse(userContextAsString);
      return this.userContext;
    }

    return null;
  }

  set(userContext: UserContext) {
    this.userContext = userContext;
    localStorage.setItem(UserContextHolder.USER_CONTEXT_KEY, JSON.stringify(userContext));
  }

  delete() {
    this.userContext = null;
    localStorage.removeItem(UserContextHolder.USER_CONTEXT_KEY);
  }

}
