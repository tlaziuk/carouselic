import * as karma from 'karma'
module.exports = (config: karma.Config) => {
    config.set({
        frameworks: [
            `jasmine`,
            `karma-typescript`,
        ],
        files: [
            `./node_modules/es5-shim/es5-shim.min.js`,
            `./node_modules/es6-shim/es6-shim.min.js`,
            `./node_modules/es7-shim/es7-shim.min.js`,
            {
                pattern: `src/**/*.ts`,
                included: true,
            },
            {
                pattern: `test/**/*.ts`,
                included: true,
            },
        ],
        preprocessors: {
            '**/*.ts': [
                `karma-typescript`,
            ],
        },
        reporters: [
            `progress`,
            `karma-typescript`,
        ],
        logLevel: config.LOG_INFO,
        browsers: [
            `PhantomJS`,
        ],
        singleRun: true,
        karmaTypescriptConfig: {
            reports:
            {
                'clover': `coverage`,
                'cobertura': `coverage`,
                'html': `coverage`,
                'json-summary': `coverage`,
                'json': `coverage`,
                'lcovonly': `coverage`,
                'teamcity': `coverage`,
            },
            remapOptions:
            {
                exclude: /\.(spec|test|d)\.ts/i,
            },
        },
    } as karma.ConfigOptions)
}
