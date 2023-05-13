
const mssql = require('mssql/msnodesqlv8')

const config = {
    server: "125.253.121.171",
    user: "UserDataEprofile",
    password: "D1q8A3I18JnO",
    database: "Data_Eprofile",
    driver: "msnodesqlv8",

    Option: {
        encrypt: false,
        enableArithAbort: false,
    },
    // connectionTimeout: 300000,
    // requestTimeout: 300000,
    // pool: {
    //     idleTimeoutMilis: 300000,
    //     max: 100,
    // }
};

const conn = new mssql.ConnectionPool(config);


module.exports = {
    conn
}

// const sql = require('mssql/msnodesqlv8');

// const config = {
//     server: "125.253.121.171",
//     user: "UserDataEprofile",
//     password: "D1q8A3I18JnO",
//     database: "Data_Eprofile",
//     driver: "msnodesqlv8"
// }

// const conn = new sql.ConnectionPool(config).connect().then(pool => {
//     return pool;
// })

// module.exports = {
//     sql: sql,
//     conn: conn
// }