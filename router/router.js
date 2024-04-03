const router=require('express').Router();
const userRouter=require('./users.router');
/*const favoritRouter=require('./favorits.router');
const contenuMessageRouter=require('contenuMessages.router');*/


router.use('/user',userRouter);

/*router.use('/favoris',favoritRouter);

router.use('/message',contenuMessageRouter);*/



module.exports = router;