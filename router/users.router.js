const router=require('express').Router();
const userController=require('../controllers/users.controller');

router.route('/:userId')
    .get(userController.getById)

router.route('/login')
    .post(userController.login)
router.route('/register')
    .post(userController.register)



router.route('/profil/:userId')
    .patch(userController.updateUser)
    .delete(userController.deleteUser)

module.exports = router;