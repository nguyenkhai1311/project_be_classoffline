const moment = require("moment");

module.exports = {
    getEndDate: (timeStart, totalDay, dayPerWeek = 2) => {
        const date = new Date(timeStart);
        const countDate = Math.ceil((totalDay / dayPerWeek) * 7);
        // const dateEnd = moment(timeStart).add(countDate, "days");
        date.setDate(date.getDate() + countDate);
        return date;
    },
};
