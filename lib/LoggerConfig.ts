import {LogLevel} from './LogLevel';

export interface LoggerConfig {
    enableConsole: boolean;
    consoleLevel: LogLevel;
    logFileName: String;
    logFileLevel: LogLevel;
}