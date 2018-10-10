import * as winston from 'winston';
import {LoggerConfig} from './LoggerConfig';
import {LogLevel} from './LogLevel';
import {RequestIdFactory} from './RequestIdFactory';

export class Logger {
    private static _instance: Logger;
    private _logger: winston.Logger;
    private static _requestIdFactory: RequestIdFactory;
    private _requestId: string;


    public static createInstance(config: LoggerConfig, requestIdFactory?: RequestIdFactory): void {
        Logger._instance = new Logger(config);
        if (requestIdFactory) {
            Logger._requestIdFactory = requestIdFactory;
            this._instance.markNewRequest();
        }
    }


    public static instance(): Logger {
        if ( ! Logger._instance) {
            throw new Error('Cannot get instance of logger. Create one first.');
        }

        return Logger._instance;
    }

    public log(level: LogLevel, message: string, context: object = {}): void {
        const hydratedContext = this.hydrateContext(context);
        this._logger.log(level, message, hydratedContext);
    }

    public error(message: string, context: object = {}): void {
        this.log(LogLevel.ERROR, message, context);
    }

    public warn(message: string, context: object = {}): void {
        this.log(LogLevel.WARN, message, context);
    }

    public info(message: string, context: object = {}): void {
        this.log(LogLevel.INFO, message, context);
    }

    public debug(message: string, context: object = {}): void {
        this.log(LogLevel.DEBUG, message, context);
    }

    public markNewRequest(): void {
        this._requestId = Logger._requestIdFactory.create();
    }


    private constructor(config: LoggerConfig) {
        this._logger = winston.createLogger({
            transports: this.createTransports(config),
        });
    }


    private createTransports(config: LoggerConfig): any[] {
        const transports: any[] = [
            new winston.transports.File({
                filename: config.logFileName.toString(),
                level: config.logFileLevel.toString(),
            }),
        ];
        if (config.enableConsole) {
            const consoleTransport = new winston.transports.Console({
                level: config.consoleLevel.toString(),
            });
            transports.push(consoleTransport);
        }

        return transports;
    }

    private hydrateContext(context: object): object {
        const extraContext = {
            timestamp: new Date().toISOString(),
        };
        if (this._requestId) {
            extraContext['requestId'] = this.getRequestId();
        }

        return {...extraContext, ...context};
    }

    private getRequestId(): string {
        if ( ! this._requestId) {
            this.markNewRequest();
        }

        return this._requestId;
    }
}