const express = require('express');
const db = require('./db/connection');
const inputCheck = require('./utils/inputCheck');
const inquirer = require('inquirer');
const consoleTable = require('console.table');
//const consoleTable = require("console.table");
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

app.get ('/api/roles', (req,res) => {
    const sql =`SELECT * FROM Roles`;

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

app.delete('/api/role/:id', (req, res) => {
    const sql = ` DELETE FROM Roles WHERE id = ?`;
    const params = [req.params.id];

    db.query(sql, params, (err, result) => {
        if (err){
            res.statusMessage(400).json({ error: res.message });
        } else if (!result.affectedRows){
            res.json({
                message: 'Role is not listed'
            });
        } else {
            res.json ({
                message: 'You have deleted Role successfully',
                changes: result.affectedRows,
                id: req.params.id
            });
        }
    });
});

app.post ('/api/role', ({body}, res) => {
    const errors = inputCheck(body,'title','salary','Department_id');
    if (errors) {
        res.status(400).json({ error: errors });
        return;
    }
    const sql = `INSERT INTO Roles (title, salary, Department_id)
        VALUES (?,?,?)`;
    const params = [body.title, body.salary, body.Department_id];

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

app.get ('/api/employees', (req,res) => {
  const sql = `SELECT * FROM Employee`;

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

app.delete('/api/employee/:id', (req, res) => {
  const sql = ` DELETE FROM Employee WHERE id = ?`;
  const params = [req.params.id];

  db.query(sql, params, (err, result) => {
      if (err){
          res.statusMessage(400).json({ error: res.message });
      } else if (!result.affectedRows){
          res.json({
              message: 'Employee is not listed'
          });
      } else {
          res.json ({
              message: 'You have deleted Employee successfully',
              changes: result.affectedRows,
              id: req.params.id
          });
      }
  });
});
app.post ('/api/employee', ({body}, res) => {
  const errors = inputCheck(body,'first_name','last_name','role_id', 'manager_id');
  if (errors) {
      res.status(400).json({ error: errors });
      return;
  }
  const sql = `INSERT INTO Employee (first_name, last_name, role_id, manager_id)
      VALUES (?,?,?,?)`;
  const params = [body.first_name, body.last_name, body.role_id, body.manager_id];

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



app.put('/api/employee/:id', (req, res) => {
  const sql = `UPDATE Employee SET role_id = ? 
               WHERE id = ?`;
  const params = [req.body.role_id, req.params.id];
  db.query(sql, params, (err, result) => {
    if (err) {
      res.status(400).json({ error: err.message });
      // check if a record was found
    } else if (!result.affectedRows) {
      res.json({
        message: 'Person not found'
      });
    } else {
      res.json({
        message: 'success',
        data: req.body,
        changes: result.affectedRows
      });
    }
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
  
  