const express = require('express');
const { sendOTP, userRegister, OTPverificationUser, userVerify, userLogin, getEmployeeById, getAllEmployees, updateUser, Logout } = require('../controller/userController');

const router = express.Router()

router.post('/register', userRegister);
router.post('/send-otp', sendOTP);
router.post('/register/otp', OTPverificationUser);
router.post('/verifyuser', userVerify);
router.post('/login', userLogin);
router.get('/getanemployee/:id', getEmployeeById);
router.get('/allemployee', getAllEmployees);
 router.put('/updateuser/:id', updateUser);

// router.delete('/deletuser/:id', DeleteAUser)
router.post('/logout', Logout);

module.exports = router;