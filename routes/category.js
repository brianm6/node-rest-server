// Import router package
const router = require('express').Router();
let validator = require('validator');
const { sql, dbConnPoolPromise } = require('../database/db.js');

// Define SQL statements here for use in function below
// These are parameterised queries note @named parameters.
// Input parameters are parsed and set before queries are executed

// for json path - Tell MS SQL to return results as JSON
const SQL_SELECT_ALL = 'SELECT * FROM bmoran.Category for json path;';
// without_array_wrapper - use for single result

const SQL_SELECT_BY_ID = 'SELECT * FROM bmoran.Category WHERE id = @id for json path, without_array_wrapper;';

// Second statement (Select...) returns inserted record identified by id = SCOPE_IDENTITY()
const SQL_INSERT = 'INSERT INTO bmoran.Category (categoryName, description) VALUES (@categoryName, @description); SELECT * from bmoran.Category WHERE id = SCOPE_IDENTITY();';

const SQL_UPDATE = 'UPDATE bmoran.Category SET categoryName = @categoryName, description = @description WHERE id = @id; SELECT * FROM bmoran.Category WHERE id = @id;';

const SQL_DELETE = 'DELETE FROM bmoran.Category WHERE id = @id;';

/**
 * GET a list of all categories
 * Address http://server:port/category
 * @return JSON object
 */
router.get('/', async (req, res) => {
    try {
        const pool = await dbConnPoolPromise
        const result = await pool.request()
            // execute query
            .query(SQL_SELECT_ALL);
        
        // Send HTTP reponse
        // JSON data from SQL is contained in first element of recordset
        res.status(200);
        res.json(result.recordset[0]);
    } catch(err) {
        res.status(500);
        res.send(err.message);
    }
});

/**
 * GET single category by id
 * Address http://server:port/category/:id
 * @id passed as parameter via url
 * @return JSON category object
 */
router.get('/:id', async (req, res) => {
    // Read value of parameter from the request url
    const categoryId = req.params.id;

    /**
     * Validate input - important as bad input could crash the server or lead to an attack
     * See link to validator npm package (at top) for docs
     * If validation fails return an error message
     */
    if (!validator.isNumeric(categoryId, { no_symbols: true })) {
        res.json({ "error": "invalid id parameter" });
        return false;
    }

    /**
     * If validation passed execute query and return result
     * Single category with matching id is returned
     */
    try {
        const pool = await dbConnPoolPromise
        const result = await pool.request()
            // set id parameter(s) in query
            .input('id', sql.Int, categoryId)
            // execute query
            .query(SQL_SELECT_BY_ID);
        
        // Send HTTP reponse
        // JSON data from SQL is contained in first element of recordset
        res.status(200);
        res.json(result.recordset[0]);
    } catch(err) {
        res.status(500);
        res.send(err.message);
    }
});

/**
 * Validate request data for both post/insert and put/update
 * @param http request
 * @param isUpdate validate id for update
 * @return errors if any
 */
function validate(req, isUpdate) {
    // Validate - erros string, initally empty, will store any errors
    let errors = "";

    if (isUpdate) {
        // Make sure that id is just a number - note that values are read from request body
        const id = req.body.id;
        if (!validator.isNumeric(String(id), { no_symbols: true })) {
            errors += "invalid id; ";
        }
    }
    
    // Escape text and potentially bad characters
    const categoryName = validator.escape(req.body.categoryName);
    if (categoryName === "") {
        errors += "invalid categoryName; ";
    }
    
    return errors;
}

/**
 * POST - Insert a new category
 * This async function processes a HTTP post request
 */
router.post('/', async (req, res) => {
    
    // Validate - erros string, initally empty, will store any errors
    let errors = validate(req);

    // If errors send details in response
    if (errors != "") {
        // return http response 400 (bad request) with errors if validation failed
        res.status(400);
        res.json({ "error": errors });
        return false;  
    }

    // If no errors, insert
    try {
        // Get a DB connection and execute SQL
        const pool = await dbConnPoolPromise
        const result = await pool.request()
            // set parameter(s) in query
            .input('categoryName', sql.NVarChar, validator.escape(req.body.categoryName))
            .input('description', sql.NVarChar, validator.escape(req.body.description || ''))
            // Execute Query
            .query(SQL_INSERT);
    
        // If successful, return inserted category via HTTP   
        res.status(201);
        res.json(result.recordset);
    } catch (err) {
        res.status(500);
        res.send(err.message);
    }
});

/**
 * PUT - Update an existing Category
 * This async function processes a HTTP put request
 */
router.put('/', async (req, res) => {

    // Validate - erros string, initally empty, will store any errors
    let errors = validate(req, true);

    // If errors send details in response
    if (errors != "") {
        // return http response 400 (bad request) with errors if validation failed
        res.status(400);
        res.json({ "error": errors });
        return false;  
    }

    // If no errors, update
    try {
        // Get a DB connection and execute SQL
        const pool = await dbConnPoolPromise
        const result = await pool.request()
            // set parameter(s) in query
            .input('categoryName', sql.NVarChar, validator.escape(req.body.categoryName))
            .input('description', sql.NVarChar, validator.escape(req.body.description))
            .input('id', sql.Int, req.body.id)
            // Execute Query
            .query(SQL_UPDATE);
    
        // If successful, return inserted category via HTTP   
        res.status(200);
        res.json(result.recordset[0]);
    } catch (err) {
        res.status(500);
        res.send(err.message);
    }
});

/**
 * DELETE single Category by id
 * Address http://server:port/category/:id
 * @id passed as parameter via url
 */
router.delete('/:id', async (req, res) => {
    // Read value of parameter from the request url
    const categoryId = req.params.id;

    /**
     * Validate input - important as bad input could crash the server or lead to an attack
     * See link to validator npm package (at top) for docs
     * If validation fails return an error message
     */
    if (!validator.isNumeric(categoryId, { no_symbols: true })) {
        res.json({ "error": "invalid id parameter" });
        return false;
    }

    // If validation passed delete category with matching id
    try {
        // Get a DB connection and execute SQL
        const pool = await dbConnPoolPromise
        const result = await pool.request()
            // set id parameter(s) in query
            .input('id', sql.Int, categoryId)
            // Execute Query
            .query(SQL_DELETE);
    
        // If successful, return OK
        res.status(200);
        res.end();
    } catch (err) {
        res.status(500);
        res.send(err.message);
    }
});

module.exports = router;
