// seed.js
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const User = require("./models/User");
const bcrypt = require("bcryptjs");

dotenv.config();

const rawUsers = [
  { name: "Ram User", email: "user@example.com", password: "password123", role: "user" },
    { name: "Raju User", email: "raju@example.com", password: "password123", role: "user" },

  { name: "Shyam Admin", email: "admin@example.com", password: "password123", role: "admin" },
  { name: "Hari SuperAdmin", email: "superadmin@example.com", password: "password123", role: "super_admin" },
];

async function seedData() {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    await User.deleteMany();

    const users = await Promise.all(
      rawUsers.map(async user => ({
        ...user,
        password: await bcrypt.hash(user.password, 12),
      }))
    );

    await User.insertMany(users);

    process.exit();
  } catch (error) {
    
    process.exit(1);
  }
}

seedData();
