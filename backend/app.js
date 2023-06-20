const express = require("express");
const app = express();
const db = require("./src/db/db-connect");
const PORT = 5000;

const cors = require("cors");
const corsOptions = {
  origin: "*",
  credentials: true,
  optionSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(express.json());

// Routes ----------------------------------------
const userRouter = require("./src/routes/user.route");
const profileRouter = require("./src/routes/profile.route");
const adminRouter = require("./src/routes/admin.route");

app.use("/api/user", userRouter);
app.use("/api/profile", profileRouter);
app.use("/api/admin", adminRouter);

// Test route ----------------------------------------
app.get("/", (req, res) => {
  res.send("myContactList App v. 0.1");
});

async function startServer() {
  try {
    let mongooseInstance = await db.connectToDatabase();

    app.set("mongooseInstance", mongooseInstance);

    const server = app.listen(process.env.PORT || PORT, () => {
      const port = server.address().port;
      console.log(`API Server listening on port ${port}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error);
    db.closeDatabaseConnection();
  }
}

startServer();

module.exports = app;
