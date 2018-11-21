const fs = require('fs');
const path = require('path');
const babel = require('rollup-plugin-babel');
const commonjs = require('rollup-plugin-commonjs');
import {uglify} from 'rollup-plugin-uglify';
import uglifyES from 'rollup-plugin-uglify-es';

const license = require('rollup-plugin-license');
const {name} = require('./package.json');

const base = __dirname;
const src = path.resolve(base, 'src');
const dist = path.resolve(base, 'dist');

// Ensure dist directory exists
if (!fs.existsSync(dist)) {
    fs.mkdirSync(dist)
}

function defaultPlugins() {
    return [
        commonjs({extensions: ['.js', '.json']}),
        babel({
            plugins: ['external-helpers']
        }),
        uglify({
            sourcemap: true,
            // numWorkers: 1,
        }),
        license({
            // sourceMap: true,
            // cwd: '.', // Default is process.cwd()

            banner: `<%= pkg.name %> v<%= pkg.version %>
(c) <%= moment().format('YYYY') %> <%= pkg.author %>
Released under the <%= pkg.license %> License.`,
        }),
    ]
}

let plugins = defaultPlugins();
plugins.splice(2, 1);

let productionPlugins = defaultPlugins();
let productionESPlugins = defaultPlugins();
productionESPlugins[2] = uglifyES();

let configs = [
    {
        input: path.resolve(src, 'plugin.common.js'),
        // external: Object.keys(dependencies),
        plugins,
        output: [
            {
                format: 'cjs',
                exports: 'named',
                name: 'OverlayScrollbars',
                file: path.resolve(dist, name + '.common.js'),
                sourcemap: true
            },
            {
                format: 'umd',
                exports: 'named',
                name: 'OverlayScrollbars',
                file: path.resolve(dist, name + '.js'),
                sourcemap: true
            }
        ],
    },
    {
        input: path.resolve(src, 'plugin.js'),
        plugins,
        output: {
            format: 'es',
            file: path.resolve(dist, name + '.esm.js'),
            sourcemap: true
        },
    },
    {
        input: path.resolve(src, 'OverlayScrollbars.js'),
        plugins,
        output: {
            format: 'umd',
            name: 'OverlayScrollbars',
            file: path.resolve(base, 'overlay-scrollbars.js'),
            // sourcemap: true
        },
    }
];

if (process.env.NODE_ENV === 'production') {
    let newConfigs = [
        {
            input: path.resolve(src, 'plugin.common.js'),
            plugins: productionPlugins,
            output: {
                format: 'cjs',
                exports: 'named',
                name: 'OverlayScrollbars',
                file: path.resolve(dist, name + '.common.min.js'),
                sourcemap: true
            },
        },
        {
            input: path.resolve(src, 'plugin.common.js'),
            plugins: productionPlugins,
            output: {
                format: 'umd',
                exports: 'named',
                name: 'OverlayScrollbars',
                file: path.resolve(dist, name + '.min.js'),
                sourcemap: true
            },
        },
        {
            input: path.resolve(src, 'plugin.js'),
            plugins: productionESPlugins,
            output: {
                format: 'es',
                file: path.resolve(dist, name + '.esm.min.js'),
                sourcemap: true
            },
        },
        {
            input: path.resolve(src, 'OverlayScrollbars.js'),
            plugins: productionPlugins,
            output: {
                format: 'umd',
                name: 'OverlayScrollbars',
                file: path.resolve(base, 'overlay-scrollbars.js'),
                // sourcemap: true
            },
        }
    ];
    configs.splice(2, 1);
    configs.push(...newConfigs);
}

module.exports = configs;