const usersService =require('../services/users.service');
/*const commentsService =require('../services/comments.service');
const favoritsService =require('../services/favorits.service');
const contenueMessagesService =require('../services/contenuMessages.service');
const authValidator=require('../validators/auth.validator');*/
const jwt =require('jsonwebtoken');
const bcrypt =require('bcrypt');
const userValidator=require('../validators/users.validators');
const authValidator=require('../validators/auth.validator')

const usersController={
    register:async(req,res)=>{
        try{
            const bodyValidated =await userValidator.validate(req.body)
            const {nom,prenom,pseudo,email,mdp,bio}=bodyValidated;
            const hashedMdp=bcrypt.hashSync(mdp,10);
            const result=await usersService.register({nom,prenom,pseudo,email,hashedMdp,bio})

            if(result){
                return res.status(200).json({message:' l\'utilisateur a bien eter enregistré ༼ つ ◕_◕ ༽つ '})
            }

        }catch (err){
            console.error(err)
            res.sendStatus(500);
        }
    },
    login:async(req,res)=>{
        try{
            const bodyValidated =await authValidator.validate(req.body)
            const {email,mdp}=bodyValidated;
            const user = await usersService.login(email);
            console.log('tata')
            console.log(user)
            if(!user) {
                console.log('je suis pas au bonne endroit')
                return res.status(404).json({message: `l'utilisateur avec l'email ${email} n'existe pas 🙀¯\\_(ツ)_/¯`})
            }
            if(user.jwt){
                return res.status(200).redirect('/profil')
            }else if (mdp){
            const isMdpValide =bcrypt.compareSync(mdp,user.mdp)
                if (!isMdpValide){
                    return res.status(401).json({message:`Mots de passe invalide ಠ_ಠ`})
                }
                const id=user.id;
                const paylod={
                    userId:id,
                    email:user.email
                };
                const options={
                    expiresIn: '24'
                }
                const secret = process.env.JWT_SECRET;
                const token = jwt.sign(paylod,secret,options);
                const clientJwt=await usersService.addJwt({token,id})//add jwt
                if(clientJwt){
                    res.setHeader('Authorization',`Bearer ${token}`)
                    res.status(200).json({token});

                }else{
                    res.status(500).json({message:`Erreur lors de l'ecriture du header 'Authorization' 🔨`})
                }
            }

        }catch (err){
            console.error(err)
            res.sendStatus(500);
        }
    },
    updateUser:async(req,res)=>{
        try{

        }catch (err){
            console.error(err)
            res.sendStatus(500);
        }
    },
    deleteUser:async(req,res)=>{
        try{

        }catch (err){
            console.error(err)
            res.sendStatus(500);
        }
    },
    getById:async(req,res)=>{
        try{
            const {userId}=req.payload;
            const user=await usersService.getById(userId);
            if(!user){
                res.status(404).json({message:`Alien Introuvable 🛸👽`})
            }else {
                const profil={
                    nom:user.nom,
                    email:user.email,
                    bio:user.bio,
                }
                res.status(200).json({message:`ovni trouver avec succes (*/ω＼*)`,profil})
            }

        }catch (err){
            console.error(err)
            res.sendStatus(500);
        }
    }

}
module.exports = usersController;

