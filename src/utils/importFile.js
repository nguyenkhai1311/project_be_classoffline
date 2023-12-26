const ExcelJS = require("exceljs");
const model = require("../models/index");
const User = model.User;

module.exports = async (filename, nameSheet) => {
    var workbook = new ExcelJS.Workbook();

    await workbook.xlsx.readFile(filename).then(function () {
        var worksheet = workbook.getWorksheet(nameSheet);
        worksheet.eachRow(
            { includeEmpty: false },
            async function (row, rowNumber) {
                const currRow = worksheet.getRow(rowNumber);
                if (rowNumber !== 1) {
                    await User.create({
                        name: currRow.getCell(2).value,
                        email: currRow.getCell(3).value.text,
                        phone: currRow.getCell(4).value,
                        address: currRow.getCell(5).value,
                        typeId: currRow.getCell(6).value,
                    });
                }
            }
        );
    });
};
