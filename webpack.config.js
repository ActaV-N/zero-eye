const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')

module.exports = {
    mode:'none',
    entry:path.resolve(__dirname, 'src/index.js'),
    output:{
        filename:'bundle.js',
        path:path.resolve(__dirname, 'dist')
    },
    devServer:{
        host:'local-ip',
        port:'8080',
        watchFiles:['src/**','index.html', 'pages/**'],
        open:true,
        https:false
    },
    plugins:[
        new HtmlWebpackPlugin({
            template:path.resolve(__dirname, 'index.html')
        }),
        new HtmlWebpackPlugin({
            filename:'features.html',
            template:path.resolve(__dirname, 'pages/features.html')
        }),
        new MiniCssExtractPlugin(),
        new CopyWebpackPlugin({
            patterns:[
                {from:path.resolve(__dirname, 'static')}
            ]
        })
    ],
    module:{
        rules:[
            // Html
            {
                test:/.(html)$/,
                use:[
                    'html-loader'
                ]
            },

            // CSS
            {
                test:/.css$/,
                use:[
                    MiniCssExtractPlugin.loader,
                    'css-loader'
                ]
            },

            // Js
            {
                test:/.js$/,
                exclude:/node_modules/,
                use:[
                    'babel-loader'
                ]
            }
        ]
    }
}