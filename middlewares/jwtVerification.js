const jwt= require('jsonwebtoken');

const jwtVerification=(req,res,next) =>{
    const secret = process.env.JWT_SECRET

    const authHeader=req.headers['authorization'];
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
                    userId:decodeTokenPayload.id,
                    email:decodeTokenPayload.email
                };
                const newToken= jwt.sign(newPayload,secret,{expiresIn: '1d'});
                req.payload=newPayload;
                req.headers['authorization'] =`Bearer ${newToken}`;
                next();
            }else{
                res.payload=payload
                next();
            }
        })
    }
};
module.exports = jwtVerification;