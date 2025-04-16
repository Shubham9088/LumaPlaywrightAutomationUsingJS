import { createLogger, format, transports } from "winston";

//creating new logger instance
export const logger=createLogger({
    level:'info', // Setting it to 'info' means only info, warn, and error will be logged.
    //Defining how log will be formatted
    format: format.combine(
        format.timestamp({format:'YYYY-MM-DD HH:mm:ss'}),
        format.printf((info)=>`${info.timestamp} [${info.level.toUpperCase()}]: ${info.message}`)
    ),
    //Defining where to send log output
    transports:[
        new transports.Console(),
        new transports.File({filename:'logs/automation.log'})
    ]
})
