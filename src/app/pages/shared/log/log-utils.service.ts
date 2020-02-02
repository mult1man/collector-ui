import {NGXLogger, NgxLoggerLevel} from 'ngx-logger';
import {environment} from '../../../../environments/environment';

export class LogUtils {

  static log: NGXLogger;

  private static STORAGE_KEY = 'qcr-log-level';

  static init(log: NGXLogger) {
    LogUtils.log = log;
    log.info('Initializing logger');
    const logLevel = LogUtils.getLocalStorageConfigOrDefaultTo(environment.defaultLogLevel);
    log.debug('Updating LogLevel to ', NgxLoggerLevel[logLevel]);
    log.updateConfig({level: logLevel});
    log.info(`LogLevel=${NgxLoggerLevel[log.getConfigSnapshot().level]}`);
  }

  static getLocalStorageConfigOrDefaultTo(defaultLevel: NgxLoggerLevel): NgxLoggerLevel {
    LogUtils.log.debug(`Checking browser storage (key=${LogUtils.STORAGE_KEY}) for log level or else use default `, NgxLoggerLevel[defaultLevel]);
    return sessionStorage.getItem(LogUtils.STORAGE_KEY) ? NgxLoggerLevel[sessionStorage.getItem(LogUtils.STORAGE_KEY)] : defaultLevel;
  }

  static saveLogLevel(logLevel: string) {
    LogUtils.log.updateConfig({level: NgxLoggerLevel[logLevel]});
    sessionStorage.setItem(LogUtils.STORAGE_KEY, logLevel);
    LogUtils.log.info(`Saved logLevel to`, logLevel);
  }

}
