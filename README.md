Winston logger
==============
Winston logger wrapper

### Usage example

```javascript 1.8
import Logger from './Logger';

// Init part
const config = {
   enableConsole: true,
   consoleLevel: 'debug',
   logFileName: 'app.log',
   logFileLevel: 'error',
};
Logger.createInstance(config);

// Looging
Logger.instance().info('Log this', {config: config});
```