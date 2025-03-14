require("dotenv").config();
const express = require("express");
const cors = require("cors");
const todosRoutes = require("./routes/todosRoutes");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors()); // Enable CORS for cross-origin requests
app.use(express.json()); // Parse JSON request bodies

// Use the todos routes under /todos
app.use("/todos", todosRoutes);

// Root endpoint
app.get("/", (req, res) => {
  res.send("Todo API is running!");
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
