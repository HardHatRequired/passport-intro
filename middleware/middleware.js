var morgan = require('morgan'),
    bodyParser = require('body-parser'),
    cors = require('cors');

// setup global middleware here

module.exports = function(app) {
    app.use(morgan('dev'));
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());
    app.use(cors());
};
