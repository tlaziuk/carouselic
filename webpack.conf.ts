import * as webpack from 'webpack'

module.exports = {
    entry: {
        'carouselic': `./index`,
        'carouselic.min': `./index`,
    },
    output: {
        filename: `./dist/[name].js`,
    },
    devtool: `source-map`,
    resolve: {
        extensions: [
            ``,
            `.webpack.ts`,
            `.ts`,
        ],
    },
    plugins: [
        new webpack.optimize.UglifyJsPlugin({
            include: /\.min\.js$/,
            minimize: true,
        } as any),
    ],
    module: {
        loaders: [
            {
                test: /\.tsx?$/,
                loader: `ts-loader`,
            },
        ],
    },
}
