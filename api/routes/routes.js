const userControllerMethods = require ('../controllers/userControllers');

const middleware = require ('../middleware/middleware');

module.exports = (app) => {
    app.route('/create-user').post(middleware.hashPassword, userControllerMethods.createUser);
}