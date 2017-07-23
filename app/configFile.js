/*****************************************************************************
 *
 * COPYRIGHT       :   COPYRIGHT PHOENIX INTERACTIVE DESIGN INC. 2015
 *                     LICENSED MATERIAL - PROGRAM PROPERTY OF PHOENIX
 *                     INTERACTIVE DESIGN INC. ALL RIGHTS RESERVED
 *
 * $Source: configFile.js $
 * $Author: Andrew McCatty (AMcCatty) $
 * $Date: 2016/09/30 15:16:53EDT $
 * $Revision: 1.7.1.131 $
 *
 ******************************************************************************/
angular.module('AppConfig', [])
 .constant('ENV', 'Dev')
  .constant('AUTH_SERVER_BASE_URL', 'http://192.168.1.4/BantamConnectService')
  .constant('XPRESSION_SERVER_BASE_URL', 'http://10.181.121.196//XpressionServer')
  .constant('NEW_AUTH_SERVER_BASE_URL', 'http://10.181.121.196/AuthenticationService')
  .constant('HUB', 'xpressionHub')
  .constant('CLIENT_ID', 'Xpression Web Client')
  .constant('SIGNAL_R_CONNECTION_TIMEOUT', 30000)
  .constant('SESSION_TIMEOUT', 900000)
  .constant('SCREENSHOT_TIMEOUT', 2000)
  .constant('SCREENSHOT_WIDTH', '640')
  .constant('SCREENSHOT_HEIGHT', '0')
  .constant('ENABLE_WEB', 'ENABLE_WEB')
  .constant('TRANSACTION_GATEWAY_PATH', '/tg')
  .constant('TRANSACTION_GATEWAY_ENABLED', false);
  
