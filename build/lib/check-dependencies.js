"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.checkForDependencies = checkForDependencies;
exports.bundleWDASim = bundleWDASim;

require("source-map-support/register");

var _appiumSupport = require("appium-support");

var _lodash = _interopRequireDefault(require("lodash"));

var _teen_process = require("teen_process");

var _path = _interopRequireDefault(require("path"));

var _xcodebuild = _interopRequireDefault(require("./xcodebuild"));

var _constants = require("./constants");

var _logger = _interopRequireDefault(require("./logger"));

async function buildWDASim() {
  const args = ['-project', _constants.WDA_PROJECT, '-scheme', _constants.WDA_SCHEME, '-sdk', _constants.SDK_SIMULATOR, 'CODE_SIGN_IDENTITY=""', 'CODE_SIGNING_REQUIRED="NO"', 'GCC_TREAT_WARNINGS_AS_ERRORS=0'];
  await (0, _teen_process.exec)('xcodebuild', args);
}

async function checkForDependencies() {
  _logger.default.debug('Dependencies are up to date');

  return false;
}

async function bundleWDASim(xcodebuild, opts = {}) {
  if (xcodebuild && !_lodash.default.isFunction(xcodebuild.retrieveDerivedDataPath)) {
    xcodebuild = new _xcodebuild.default();
    opts = xcodebuild;
  }

  const derivedDataPath = await xcodebuild.retrieveDerivedDataPath();

  const wdaBundlePath = _path.default.join(derivedDataPath, 'Build', 'Products', 'Debug-iphonesimulator', _constants.WDA_RUNNER_APP);

  if (await _appiumSupport.fs.exists(wdaBundlePath)) {
    return wdaBundlePath;
  }

  await checkForDependencies(opts);
  await buildWDASim(xcodebuild, opts);
  return wdaBundlePath;
}require('source-map-support').install();


