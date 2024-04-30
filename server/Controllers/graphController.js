const db = require('../db')
const ExcelJS = require('exceljs');
const dayjs = require('dayjs');
class graphController {
    async getRam(req, res) {
        const query = 'SELECT * FROM ram_data';

        try {
            const result = await db.query(query);
            res.json(result.rows);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Internal server error' });
        }
    }
    async downloadRam(req, res) {
        const { firstDate, secondDate } = req.body
        const query = firstDate && secondDate ? `SELECT * from ram_data WHERE ts >= '${firstDate}' AND ts <= '${secondDate}'` : firstDate ? `SELECT * from ram_data WHERE ts >= '${firstDate}'` : secondDate ? `SELECT * from ram_data WHERE ts <= '${secondDate}'` : `SELECT * from ram_data`
        try {
            const result = await db.query(query)
            const data = result.rows
            const workbook = new ExcelJS.Workbook();
            const worksheet = workbook.addWorksheet('My Sheet');
            worksheet.columns = [

                { header: 'ts', key: 'ts', width: 30 },
                { header: 'mem_usage', key: 'mem_usage', width: 30 }

            ];


            data.forEach(row => {
                worksheet.addRow({

                    ts: dayjs(row.ts).format("DD/MM/YYYY"),
                    mem_usage: row.mem_usage

                });
            });


            res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
            res.setHeader('Content-Disposition', 'attachment; filename=' + 'export.xlsx');
            await workbook.xlsx.write(res);
        }
        catch (e) {
            console.log(e)
        }
    }
}

module.exports = new graphController()