const connection = require('../config/db')

const getUser = async (req, res) => {
    let query = "SELECT * FROM user";
    const [result] = await connection.query(query);
    res.status(200).json({
        message: "Data fetched successfully",
        data: result
    });
};


const getUserById = async (req, res) => {
    let query = "SELECT * FROM user WHERE user_id = ?";
    const [result] = await connection.query(
        query,
        [req.params.id]
    );
    res.status(200).json({
        message: "Data fetched successfully",
        data: result
    });
};


const postUser = async (req, res) => {
    let query = "INSERT INTO user SET ?";
    const [result] = await connection.query(
        query,
        [req.body]
    );
    res.status(201).json({
        message: "Data inserted successfully",
        userId: result.insertId
    });
};

module.exports = { getUser , postUser , getUserById };