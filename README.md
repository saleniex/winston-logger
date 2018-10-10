Winston logger
==============
Winston logger wrapper

### Usage example

```javascript 1.8
import Logger from './Logger';

const createLoggerInstance = () => {
    Logger.createInstance({
        enableConsole: true,
        consoleLevel: 'debug',
        logFileName: 'app.log',
        logFileLevel: 'error',
    });
};

createLoggerInstance();
```