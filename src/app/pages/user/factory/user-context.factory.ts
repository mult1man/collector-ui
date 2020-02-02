import {User} from '../model/user.model';
import {UserContext} from '../model/user-context.model';
import {Injectable} from '@angular/core';
import {NGXLogger} from 'ngx-logger';

@Injectable({providedIn: 'root'})
export class UserContextFactory {

  constructor(private log: NGXLogger) {
  }

  create(user: User): UserContext {
    const userContext = new UserContext();
    userContext.user = user;
    return userContext;
  }

}
