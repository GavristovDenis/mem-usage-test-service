const db = require('../db')

class authController {
    async login(req, res) {
        const { Username, Password } = req.body;
        const query = 'SELECT * FROM users where username = $1 and password = $2';
        const values = [Username, Password];
        try {
            const result = await db.query(query, values);
            if (result.rowCount === 0) {
                res.status(401).json({ message: 'Invalid username or password' });
                return;
            }
            res.json(result.rows[0]);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    }
}

module.exports = new authController()