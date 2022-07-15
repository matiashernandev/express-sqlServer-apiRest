import { getConnetion, sql } from "../database/connection";

/* ----------------------------------- GET ---------------------------------- */
export const getProducts = async (req, res) => {
    const pool = await getConnetion();

    const result = await pool.request().query("SELECT * FROM Products");
    //console.log(result);

    //res.json("products");
    res.json(result.recordset);
};

/* ---------------------------------- POST ---------------------------------- */
export const createNewProduct = async (req, res) => {
    const { name, description } = req.body;
    let { quantity } = req.body;

    if (name == null || description == null) {
        return res.status(400).json({ msg: "Bad Resquest. TODO MAL" });
    }

    if (quantity == null) quantity = 0;

    //console.log(name, description, quantity);

    const pool = await getConnetion();

    await pool
        .request()
        .input("name", sql.VarChar, name)
        .input("description", sql.Text, description)
        .input("quantity", sql.Int, quantity)
        .query(
            `INSERT INTO Products (name, description, quantity) VALUES (@name, @description, @quantity)`
        );

    //res.json("new product");
    res.json({ name, description, quantity });
};
