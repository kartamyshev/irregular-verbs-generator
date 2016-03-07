var ports = {
	server: 3000,
	dev: 8003
};

var routes = {
	default: 'http://0.0.0.0',
	mine: 'http://172.20.20.245'
};

var Settings = {
	// DEV_URL: routes.mine + ':' + ports.dev,
	// SERVER_URL: routes.mine + ':' + ports.server,
	
	DEV_URL: routes.default + ':' + ports.dev,
	SERVER_URL: routes.default + ':' + ports.server,
};

module.exports = Settings;