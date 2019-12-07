// Webpack v4
const path =                    require('path');
const MiniCssExtractPlugin =    require('mini-css-extract-plugin');
const FileManagerPlugin =       require('filemanager-webpack-plugin');
const { CleanWebpackPlugin } =  require('clean-webpack-plugin');
const HtmlWebpackPlugin =       require('html-webpack-plugin');
const WebpackMd5Hash =          require('webpack-md5-hash');
module.exports = {
    entry: { main: './src/js/index.js' },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'js/[name].[chunkhash].js'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader"
                }
            },
            {
                test: /\.scss$/,
                use:  [  'style-loader', MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader', 'sass-loader']
            },
            {
                test: /\.(png|jpe?g|gif)$/i,
                loader: 'file-loader',
                options: {
                    name: 'images/[name].[ext]',
                }
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin({
            filename: 'style.[contenthash].css'
        }),
        new FileManagerPlugin({
            onEnd: {
                copy: []
            }
        }),
        new HtmlWebpackPlugin({
            inject: false,
            hash: true,
            template: './src/index.html',
            filename: 'index.html'
        }),
        new WebpackMd5Hash()
    ]
}