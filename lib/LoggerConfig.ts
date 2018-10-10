import LogLevel from './LogLevel';

export default interface LoggerConfig {
    enableConsole: boolean;
    consoleLevel: LogLevel;
    logFileName: String;
    logFileLevel: LogLevel;
}