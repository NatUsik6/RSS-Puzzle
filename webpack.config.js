import path, { resolve } from 'path';
import { fileURLToPath } from 'url';
import ESlintPlugin from 'eslint-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import HtmlWebpackInlineSVGPlugin from 'html-webpack-inline-svg-plugin';
import { CleanWebpackPlugin } from 'clean-webpack-plugin';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default {
    mode: 'development',
    entry: './src/index.ts',
    module: {
        rules: [
            {
                test: /\.css$/i,
                use: ['style-loader', 'css-loader'],
            },
            {
                test: /\.ts$/i,
                use: 'ts-loader',
                include: [resolve(__dirname, 'src')],
            },
        ],
    },
    resolve: {
        extensions: ['.ts', '.js'],
    },
    output: {
        filename: 'index.js',
        path: resolve(__dirname, 'dist'),
        publicPath: '',
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: 'src/index.html',
            filename: 'index.html',
            //favicon: 'src/favicon.ico',
        }),
        new HtmlWebpackInlineSVGPlugin({
            runPreEmit: true,
        }),
        new CleanWebpackPlugin(),
        new ESlintPlugin({ extensions: 'ts' }),
    ],
    devtool: 'inline-source-map',
    devServer: {
        static: './dist',
    },
};
