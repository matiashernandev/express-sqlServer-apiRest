import { query } from "mssql";
import { getConnetion, sql, queries } from "../database";

/* --------------------------------- GET ALL -------------------------------- */
export const getProducts = async (req, res) => {
    try {
        const pool = await getConnetion();
        const result = await pool.request().query(queries.getAllProduct);

        res.json(result.recordset);
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
};

/* ---------------------------------- POST ---------------------------------- */
export const createNewProduct = async (req, res) => {
    const { name, description } = req.body;
    let { quantity } = req.body;

    if (name == null || description == null) {
        return res.status(400).json({ msg: "Bad Resquest. TODO MAL" });
    }

    try {
        if (quantity == null) quantity = 0;

        //console.log(name, description, quantity);
        const pool = await getConnetion();

        await pool
            .request()
            .input("name", sql.VarChar, name)
            .input("description", sql.Text, description)
            .input("quantity", sql.Int, quantity)
            .query(queries.addNewProduct);

        //res.json("new product");
        res.json({ name, description, quantity });
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
};

/* --------------------------------- GET ONE -------------------------------- */
export const getProductById = async (req, res) => {
    try {
        const { id } = req.params;

        const pool = await getConnetion();
        const result = await pool
            .request()
            .input(`id`, id)
            .query(queries.getProductById); //id parametro para buscar

        res.send(result.recordset[0]);
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
};

/* --------------------------------- DELETE --------------------------------- */
export const deleteProductById = async (req, res) => {
    try {
        const { id } = req.params;

        const pool = await getConnetion();
        const result = await pool
            .request()
            .input("id", id)
            .query(queries.deleteProduct);

        res.sendStatus(204);
        // res.send(result); //devuelve la BD
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
};

/* --------------------------------- contar --------------------------------- */
export const getTotalProducts = async (req, res) => {
    try {
        const pool = await getConnetion();
        const result = await pool.request().query(queries.getTotalProducts);

        res.json(result.recordset[0][""]);
        console.log(result);
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
};

/* ----------------------------------- PUT ---------------------------------- */

export const updateProductById = async (req, res) => {
    const { name, description, quantity } = req.body;
    const { id } = req.params;

    if (name == null || description == null || quantity == null) {
        return res.status(400).json({ msg: "Bad Request. TODO MAL" });
    }

    const pool = await getConnetion();
    await pool
        .request()
        .input("name", sql.VarChar, name)
        .input("description", sql.Text, description)
        .input("quantity", sql.Int, quantity)
        .input("id", sql.Int, id)
        .query(queries.updateProductById);

    res.json({ name, description, quantity });
};
