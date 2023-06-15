const express = require("express");
const app = express();
const port = 5000; // Specify the port you want to use

// Middleware
app.use(express.json());

// Routes
app.get("/", (req, res) => {
  res.send("ContactList App v0.1");
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

module.exports = app;
