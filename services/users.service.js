const sql=require('mssql');
const sqlConfig=require('../databes');




const userService={
    register:async(data)=>{
        try{
            await sql.connect(sqlConfig);
            const {nom,prenom,pseudo,email,hashedMdp,bio}=data;
            const dateCreationProfil=new Date()
            const request = new sql.Request();
            request //sanitization
                .input('nom',sql.NVarChar,nom)
                .input('prenom',sql.NVarChar,prenom)
                .input('pseudo',sql.NVarChar,pseudo)
                .input('email',sql.NVarChar,email)
                .input('hashedMdp',sql.NVarChar,hashedMdp)
                .input('dateCreationProfil',sql.DateTime,dateCreationProfil)
                .input('bio',sql.NVarChar, bio ? bio : null) //! bio ? bio :null  / permet de savoir si bio existe dans se qua la ok bio sinon bio = null
            const result = await request.query('INSERT INTO users (nom,prenom,pseudo,email,mdp,dateCreationProfil,bio) VALUES(@nom,@prenom,@pseudo,@email,@hashedMdp,@dateCreationProfil,@bio) ');
            if(result.rowsAffected[0] > 0){
                return result
            }
                }catch (err){
                    throw new Error(err)
        }
    },
    login:async(email)=>{
        try{
            await sql.connect(sqlConfig);
            const result = await sql.query `SELECT * from users WHERE email=${email}`
        if(result.recordset.length > 0){
            return result.recordset[0];
        }

        }catch (err){
            throw new Error(err)
        }
    },
    updateUser:async(user,data)=>{
        try{
            await sql.connect(sqlConfig);
            const updateQuery=`UPDATE users SET ${data.join(', ')} WHERE userId=${user.userId}`;
            const result =await sql.query(updateQuery);
            return (result.rowsAffected[0] >0)


        }catch (err){
            console.error(err)

        }
    },
    deleteUser:async(userId)=>{
        try{
            await sql.connect(sqlConfig);
            const result = await sql.query `DELETE FROM users WHERE userId=${userId}`;
            if(result.rowsAffected[0] >0){
                return result
            }

        }catch (err){
            console.error(err)

        }
    },
    getById:async(userId)=>{
        try{
            await sql.connect(sqlConfig);
            const request = new sql.Request();
            const result =await request
                .input('userId',sql.Int,userId)
                .query('SELECT * FROM users WHERE userId = @userId')

            return result.recordset[0];

        }catch (err){
            console.error(err)
            throw err;
        }
    },
    addJwt:async (userId,jwt)=>{
        try{
            await sql.connect(sqlConfig);
            const request = new sql.Request();
            console.log(typeof userId)
            const result =await request
                .input('userId',sql.Int,userId)
                .input('jwt',sql.NVarChar,jwt)
                .query('UPDATE users SET jwt  = @jwt WHERE userId=@userId')

            return result.rowsAffected[0] > 0;

        }catch (err){
            console.error(err)
            throw err;
        }
    }

}
module.exports = userService;