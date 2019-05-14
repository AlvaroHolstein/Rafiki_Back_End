const router = require('express').Router()
const authController = require('../controllers/auth/auth.controller')
const verifyToken = require('../controllers/auth/VerifyToken')

router.get('/', function (req, res) {
    console.log(req);
    res.send('<h1>Routa para "chamadas" de autenticação</h1>')
})

//Authentication
router.post("/register", (req, res) => {
    authController.register(req, res);
});
router.post("/login", (req, res) => {
    authController.login(req, res);
});

router.get("/logout", verifyToken, (req, res) => {
    authController.logout(req, res);
});

module.exports = router;