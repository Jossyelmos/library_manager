const { handleErrors, mapObjects } = require("../utils");

const controllers = {
    authorsController: require("./authors"),
    booksController: require("./books"),
    membersController: require("./members"),
    loansController: require("./loan")
};

// Export all controllers with their handlers wrapped in error handling middleware
module.exports = mapObjects(controllers, handleErrors);
