import * as karma from 'karma'
module.exports = (config: karma.Config) => {
    config.set({
        frameworks: [
            `jasmine`,
            `karma-typescript`,
        ],
        files: [
            {
                pattern: `node_modules/es6-promise/dist/es6-promise.auto.js`,
                included: true,
            },
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
                `babel`,
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