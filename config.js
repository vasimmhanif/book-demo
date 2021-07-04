const env = process.env;

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
