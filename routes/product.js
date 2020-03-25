// https://restfulapi.net/http-status-codes/

// Import router package
const router = require('express').Router();
const validator = require('validator');
const { sql, dbConnPoolPromise, buildSelect } = require('../database/db.js');

// Define SQL statements here for use in function below
// These are parameterised queries note @named parameters.
// Input parameters are parsed and set before queries are executed

// for json path - Tell MS SQL to return results as JSON
const SQL_SELECT_ALL = 'SELECT * FROM YOUR_STUDENT_NUMBER.Product';

// without_array_wrapper - use for single result
const SQL_SELECT_BY_ID = 'SELECT * FROM YOUR_STUDENT_NUMBER.Product WHERE id = @id for json path, without_array_wrapper;';

// Second statement (Select...) returns inserted record identified by id = SCOPE_IDENTITY()
const SQL_INSERT = 'INSERT INTO YOUR_STUDENT_NUMBER.Product (categoryId, productName, description, stock, price) VALUES (@categoryId, @productName, @description, @stock, @price); SELECT * from YOUR_STUDENT_NUMBER.Product WHERE id = SCOPE_IDENTITY();';

const SQL_UPDATE = 'UPDATE YOUR_STUDENT_NUMBER.Product SET categoryId = @categoryId, productName = @productName, description = @description, stock = @stock, price = @price WHERE id = @id; SELECT * FROM YOUR_STUDENT_NUMBER.Product WHERE id = @id;';

const SQL_DELETE = 'DELETE FROM YOUR_STUDENT_NUMBER.Product WHERE id = @id;';

/**
 * GET a list of all or if search criteria is set filter 
 * Address http://server:port/product
 * @search (optional) passed as parameter via url
 * @return JSON object
 */

/**
 * GET single by id
 * Address http://server:port/product/:id
 * @id passed as parameter via url
 * @return JSON object
 */

/**
 * Validate request data for both post/insert and put/update
 * @param http request
 * @param isUpdate validate id for update
 * @return errors if any
 */

/**
 * POST - Insert a new product
 * This async function processes a HTTP post request
 */

/**
 * PUT - Update an existing product
 * This async function processes a HTTP put request
 */

/**
 * DELETE single product by id
 * Address http://server:port/product/:id
 * @id passed as parameter via url
 */

module.exports = router;
