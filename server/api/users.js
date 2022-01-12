const router = require("express").Router();
const {
  models: { User },
} = require("../db");
const { requireToken, isAdmin } = require("./gatekeepingMiddleware");
module.exports = router;

router.get("/", requireToken, isAdmin, async (req, res, next) => {
  try {
    const users = await User.findAll({
      // explicitly select only the id and username fields - even though
      // users' passwords are encrypted, it won't help if we just
      // send everything to anyone who asks!
      attributes: ["id", "username"],
    });
    res.json(users);
  } catch (err) {
    next(err);
  }
});

router.post("/", async (req, res, next) => {
  try {
    //Go through JWT and BCRYPT of tokenizing the password before putting it into the database
  } catch (err) {
    next(err);
  }
});

router.get("/:userId", async (req, res, next) => {
  try {
    const singleUser = await User.findByPk(req.params.userId);
    res.json(singleUser);
  } catch (err) {
    next(err);
  }
});
