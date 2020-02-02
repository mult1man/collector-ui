import {Injectable} from '@angular/core';
import {ConfigurationService} from '../../shared/configuration/service/configuration.service';
import {User} from '../model/user.model';
import {RestTemplate} from '../../shared/http/service/rest-template.service';

@Injectable({providedIn: 'root'})
export class UserService {

  private baseUrl = this.configurationService.getConfig().userEndPointBaseUrl;
  private urlByUsername = `${this.baseUrl}/{username}`;

  constructor(private restTemplate: RestTemplate,
              private configurationService: ConfigurationService) {
  }

  getUserByUsername(username: string): Promise<User> {
    return this.restTemplate.get(this.urlByUsername.replace('{username}', username));
  }

}
