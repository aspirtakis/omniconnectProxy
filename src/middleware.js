const HTTP_OK = 200;
const HTTP_FORBIDDEN = 403;
const HTTP_NOTFOUND = 404;
const HTTP_SERVER_ERROR = 500;
const IPWhiteList = ['127.0.0.1', '::ffff:127.0.0.1', '18.185.80.22']

/* eslint-disable no-unused-vars */
function notFound(req, res, next) {
/* eslint-enable no-unused-vars */
    res.status(HTTP_NOTFOUND);
    let err = new Error('Not Found');
    next(err);
}

function filter(req, res, next) {
    if (IPWhiteList.includes(req.ip)) {
        next();
    } else {
        res.status(HTTP_FORBIDDEN);
        let err = new Error('Forbidden');
        next(err);
    }
};

/* eslint-disable no-unused-vars */
function errorHandler(err, req, res, next) {
/* eslint-enable no-unused-vars */
    const statusCode = res.statusCode !== HTTP_OK ? res.statusCode : HTTP_SERVER_ERROR;
    res.status(statusCode);

    res.format({
        json: () => {
            res.json({ message: err.message });
        },
        default: () => {
            res.type('txt').send(err.message);
        }
    });

    if (process.env.NODE_ENV !== 'production') {
        console.log(err.stack)
    }
};

module.exports = {
    forbidden: filter,
    notFound: notFound,
    errorHandler: errorHandler
};
