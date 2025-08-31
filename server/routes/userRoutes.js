const express = require("express");
const { protect } = require("../middleware/auth");
const { authorize } = require("../middleware/role");
const { getUsers, getUser, createUser, updateUser, deleteUser } = require("../controllers/userController");

const router = express.Router();

router.use(protect);

router.get("/", authorize(["admin","super_admin","user"]), getUsers);
router.get("/:id", authorize(["admin","super_admin"]), getUser);
router.post("/", authorize(["super_admin"]), createUser);
router.put("/:id", authorize(["admin","super_admin","user"]), updateUser);
router.delete("/:id", authorize(["super_admin"]), deleteUser);

module.exports = router;
