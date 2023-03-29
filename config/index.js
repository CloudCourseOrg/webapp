const logger = require('./logger');


logger.info("text info")
logger.warn("text warn")
// logger.debug("warn info")
logger.error("text error")
logger.error(new Error('something went wrong'))


//  adding meta data to logs
// logger.info("text info",{meta1 : 'meta1'}) // see     defaultMeta :{service : 'user-service'}, in index.js of logger


