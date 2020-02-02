import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {SecurityContextService} from './security-context.service';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Credentials} from '../model/credentials.model';
import {SecurityContext} from '../model/security-context.model';
import {NGXLogger} from 'ngx-logger';
import {JwtHelperService} from '@auth0/angular-jwt';
import {UserService} from '../../user/service/user.service';
import {ConfigurationService} from '../../shared/configuration/service/configuration.service';

@Injectable({providedIn: 'root'})
export class SecurityAuthenticationService {

  private baseUrl = this.configurationService.getConfig().securityEndPointBaseUrl;
  private authenticateUrl = `${this.baseUrl}/authenticate`;

  constructor(private log: NGXLogger,
              private router: Router,
              private httpClient: HttpClient,
              private configurationService: ConfigurationService,
              private jwtHelperService: JwtHelperService,
              private securityContextService: SecurityContextService,
              private userService: UserService) {
  }

  login(credentials: Credentials): Promise<boolean> {
    this.clearAuthentication();
    return this.authenticate<Credentials>(this.authenticateUrl, credentials)
      .then(res => {
        this.securityContextService.setSecurityContext(res);
        return this.postAuthentication(credentials.username);
      });
  }

  logout() {
    this.clearAuthentication();
    this.router.navigate(['/login']);
  }

  authenticate<T>(url: string, credentials: Credentials): Promise<SecurityContext> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    return this.httpClient
      .post(url, credentials, {headers: headers})
      .toPromise()
      .then(jwtToken => this.extractData(jwtToken))
      .catch(error => {
        this.securityContextService.deleteSecurityContext();
        throw error;
      });
  }

  clearAuthentication() {
    this.securityContextService.deleteSecurityContext();
  }

  private extractData(jwtToken: any): SecurityContext {
    const decodedJwtToken = this.jwtHelperService.decodeToken(jwtToken.jwttoken);
    const securityContext = new SecurityContext();
    securityContext.authToken = jwtToken.jwttoken;
    securityContext.username = decodedJwtToken.sub;
    return securityContext;
  }

  private postAuthentication(username: string): Promise<boolean> {
    this.log.debug(username);
    return Promise.all([
      this.userService.getUserByUsername(username)
    ])
      .then(([user]) => {
        this.log.debug('Finalizing authentication...');
        return this.router.navigate(['/home']);
      })
      .catch(error => {
        throw error;
      });
  }

}
