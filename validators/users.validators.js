const yup = require('yup');
const  {object}=require('yup');


const userValidator =object({
    nom:yup.string().max(50).required(),
    prenom:yup.string().max(50).required(),
    pseudo:yup.string().max(30).required(),
    email:yup.string().max(50).required(),
    mdp:yup.string().min(8).max(500).required(),
    bio:yup.string().max(500)

})
module.exports = userValidator;
