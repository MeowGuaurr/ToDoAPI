const client = require('./db');

const getTodos = async (req, res) => {
  try {
    const result = await client.query('SELECT * FROM todos');
    res.json(result.rows);
  } catch (err) {
    console.error('Error fetching todos:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const addTodo = async (req, res) => {
  const { task, is_completed } = req.body;  
  try {
    const result = await client.query(
      'INSERT INTO todos (task, is_completed) VALUES ($1, $2) RETURNING *', 
      [task, is_completed] 
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error('Error adding todo:', err);
    res.status(500).json({ message: 'Failed to add todo' });
  }
};


const updateTodo = async (req, res) => {
  const { id } = req.params;
  const { task, is_completed } = req.body;

  try {
    const currentTodoResult = await client.query('SELECT * FROM todos WHERE id = $1', [id]);

    if (currentTodoResult.rowCount === 0) {
      return res.status(404).json({ message: 'Todo not found' });
    }

    const currentTask = currentTodoResult.rows[0].task;
    const currentIsCompleted = currentTodoResult.rows[0].is_completed;

    const updatedTask = task !== undefined ? task : currentTask;

    const updatedIsCompleted = is_completed !== undefined ? is_completed : currentIsCompleted;

    const result = await client.query(
      'UPDATE todos SET task = $1, is_completed = $2 WHERE id = $3 RETURNING *',
      [updatedTask, updatedIsCompleted, id]
    );

    res.status(200).json(result.rows[0]);
  } catch (err) {
    console.error('Error updating todo:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};



const deleteTodo = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await client.query(
      'UPDATE todos SET is_completed = $1 WHERE id = $2 RETURNING *',
      [true, id] // Mark as completed
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ message: 'Todo not found' });
    }

    res.status(200).json(result.rows[0]); // Return the updated todo
  } catch (err) {
    console.error('Error updating todo:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};


module.exports = {
  getTodos,
  addTodo,
  updateTodo,
  deleteTodo,
};
