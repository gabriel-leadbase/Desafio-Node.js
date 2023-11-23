/*
  @license
	Rollup.js v4.5.1
	Tue, 21 Nov 2023 20:12:39 GMT - commit a083019c7f0c18a1c17260ab1239b12400984a88

	https://github.com/rollup/rollup

	Released under the MIT License.
*/
export { version as VERSION, defineConfig, rollup, watch } from './shared/node-entry.js';
import './shared/parseAst.js';
import '../native.js';
import 'node:path';
import 'path';
import 'node:process';
import 'node:perf_hooks';
import 'node:fs/promises';
import 'tty';
