const express = require("express");
const { connection } = require("./config/db");
const { userRouter } = require("./routes/User.routes");
const { oemRoute } = require("./routes/oem-route");
const { auth } = require("./middleware/auth.middleware");
const cors = require("cors");
const app = express();
require("dotenv").config();
app.use(cors());
app.use(express.json());
app.use("/user", userRouter);
app.use(auth);
app.use("/oem", oemRoute);

app.listen(process.env.port, async () => {
  try {
    await connection;
    console.log("Connected to db");
  } catch (err) {
    console.log(err);
    console.log("Error connecting in database");
  }

  console.log(`Server is running at port ${process.env.port}`);
});
