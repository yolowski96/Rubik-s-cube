const { Router } = require("express");
const router = Router();
const authService = require("../services/authService");
const { COOKIE_NAME } = require("../config/config");

router.get("/login", (req, res) => {
  res.render("login");
});

router.get("/register", (req, res) => {
  res.render("register");
});

router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    let token = await authService.login({ username, password });
    
    res.cookie(COOKIE_NAME,token);
    
    res.redirect('/');
  } catch (error) {
    res.render("login", { error });
  }
});

router.post("/register", async (req, res) => {
  const { username, password, repeatPassword } = req.body;
  if (password !== repeatPassword) {
    return res.render("register", { message: "Password missmatch !" });
  }

  try {
    await authService.register({ username, password });

    res.redirect("/auth/login");
  } catch (error) {
    res.render("register", { error });
  }
});

router.get('/logout',(req,res) => {
    res.clearCookie(COOKIE_NAME);
    res.redirect('/');
});

module.exports = router;
