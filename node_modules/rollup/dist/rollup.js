/*
  @license
	Rollup.js v4.5.1
	Tue, 21 Nov 2023 20:12:39 GMT - commit a083019c7f0c18a1c17260ab1239b12400984a88

	https://github.com/rollup/rollup

	Released under the MIT License.
*/
'use strict';

Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });

const rollup = require('./shared/rollup.js');
const watchProxy = require('./shared/watch-proxy.js');
require('./shared/parseAst.js');
require('./native.js');
require('node:path');
require('node:process');
require('tty');
require('path');
require('node:perf_hooks');
require('node:fs/promises');
require('./shared/fsevents-importer.js');



exports.VERSION = rollup.version;
exports.defineConfig = rollup.defineConfig;
exports.rollup = rollup.rollup;
exports.watch = watchProxy.watch;
//# sourceMappingURL=rollup.js.map
