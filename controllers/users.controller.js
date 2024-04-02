const usersService =require('../services/users.service');
/*const commentsService =require('../services/comments.service');
const favoritsService =require('../services/favorits.service');
const contenueMessagesService =require('../services/contenuMessages.service');
const authValidator=require('../validators/auth.validator');*/
const jwt =require('jsonwebtoken');
const bcrypt=require('bcrypt')

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
                const id=user.userId;
                const paylod={
                    userId:id,
                    email:user.email
                };
                const options={
                    expiresIn: '24'
                }
                const secret = process.env.JWT_SECRET;
                const token = jwt.sign(paylod,secret,options);
                const userJwt=await usersService.addJwt(id,token)//add jwt
                if(userJwt){
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
            const {userId} = req.params;
            const {pseudo,email,oldMdp,newMdp,prenom,nom,bio}=req.body;

            const user=await usersService.getById(userId)

            if(!user){
                return res.status(404).json({message:`notre Alien avec l'id : ${userId}  a disparue dans l'espace 👽🛸`})
            }
            let updateUser=[];
            if (newMdp && oldMdp) {
                const isMdpValid = bcrypt.compareSync(oldMdp, user.mdp);
                if (!isMdpValid) {
                    return res.status(401).json({message: 'Mdp incorecte 🔨'})
                } else {
                    const hashedMdp = bcrypt.hashSync(newMdp, 10);
                    updateUser.push(`New MDP  = '${hashedMdp}'`);
                }
            }

            if (nom) updateUser.push(`nom = '${nom}'`)
            if (prenom) updateUser.push(`prenom = '${prenom}'`)
            if (bio) updateUser.push(`bio = '${bio}'`)
            if (pseudo) updateUser.push(`pseudo = '${pseudo}'`)
            if (email) updateUser.push(`email = '${email}'`)

            const result = await usersService.updateUser(user, updateUser);

            if (result) {
                return res.status(200).json({message: `l'Alien : ${userId} a bien été modifié 🛸👽`})
            } else {
                return res.status(500).json({message: `Le serveur a recontré une erreur`})
            }

        } catch (err) {
            console.error(err)
            res.sendStatus(500)
        }


    },
    deleteUser:async(req,res)=>{
        try{
            const {userId}=req.params;
            const result = await usersService.deleteUser(userId)
            if(!result){
                return res.status(404).json({message : `il n'y as pas d'utilisateur a l'id indiquer`})
            }
            return  res.status(200).json({message : `l'utilisateur ${userId} a éter supprimer avec succes 🛸👽`})

        }catch (err){
            console.error(err)
            res.sendStatus(500);
        }
    },
    getById:async(req,res)=>{
        try{
            const userId =req.params.userId;
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

