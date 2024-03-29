const yup =require('yup');
const {object} = require('yup')

const authValidator= object({
    email:yup.string().max(50).required('Email obligatoire'),
    mdp:yup.string().min(6).max(150).required('password obligatoire min 6 cara')
})
module.exports = authValidator;