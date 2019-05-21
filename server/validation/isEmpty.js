const isEmpty = data => {
    return (
        data === null ||
        data === undefined ||
        (Array.isArray(data) && !data.length) ||
        (typeof data === "object" && !Object.keys(data).length) ||
        (typeof data === "string" && !data.trim())
    )
};

module.exports = isEmpty;