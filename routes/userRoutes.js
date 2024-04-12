const express=require('express')
const {Register,Login,Logout} = require('../controllers/user')

const router=express.Router()

// " /register" r madhyma frontend to backend data jai & "post" method use kora hoi.
router.route("/register").post(Register);
router.route("/login").post(Login);
router.route("/logout").get(Logout);

module.exports=router;