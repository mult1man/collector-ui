import {Injectable} from '@angular/core';
import {Configuration} from '../model/configuration.model';
import {NGXLogger} from 'ngx-logger';
import {environment} from '../../../../../environments/environment';

@Injectable({providedIn: 'root'})
export class ConfigurationService {

  static appConfig: Configuration;

  constructor(private log: NGXLogger) {
  }

  initConfig(): Promise<void> {
    let configPromise: Promise<Configuration>;

    if (!environment.configuration) {
      this.log.info('Initializing rs/config using remote config...');
      configPromise = fetch(`${environment.baseUrlRest}/config`).then(res => res.json());
    } else {
      this.log.debug('Initializing rs/config using local config...');
      configPromise = Promise.resolve(environment.configuration);
    }

    return configPromise.then(config => {
      ConfigurationService.appConfig = config;
      environment.configuration = config;
      this.log.debug('Loaded configuration', ConfigurationService.appConfig);
    });
  }

  getConfig(): Configuration {
    if (!ConfigurationService.appConfig) {
      throw new Error('Configuration not loaded!');
    }
    return ConfigurationService.appConfig;
  }

  getEndPointByServiceName(serviceName: string): string {
    switch (serviceName) {
      case 'qcr-security':
        return this.getConfig().securityEndPointBaseUrl;
    }
    return null;
  }

}
