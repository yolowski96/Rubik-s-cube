const config = {
    development: {
        PORT: 5000,
        SALT_ROUNDS: 10,
        SECRET: 'terces',
        COOKIE_NAME: 'USER_SESSION'
    },
    production: {
        PORT: 80,
    }
};

module.exports = config[process.env.NODE_ENV.trim()];