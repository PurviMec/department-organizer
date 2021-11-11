const express = require('express');
const db = require('./db/connection');
const inputCheck = require('./utils/inputCheck');
////const apiRoutes = require('./routes/apiRoutes');

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
//app.use('/api', apiRoutes);

app.get ('/api/departments', (req,res) => {
    const sql = `SELECT * FROM Department`;

  db.query(sql, (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({
      message: 'success',
      data: rows
    });
  });
});

app.delete('/api/department/:id', (req, res) => {
    const sql = ` DELETE FROM Department WHERE id = ?`;
    const params = [req.params.id];

    db.query(sql, params, (err, result) => {
        if (err){
            res.statusMessage(400).json({ error: res.message });
        } else if (!result.affectedRows){
            res.json({
                message: 'Department is not listed'
            });
        } else {
            res.json ({
                message: 'You have deleted department successfully',
                changes: result.affectedRows,
                id: req.params.id
            });
        }
    });
});

app.post ('/api/department', ({body}, res) => {
    const errors = inputCheck(
        body,
        'Department_name'
    );
    if (errors) {
        res.status(400).json({ error: errors });
        return;
    }
    const sql = `INSERT INTO Department (Department_name)
        VALUES (?)`;
    const params = [body.Department_name];

    db.query(sql, params, (err, result) => {
        if (err) {
          res.status(400).json({ error: err.message });
          return;
        }
        res.json({
          message: 'success',
          data: body
        });
    });
});

app.use((req, res) => {
    res.status(404).end();
});  

db.connect(err => {
    if (err) throw err;
    console.log('Database connected.');
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
});
  
  