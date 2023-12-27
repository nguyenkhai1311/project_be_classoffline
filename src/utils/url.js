module.exports = {
    getPaginateUrl: (req, page) => {
        const query = req.query;
        query.page = page;
        console.log(new URLSearchParams(query).toString());
        return new URLSearchParams(query).toString();
    },

    pagination: (page) => {
        return;
    },
};
