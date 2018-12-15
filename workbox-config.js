module.exports = {
	globDirectory: 'build/',
	globPatterns: [ '**/*.{json,html,js,css,svg}' ],
	globIgnores: [ '*manifest*.js', '*manifest.json', 'service-worker.js', 'node_modules/**/*' ],
	swDest: './build/sw.js',
	swSrc: 'sw.js'
};
