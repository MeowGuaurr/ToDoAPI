require('dotenv').config(); // Load environment variables
const express = require('express');
const cors = require('cors');
const todosRoutes = require('./routes/todosRoutes');

const app = express();
const PORT = process.env.PORT || 5000; // Set the port from the environment variable or fallback to 5000

app.use(cors());
app.use(express.json()); // Parse JSON request bodies

// Use the todos routes, prefixing all routes with "/todos"
app.use('/todos', todosRoutes);

// Root endpoint to check if the API is running
app.get('/', (req, res) => {
  res.send('Todo API is running!');
});

// Start the server using the defined port
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
