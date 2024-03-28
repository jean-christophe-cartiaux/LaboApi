const yup =require('yup');
const {object} = require('yup')

const authValidator= object({
    email:yup.string().max(50).required('Email obligatoire'),
    password:yup.string().min(8).max(150).required('password obligatoire min 8 cara')
})
module.exports = authValidator;