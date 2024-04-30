const db = require('../db')

class graphController {
    async getRam(res) {

        const query = 'SELECT * FROM ram_data';

        try {
            const result = await db.query(query);
            res.json(result.rows);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Internal server error' });
        }
    }

}

module.exports = new graphController()