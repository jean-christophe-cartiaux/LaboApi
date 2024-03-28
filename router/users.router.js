const router=require('express').Router();
const userControler=require('../controllers/users.controller');

router.route('/')


    .get(userControler.getById)

router.route('/login')
    .post(userControler.login)
router.route('/register')
    .post(userControler.register)
router.route('/profil')
    .delete(userControler.deleteUser)
    .patch(userControler.updateUser)