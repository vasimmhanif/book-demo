const env = process.env;
env.DB_HOST = 'localhost';
env.DB_USER = 'root';
env.DB_PASSWORD = 'root';
env.DB_NAME = 'learning_nodejs';

const config = {
    db : {
        host: env.DB_HOST || 'freedb.tech',
        user: env.DB_USER || 'freedbtech_vasimmhanif',
        password: env.DB_PASSWORD || 'jack',
        database: env.DB_NAME || 'freedbtech_vasimdb'
    } , 
    listPerPage: env.LIST_PER_PAGE || 10
};

module.exports = config;
