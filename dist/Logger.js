"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const winston = require("winston");
const LogLevel_1 = require("./LogLevel");
class Logger {
    static createInstance(config, requestIdFactory) {
        Logger._instance = new Logger(config);
        if (requestIdFactory) {
            Logger._requestIdFactory = requestIdFactory;
            this._instance.markNewRequest();
        }
    }
    static instance() {
        if (!Logger._instance) {
            throw new Error('Cannot get instance of logger. Create one first.');
        }
        return Logger._instance;
    }
    log(level, message, context = {}) {
        const hydratedContext = this.hydrateContext(context);
        this._logger.log(level, message, hydratedContext);
    }
    error(message, context = {}) {
        this.log(LogLevel_1.LogLevel.ERROR, message, context);
    }
    warn(message, context = {}) {
        this.log(LogLevel_1.LogLevel.WARN, message, context);
    }
    info(message, context = {}) {
        this.log(LogLevel_1.LogLevel.INFO, message, context);
    }
    debug(message, context = {}) {
        this.log(LogLevel_1.LogLevel.DEBUG, message, context);
    }
    markNewRequest() {
        this._requestId = Logger._requestIdFactory.create();
    }
    constructor(config) {
        this._logger = winston.createLogger({
            transports: this.createTransports(config),
        });
    }
    createTransports(config) {
        const transports = [
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
    hydrateContext(context) {
        const extraContext = {
            timestamp: new Date().toISOString(),
        };
        if (this._requestId) {
            extraContext['requestId'] = this.getRequestId();
        }
        return Object.assign({}, extraContext, context);
    }
    getRequestId() {
        if (!this._requestId) {
            this.markNewRequest();
        }
        return this._requestId;
    }
}
exports.Logger = Logger;
//# sourceMappingURL=Logger.js.map