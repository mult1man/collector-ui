import {Injectable} from '@angular/core';
import {Meta} from '@angular/platform-browser';
import {NGXLogger} from 'ngx-logger';
import {ConfigurationService} from './pages/shared/configuration/service/configuration.service';
import {LogUtils} from './pages/shared/log/log-utils.service';

@Injectable({providedIn: 'root'})
export class AppInitService {

  constructor(private configurationService: ConfigurationService,
              private log: NGXLogger) {
  }

  init(): Promise<void> {
    this.log.info('Initializing application...');
    LogUtils.init(this.log);
    return this.configurationService.initConfig();
  }

}
