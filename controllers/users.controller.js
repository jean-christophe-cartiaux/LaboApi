const usersService =require('../services/users.service');
const commentsService =require('../services/comments.service');
const favoritsService =require('../services/favorits.service');
const contenueMessagesService =require('../services/contenuMessages.service');
const authValidator=require('../validators/auth.validator');
const jwt =require('jsonwebtoken');
const bcrypt =require('bcrypt');
const userValidator=require('../validators/users.validators');

const usersController={
    register:async(req,res)=>{
        try{
            const bodyValidated =await userValidator.validate(req.body)
            const {nom,prenom,pseudo,email,mdp}=bodyValidated;
            const hashedmdp=bcrypt.hashSync(mdp,10);
            const result=await usersService.register({nom,prenom,pseudo,email,hashedmdp})

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

        }catch (err){
            console.error(err)
            res.sendStatus(500);
        }
    }

}
module.exports = usersController;

