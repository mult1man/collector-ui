import {NgxLoggerLevel} from 'ngx-logger';
import {Configuration} from '../app/pages/shared/configuration/model/configuration.model';

const gatewayEndPoint = 'http://localhost:8080';

const configuration: Configuration = {
  environment: 'dvp',
  securityEndPointBaseUrl: gatewayEndPoint + '/security',
  userEndPointBaseUrl: gatewayEndPoint + '/user',
};

export const environment = {
  production: false,
  baseUrl: '/',
  baseUrlRest: '/',
  baseUrlI18n: '/',
  configuration: configuration,
  defaultLogLevel: NgxLoggerLevel.DEBUG
};
