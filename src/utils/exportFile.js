const ExcelJS = require("exceljs");

module.exports = async (
    res,
    models,
    nameSheet = "Unnamed",
    fileName,
    columns
) => {
    try {
        let workbook = new ExcelJS.Workbook();

        const sheet = workbook.addWorksheet(nameSheet);
        sheet.columns = columns;

        await models.map((value, index) => {
            sheet.addRow({
                stt: index + 1,
                name: value.dataValues.name,
                email: value.dataValues.email,
                address: value.dataValues.address,
                createdAt: value.dataValues.createdAt,
            });
        });

        res.setHeader(
            "Content-Type",
            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
        );
        res.setHeader(
            "Content-Disposition",
            "attachment; filename=" + fileName
        );
        workbook.xlsx.write(res);
    } catch (e) {
        console.log(e);
    }
};
