import * as webpack from 'webpack'

module.exports = {
    entry: {
        'carouselic': `./src/index`,
        'carouselic.min': `./src/index`,
    },
    output: {
        filename: `./dist/[name].js`,
    },
    devtool: `source-map`,
    resolve: {
        extensions: [
            ``,
            `.webpack.ts`,
            `.web.ts`,
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
                loader: `babel-loader!ts-loader`,
            },
        ],
    },
}
