const pool = require('../config/db');

exports.Login = async (req, res) => {
    try {
        const {password, id} = req.body;
        const [rows] = await pool.query(`SELECT * from user u WHERE u.id = ? and u.password = ?`, [id, password]);
        if(rows.length > 0) {
            res.status(200).json({message:"not error", user: rows[0]});
        } else {
            res.status(200).json({ message: "not found user", user: [] });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({message:"back-end 500 error "});
    }
}

exports.register = async (req, res) => {
    try {
        const { id, password, name } = req.body;

        const [existingUser] = await pool.query(`SELECT id FROM user WHERE id = ?`, [id]);
        if (existingUser.length > 0) {
            return res.status(409).json({ message: "This ID already exists. Please use a different ID." });
        }

        const result = await pool.query(
            `INSERT INTO user (id, password, name) VALUES (?, ?, ?)`,
            [id, password, name]
        );

        if (result[0].affectedRows > 0) {
            return res.status(201).json({ message: "The user has been successfully registered." });
        } else {
            return res.status(400).json({ message: "User registration failed." });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "back-end error" });
    }
};
