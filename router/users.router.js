const router=require('express').Router();
const userController=require('../controllers/users.controller');

router.route('/')
    .get(userController.getById)

router.route('/login')
    .post(userController.login)
router.route('/register')
    .post(userController.register)
router.route('/profil')
    .delete(userController.deleteUser)
    .patch(userController.updateUser)

module.exports = router;