//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImxpYi9jaGVjay1kZXBlbmRlbmNpZXMuanMiXSwibmFtZXMiOlsiYnVpbGRXREFTaW0iLCJhcmdzIiwiV0RBX1BST0pFQ1QiLCJXREFfU0NIRU1FIiwiU0RLX1NJTVVMQVRPUiIsImNoZWNrRm9yRGVwZW5kZW5jaWVzIiwibG9nIiwiZGVidWciLCJidW5kbGVXREFTaW0iLCJ4Y29kZWJ1aWxkIiwib3B0cyIsIl8iLCJpc0Z1bmN0aW9uIiwicmV0cmlldmVEZXJpdmVkRGF0YVBhdGgiLCJYY29kZUJ1aWxkIiwiZGVyaXZlZERhdGFQYXRoIiwid2RhQnVuZGxlUGF0aCIsInBhdGgiLCJqb2luIiwiV0RBX1JVTk5FUl9BUFAiLCJmcyIsImV4aXN0cyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O0FBQUE7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBR0E7O0FBRUEsZUFBZUEsV0FBZixHQUE4QjtBQUM1QixRQUFNQyxJQUFJLEdBQUcsQ0FDWCxVQURXLEVBQ0NDLHNCQURELEVBRVgsU0FGVyxFQUVBQyxxQkFGQSxFQUdYLE1BSFcsRUFHSEMsd0JBSEcsRUFJWCx1QkFKVyxFQUtYLDRCQUxXLEVBTVgsZ0NBTlcsQ0FBYjtBQVFBLFFBQU0sd0JBQUssWUFBTCxFQUFtQkgsSUFBbkIsQ0FBTjtBQUNEOztBQUdELGVBQWVJLG9CQUFmLEdBQXVDO0FBQ3JDQyxrQkFBSUMsS0FBSixDQUFVLDZCQUFWOztBQUNBLFNBQU8sS0FBUDtBQUNEOztBQUVELGVBQWVDLFlBQWYsQ0FBNkJDLFVBQTdCLEVBQXlDQyxJQUFJLEdBQUcsRUFBaEQsRUFBb0Q7QUFDbEQsTUFBSUQsVUFBVSxJQUFJLENBQUNFLGdCQUFFQyxVQUFGLENBQWFILFVBQVUsQ0FBQ0ksdUJBQXhCLENBQW5CLEVBQXFFO0FBQ25FSixJQUFBQSxVQUFVLEdBQUcsSUFBSUssbUJBQUosRUFBYjtBQUNBSixJQUFBQSxJQUFJLEdBQUdELFVBQVA7QUFDRDs7QUFFRCxRQUFNTSxlQUFlLEdBQUcsTUFBTU4sVUFBVSxDQUFDSSx1QkFBWCxFQUE5Qjs7QUFDQSxRQUFNRyxhQUFhLEdBQUdDLGNBQUtDLElBQUwsQ0FBVUgsZUFBVixFQUEyQixPQUEzQixFQUFvQyxVQUFwQyxFQUFnRCx1QkFBaEQsRUFBeUVJLHlCQUF6RSxDQUF0Qjs7QUFDQSxNQUFJLE1BQU1DLGtCQUFHQyxNQUFILENBQVVMLGFBQVYsQ0FBVixFQUFvQztBQUNsQyxXQUFPQSxhQUFQO0FBQ0Q7O0FBQ0QsUUFBTVgsb0JBQW9CLENBQUNLLElBQUQsQ0FBMUI7QUFDQSxRQUFNVixXQUFXLENBQUNTLFVBQUQsRUFBYUMsSUFBYixDQUFqQjtBQUNBLFNBQU9NLGFBQVA7QUFDRCIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGZzIH0gZnJvbSAnYXBwaXVtLXN1cHBvcnQnO1xuaW1wb3J0IF8gZnJvbSAnbG9kYXNoJztcbmltcG9ydCB7IGV4ZWMgfSBmcm9tICd0ZWVuX3Byb2Nlc3MnO1xuaW1wb3J0IHBhdGggZnJvbSAncGF0aCc7XG5pbXBvcnQgWGNvZGVCdWlsZCBmcm9tICcuL3hjb2RlYnVpbGQnO1xuaW1wb3J0IHtcbiAgV0RBX1BST0pFQ1QsIFdEQV9TQ0hFTUUsIFNES19TSU1VTEFUT1IsIFdEQV9SVU5ORVJfQVBQXG59IGZyb20gJy4vY29uc3RhbnRzJztcbmltcG9ydCBsb2cgZnJvbSAnLi9sb2dnZXInO1xuXG5hc3luYyBmdW5jdGlvbiBidWlsZFdEQVNpbSAoKSB7XG4gIGNvbnN0IGFyZ3MgPSBbXG4gICAgJy1wcm9qZWN0JywgV0RBX1BST0pFQ1QsXG4gICAgJy1zY2hlbWUnLCBXREFfU0NIRU1FLFxuICAgICctc2RrJywgU0RLX1NJTVVMQVRPUixcbiAgICAnQ09ERV9TSUdOX0lERU5USVRZPVwiXCInLFxuICAgICdDT0RFX1NJR05JTkdfUkVRVUlSRUQ9XCJOT1wiJyxcbiAgICAnR0NDX1RSRUFUX1dBUk5JTkdTX0FTX0VSUk9SUz0wJyxcbiAgXTtcbiAgYXdhaXQgZXhlYygneGNvZGVidWlsZCcsIGFyZ3MpO1xufVxuXG4vLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgcmVxdWlyZS1hd2FpdFxuYXN5bmMgZnVuY3Rpb24gY2hlY2tGb3JEZXBlbmRlbmNpZXMgKCkge1xuICBsb2cuZGVidWcoJ0RlcGVuZGVuY2llcyBhcmUgdXAgdG8gZGF0ZScpO1xuICByZXR1cm4gZmFsc2U7XG59XG5cbmFzeW5jIGZ1bmN0aW9uIGJ1bmRsZVdEQVNpbSAoeGNvZGVidWlsZCwgb3B0cyA9IHt9KSB7XG4gIGlmICh4Y29kZWJ1aWxkICYmICFfLmlzRnVuY3Rpb24oeGNvZGVidWlsZC5yZXRyaWV2ZURlcml2ZWREYXRhUGF0aCkpIHtcbiAgICB4Y29kZWJ1aWxkID0gbmV3IFhjb2RlQnVpbGQoKTtcbiAgICBvcHRzID0geGNvZGVidWlsZDtcbiAgfVxuXG4gIGNvbnN0IGRlcml2ZWREYXRhUGF0aCA9IGF3YWl0IHhjb2RlYnVpbGQucmV0cmlldmVEZXJpdmVkRGF0YVBhdGgoKTtcbiAgY29uc3Qgd2RhQnVuZGxlUGF0aCA9IHBhdGguam9pbihkZXJpdmVkRGF0YVBhdGgsICdCdWlsZCcsICdQcm9kdWN0cycsICdEZWJ1Zy1pcGhvbmVzaW11bGF0b3InLCBXREFfUlVOTkVSX0FQUCk7XG4gIGlmIChhd2FpdCBmcy5leGlzdHMod2RhQnVuZGxlUGF0aCkpIHtcbiAgICByZXR1cm4gd2RhQnVuZGxlUGF0aDtcbiAgfVxuICBhd2FpdCBjaGVja0ZvckRlcGVuZGVuY2llcyhvcHRzKTtcbiAgYXdhaXQgYnVpbGRXREFTaW0oeGNvZGVidWlsZCwgb3B0cyk7XG4gIHJldHVybiB3ZGFCdW5kbGVQYXRoO1xufVxuXG5leHBvcnQgeyBjaGVja0ZvckRlcGVuZGVuY2llcywgYnVuZGxlV0RBU2ltIH07XG4iXSwiZmlsZSI6ImxpYi9jaGVjay1kZXBlbmRlbmNpZXMuanMiLCJzb3VyY2VSb290IjoiLi4vLi4ifQ==