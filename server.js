//const express = require('express');
//const db = require('./db/connection');
//const inputCheck = require('./utils/inputCheck');
const inquirer = require('inquirer');
const consoleTable = require('console.table');
//const { response } = require('express');
//const consoleTable = require("console.table");
////const apiRoutes = require('./routes/apiRoutes');

//const PORT = process.env.PORT || 3001;
//const app = express();

//app.use(express.urlencoded({ extended: false }));
//app.use(express.json());
//app.use('/api', apiRoutes);

const mysql = require('mysql2');
//const { connect } = require('./db/connection');
//const Connection = require('mysql2/typings/mysql/lib/Connection');

const db = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: 'Shalom1994@',
        database: 'organizer'
    });

db.connect(function(err){
  if (err) throw err;
  showAll();
})

function showAll() {
    inquirer
    .prompt({
        name: "action",
        type: "list",
        message: "What would you like to do?",
        choices: [
            "View all departments",
            "View all roles",
            "View all employees",
            "Add a department",
            "Add a role",
            "Add a employee",
            "Update an employee role"
        ]
    })
    .then(function(inputData){
        switch (inputData.action){
            case "View all departments": viewDepartment(); break;
            case "View all roles": viewRole(); break;
            case "View all employees": viewEmployees(); break;
            case "Add a department": addDepartment(); break;
            case "Add a role": addRole(); break;
            case "Add a employee": addEmployee(); break;
            case "Update an employee role": UpdateRole(); break;
            //case "Delete unwanted department": removeDepartment(); break;
        }
    });
}

const viewDepartment= () => {
    
    const sql = `SELECT * FROM Department`;

    db.query(sql, (err, res) => {
        if (err) throw err;
        console.log(res);
        showAll();
    });
};

//const removeDepartment = () => {
    //let departments = [];
    //const sql = ` DELETE FROM Department WHERE id = ?`;
    //const params = [req.params.id];

    //db.query(sql, params, (err, result) => {
        //if (err){
            //res.statusMessage(400).json({ error: res.message });
        //} else if (!result.affectedRows){
            //res.json({
                //message: 'Department is not listed'
            //});
        //} else {
            //res.json ({
               // message: 'You have deleted department successfully',
                //changes: result.affectedRows,
                //id: req.params.id
            //});
        //}
    //});
   // inquirer
    //.prompt({
        //name:"deleteDepartment", type:"list", message:"select one to remove from list.", choices: 
    //})
//};
const addDepartment = () => {
    inquirer
    .prompt({
            name: "newDepartment", type: "input", message: "Enter new department name.",
            validate: (input) => {
                if ( !input ) { return 'Cannot accept an empty input.'; }
                return true;
            },
    })
    .then (response => {
        db.query("INSERT INTO Department SET ?", 
            { Department_name: response.newDepartment },
            (err, res) => {
              if (err) throw err;
              console.log(`${response.newDepartment} has added to your depaetment table`);
              showAll();
        });
    });
};

const viewRole = () => {
  const sql = `SELECT Roles.*, Department.Department_name
              AS Department_name
              FROM Roles
              LEFT JOIN Department
              ON Roles.Department_id = Department.id`;

    db.query(sql, (err, res) => {
        if (err) throw err;
        console.log(res);
        showAll();
    });
}

//app.delete('/api/role/:id', (req, res) => {
    //const sql = ` DELETE FROM Roles WHERE id = ?`;
    //const params = [req.params.id];

    //db.query(sql, params, (err, result) => {
        //if (err){
           // res.statusMessage(400).json({ error: res.message });
        //} else if (!result.affectedRows){
            //res.json({
               // message: 'Role is not listed'
            //});
        //} else {
            //res.json ({
                //message: 'You have deleted Role successfully',
                //changes: result.affectedRows,
                //id: req.params.id
            //});
       // }
    //});
//});

const addRole = () => {
    inquirer
    .prompt ([
        {
            name: "title", type: "input", message: "Enter role title of employees",
            validate: (input) => {
                if (input === "") {
                  return 'Input data is invalid or empty';
                }
                return true;
            }
        },
        {
            name: "roleSalary", type: "input", message: "Enter salary of related title",
            validate: (input) => {
                if (input === "") {
                    return 'Input data is invalid or empty';
                }
                return true;
            }
        },
        {
            name: "department", type: "input", message: "Enter department name of role",
            validate: (input) => {
                if (input === "") {
                    return 'Input data is invalid or empty';
                }
                return true;
            }
        }
    ])
    .then 

}
//app.post ('/api/role', ({body}, res) => {
   // const errors = inputCheck(body,'title','salary','Department_id');
    //if (errors) {
        //res.status(400).json({ error: errors });
        //return;
    //}
    //const sql = `INSERT INTO Roles (title, salary, Department_id)
        //VALUES (?,?,?)`;
    //const params = [body.title, body.salary, body.Department_id];

    //db.query(sql, params, (err, result) => {
        //if (err) {
          //res.status(400).json({ error: err.message });
         // return;
        //}
        //res.json({
          //message: 'success',
          //data: body
        //});
    //});
//});

//app.get ('/api/employees', (req,res) => {
  //const sql = `SELECT * FROM Employee`;

//db.query(sql, (err, rows) => {
  //if (err) {
    //res.status(500).json({ error: err.message });
    //return;
  //}
  //res.json({
    //message: 'success',
    //data: rows
  //});
//});
//});

////app.delete('/api/employee/:id', (req, res) => {
  //const sql = ` DELETE FROM Employee WHERE id = ?`;
  //const params = [req.params.id];

  //db.query(sql, params, (err, result) => {
     // if (err){
       //   res.statusMessage(400).json({ error: res.message });
     // } else if (!result.affectedRows){
         // res.json({
     //         message: 'Employee is not listed'
     //     });
     // } else {
      //    res.json ({
      //        message: 'You have deleted Employee successfully',
      //        changes: result.affectedRows,
      //        id: req.params.id
      //    });
     // }
 // });
//});
//app.post ('/api/employee', ({body}, res) => {
  //const errors = inputCheck(body,'first_name','last_name','role_id', 'manager_id');
  //if (errors) {
   //   res.status(400).json({ error: errors });
   //   return;
  //}
  //const sql = `INSERT INTO Employee (first_name, last_name, role_id, manager_id)
   //   VALUES (?,?,?,?)`;
 /// const params = [body.first_name, body.last_name, body.role_id, body.manager_id];

  //db.query(sql, params, (err, result) => {
   //   if (err) {
   //     res.status(400).json({ error: err.message });
    //    return;
    //  }
    //  res.json({
    //    message: 'success',
     //   data: body
     // });
  //});
////});



//app.put('/api/employee/:id', (req, res) => {
  //const sql = `UPDATE Employee SET role_id = ? 
  //             WHERE id = ?`;
  //const params = [req.body.role_id, req.params.id];
  ///db.query(sql, params, (err, result) => {
  //  if (err) {
    //  res.status(400).json({ error: err.message });
      // check if a record was found
   // } else if (!result.affectedRows) {
     // res.json({
     //   message: 'Person not found'
    //  });
   // } else {
    //  res.json({
     //   message: 'success',
      //  data: req.body,
      //  changes: result.affectedRows
      //});
    //}
  //});
//});


  //  app.use((req, res) => {
  //  res.status(404).end();
//});  

//db.connect(err => {
    //if (err) throw err;
   // console.log('Database connected.');
    //app.listen(PORT, () => {
    //  console.log(`Server running on port ${PORT}`);
   /// });
//});
  
  