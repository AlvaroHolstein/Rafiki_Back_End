const router = require("express").Router();
const authController = require("../controllers/auth/auth.controller");
const verifyToken = require("../controllers/auth/VerifyToken");

router.get("/", function(req, res) {
  console.log(req);
  res.send('<h1>Routa para "chamadas" de autenticação</h1>');
});

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

router.get("/forgotpassword", function(req, res) {
  res.send(
    '<form action="/auth-api/passwordreset" method="POST">' +
      '<input type="email" name="email" value="" placeholder="Enter your email address..." />' +
      '<input type="submit" value="Reset Password" />' +
      "</form>"
  );
});

router.post("/passwordreset", function(req, res) {
  authController.passwordreset(req, res);
});

router.get("/resetpassword/:id/:token", function(req, res) {
  authController.resetpassword(req, res);
});

router.post("/resetpassword", function(req, res) {
  authController.changepassword(req, res);
});
module.exports = router;
