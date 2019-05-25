const isEmpty = require("../validation/isEmpty");

const checkLists = (req, res, next) => {
    const { items } = req.body;

    if (isEmpty(items)) return res.status(400).json({error: "Note list is required"});
    let flag = true;
    items.forEach(item => {
        if (isEmpty(item.text)) {
            flag = false;
        }
    });
    if(!flag){
        return res.status(400).json({error: "Fields in list must not be empty"})
    } else {
        next();
    }
};

module.exports = checkLists;