import LoggerConfig from './LoggerConfig';
import LogLevel from './LogLevel';
import RequestIdFactory from './RequestIdFactory';
export default class Logger {
    private static _instance;
    private _logger;
    private static _requestIdFactory;
    private _requestId;
    static createInstance(config: LoggerConfig, requestIdFactory?: RequestIdFactory): void;
    static instance(): Logger;
    log(level: LogLevel, message: string, context?: object): void;
    error(message: string, context?: object): void;
    warn(message: string, context?: object): void;
    info(message: string, context?: object): void;
    debug(message: string, context?: object): void;
    markNewRequest(): void;
    private constructor();
    private createTransports;
    private hydrateContext;
    private getRequestId;
}
