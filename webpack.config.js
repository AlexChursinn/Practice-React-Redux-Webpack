/* Импортируем из node.js библиотеку path которая позволит нам указать путь к папке */
const path = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HTMLWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  /* mode - указывает что находимсяв  разработке и выходные данные JS не надо сжимать
	entry - затем надо указать путь к файлу который будет входным с которого будет начинаться запуск приложения
	output - куда будет сам вебпак собирать файлы
	*/
  mode: "development",
  entry: ["@babel/polyfill", "./src/index.jsx"],
  output: {
    /* path - путь куда webpack будет делать сборку папка dist */
    path: path.resolve(__dirname, "dist"),
    /* Имя файла куда вебпак будет делать сборку всех файлов */
    /* Будем использовать регулярные выражения чтобы не было проблем при хэшировании разработки чтобы он делал бандлы с уникальными названиями*/
    filename: "[name].[fullhash].js",
    /* Чтобы не было проблем с кэшированием при переходах на разные страницы */
    publicPath: "/",
  },
  /* Настраиваем devServer */
  devServer: {
    port: 3000,
    historyApiFallback: true,
  },
  resolve: {
    extensions: [".js", ".jsx"],
  },
  /* Теперь подключаем плагины указываем путь к HTML */
  plugins: [
    new HTMLWebpackPlugin({ template: "./src/index.html" }),
    new CleanWebpackPlugin(),
  ],
  /* Настраиваем ипорт наших стилей 
	для этого задаем определенные правила */
  module: {
    rules: [
      {
        /* Будет обрабатывать указанные ниже loader css и less файлы*/
        test: /\.(css|less)$/,
        /* Указываем массив loader который будет использоваться с лева на право учитываем */
        use: ["style-loader", "css-loader", "less-loader"],
      },
      {
        /* Делаем обработку для файлов */
        test: /\.(jpg|jpeg|png|svg)$/,
        use: ["file-loader"],
      },
      {
        /* Правила из Babel */
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
          },
        },
      },
      {
        /* Скопировали добавили jsx и пресет для реакта*/
        test: /\.m?jsx$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env", "@babel/preset-react"],
          },
        },
      },
    ],
  },
};
