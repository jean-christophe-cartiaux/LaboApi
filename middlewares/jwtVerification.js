const jwt= require('jsonwebtoken');

const jwtVerification=(req,res,next) =>{
    const secret = process.env.JWT_SECRET

    const authHeader=req.headers['autorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if(!token){
        res.sendStatus(401);
    }else{
        jwt.verify(token,secret,(err,payload)=>{
            if(err && err.name !=='TokenExpiredError'){
                res.sendStatus(403);
            }else if (err && err.name=== 'TokenExpiredError'){
                const decodeTokenPayload = jwt.decode(token)
                const newPayload = {
                    userId:decodeTokenPayload.userId,
                    email:decodeTokenPayload.email
                };
                const newToken=
            }
        })
    }
}