export interface Configuration {
  environment: 'dvp' | 'int' | 'uat' | 'prd';
  securityEndPointBaseUrl: string;
  userEndPointBaseUrl: string;
}
