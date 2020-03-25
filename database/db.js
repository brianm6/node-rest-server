// Connect to MS SQL database and make a connection pool available
let sql = require('mssql');

// config package used to manage configuration options
const config = require('config');

// Setup the Database Connection
// config is used to read values from the connection section of /config/default.json
let dbConnPoolPromise = new sql.ConnectionPool(config.get('connection'))
        .connect()
        .then(pool => {
        console.log('Connected to MSSQL')
        return pool
        })
        .catch(err => console.log('Database Connection Failed - error: ', err))

function buildSelect(req) {
    let sql_select = '';
    if (req.query.search) {
        searchObject = JSON.parse(req.query.search);
        let firstField = true;
        Object.values(searchObject).forEach((field) => {
            if (field.operator === 'contains') {
                if (firstField) {
                    sql_select += ` WHERE ${field.column} LIKE '%${field.criteria}%'`;
                } else {
                    sql_select += ` AND ${field.column} LIKE '%${field.criteria}%'`;
                }    
            } else {
                if (firstField) {
                    sql_select += ` WHERE ${field.column} ${field.operator} '${field.criteria}'`;
                } else {
                    sql_select += ` AND ${field.column} ${field.operator} '${field.criteria}'`;
                }    
            }
            firstField = false;
        });
    }
    if (req.query.order) {
        sortObject = JSON.parse(req.query.order);
        sql_select += ` ORDER BY ${sortObject.column} ${sortObject.direction}`;
    }
    sql_select += ' for json path';
    return sql_select;
}

// export the sql and connection pool objects
module.exports = {
    sql, dbConnPoolPromise, buildSelect
};
