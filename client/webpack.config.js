const path = require('path'); // Пакет для работы с путями в Node
const HtmlWebpackPlugin = require('html-webpack-plugin'); // Будет авто-ски создавать html файл в папке дист с правильно указанными скриптами
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const OptimizeCssPlugin = require('optimize-css-assets-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');

const isDev = process.env.NODE_ENV === 'development';
const isProd = !isDev;

const optimization = () => {
  const config = {
    splitChunks: {
      chunks: 'all' // Настройка будет выносить импортируемые одинковые библиотеки из разных файлов в один общий vendor файл
    },
    runtimeChunk: 'single'
  };

  if (isProd) {
    config.minimizer = [new OptimizeCssPlugin(), new TerserPlugin()];
  }

  return config;
};

const cssLoaders = (extra) => {
  const loaders = [MiniCssExtractPlugin.loader, 'css-loader'];

  if (extra) {
    loaders.push(extra);
  }

  return loaders;
};

const babelLoaders = (presets) => {
  const isPresetsExist = typeof presets !== 'undefined';

  return isPresetsExist
    ? {
        loader: 'babel-loader',
        options: {
          presets,
          plugins: ['@babel/plugin-proposal-class-properties']
        }
      }
    : {
        loader: 'babel-loader',
        options: {
          plugins: ['@babel/plugin-proposal-class-properties']
        }
      };
};

const fileName = (extension, path) => {
  return isDev ? `${path}[name].${extension}` : `${path}[name].[hash].${extension}`;
};

const dirName = (pathToFile) => {
  return path.resolve(__dirname, pathToFile);
};

module.exports = {
  target: 'web',
  context: dirName('src'), // Настройка указывает где хранятся исходники проекта. Поэтому к примеру в entry.main не нужно в пути указывать src
  mode: 'development', // development or production mode

  entry: {
    // Входные файлы - Chunks(сборники скриптов)
    main: ['@babel/polyfill', './index']
  },

  output: {
    filename: fileName('js', 'scripts/'), // Паттерн для создания имени для выходных файлов. Зависит от имени чанка
    path: dirName('dist'),
    clean: true,
    publicPath: '/'
  },

  resolve: {
    extensions: ['.js', '.ts', '.jsx', '.tsx', '.json'],
    alias: {
      Src: dirName('src')
    }
  },

  optimization: optimization(),

  devtool: isDev ? 'source-map' : false,

  devServer: {
    static: {
      directory: path.join(__dirname, './'),
      serveIndex: true
    },
    historyApiFallback: true,
    open: true,
    hot: isDev
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: '../index.html', // Путь до основного html файла который будет создаваться в dist. К нему будут присоединены чанки указанные в entry
      minify: {
        removeComments: isProd,
        collapseWhitespace: isProd
      }
    }),

    new ESLintPlugin(),

    new CopyPlugin({
      patterns: [
        {
          from: dirName('src/assets/img/fav.ico'),
          to: dirName('dist')
        }
      ]
    }),

    new MiniCssExtractPlugin({
      filename: fileName('css', 'styles/')
    })
  ],

  module: {
    rules: [
      // Здесь указываются лоадеры
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: babelLoaders()
      },
      {
        test: /\.m?jsx$/,
        exclude: /node_modules/,
        use: babelLoaders(['@babel/preset-react'])
      },
      {
        test: /\.m?(ts|tsx)$/,
        exclude: /node_modules/,
        use: babelLoaders(['@babel/preset-react', '@babel/preset-typescript'])
      },
      {
        test: /\.css$/, // Если встречается указанное расширение файлов
        use: cssLoaders() // То использовать указанный здесь лоадер. Обработка файлов будет идти справа на лево
      },
      {
        test: /\.s[ac]ss$/,
        use: cssLoaders('sass-loader')
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif|webp|webp2)$/,
        type: 'asset/resource', // В webpack 5 не нужен больше file-loader для шрифтов картинок и тд. См. Asset Modules в док.
        generator: {
          filename: 'assets/img/[name][ext]'
        }
      },
      {
        test: /\.(ttf|woff|woff2|eot)$/,
        type: 'asset/resource',
        generator: {
          filename: 'assets/fonts/[name][ext]'
        }
      }
    ]
  }
};
