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
                pattern: `mod/!(webpack|conf).ts`,
                included: true,
            },
            {
                pattern: `!(*.webpack|*.conf).ts`,
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
                exclude: /\.(spec|test|d|conf|webpack)\.ts/i,
            },
        },
    } as karma.ConfigOptions)
}
