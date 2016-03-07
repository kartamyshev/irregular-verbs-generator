var ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = [
    {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'react-hot!babel',
        include: [ /src/ ]
    }, {
        test: /\.css$/,
        loader: "style!css"
    }, {
        test: /\.styl$/,
        loader: ExtractTextPlugin.extract("style", "css!autoprefixer!stylus")
    }, {
		test: /\.(png|jpg|eot|ttf|woff|woff2|svg)$/,
		include: /images/,
		loader: 'url?limit=5000'
	}
];
