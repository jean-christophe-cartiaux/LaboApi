const {DB_USER,DB_PSW,DB_NAME}=process.env;

const sqlConfig={
    user:DB_USER,
    password:DB_PSW,
    database:DB_NAME,
    server:'localhost',
    pool:{
        min:0,
        max:10,
        idleTimeoutMillis:300001
    },
    options:{
        trustServerCertificate: true
    }

}
module.exports = sqlConfig;