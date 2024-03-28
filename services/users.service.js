const sql=require('mssql');
const sqlConfig=require('../databes');
const {request} = require("express");


const userService={
    register:async(data)=>{
        try{
            await sql.connect(sqlConfig);
            const {nom,prenom,pseudo,email,mdp,bio}=data;
            const dateCreationProfil=new Date()
            const request = new sql.Request();
            request
                .input('nom',sql.NVarChar,nom)
                .input('prenom',sql.NVarChar,prenom)
                .input('pseudo',sql.NVarChar,pseudo)
                .input('email',sql.NVarChar,email)
                .input('mdp',sql.NVarChar,mdp)
                .input('dateCreationProfil',sql.DateTime,dateCreationProfil)
                .input('bio',sql.NVarChar,bio)
            const result = await request.query('INSERT INTO users (nom,prenom,pseudo,email,mdp,dateCreationPseudo,bio) VALUES(@nom,@prenom,@pseudo,@email,@hasedmdp,@dateCreationPseudo,@bio) ');
            if(result.rowsAffected[0] > 0){
                return result
            }
                }catch (err){
            throw new Error(err)
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
module.exports = userService;