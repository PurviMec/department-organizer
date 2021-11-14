//const express = require('express');
//const db = require('./db/connection');
//const inputCheck = require('./utils/inputCheck');
const inquirer = require('inquirer');
const mysql = require('mysql2');
const cTable = require("console.table");

//const { response } = require('express');
////const apiRoutes = require('./routes/apiRoutes');

//const PORT = process.env.PORT || 3001;
//const app = express();

//app.use(express.urlencoded({ extended: false }));
//app.use(express.json());
//app.use('/api', apiRoutes);


//const { response } = require('express');
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
  console.log(" Connection #" + db.threadId + "\n");
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
            "Update an employee role",
            "leave"
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
            case "leave": db.end(); break;
            //case "Delete unwanted department": removeDepartment(); break;
        }
    });
}

const viewDepartment= () => {
    
    const sql = `SELECT * FROM Department`;

    db.query(sql, (err, res) => {
        if (err) throw err;
        console.table(res);
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
        console.table(res);
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
            name: "departmentId", type: "input", message: "Enter department id to be updated as department",
            validate: (input) => {
                if (input === "") {
                    return 'Input data is invalid or empty';
                }
                return true;
            }
        }
    ])
    .then (response => {

        db.query('INSERT INTO Roles SET ?',
             { title : response.title, salary: response.roleSalary, Department_id: parseInt(response.departmentId) },
            (err, res) => {
               if(err) throw err;
               console.log("Role has added.");
               showAll();
            });
    });
}

const viewEmployees = () => {
    const sql = `SELECT Employee.*, Roles.title
                AS title
                FROM Employee
                LEFT JOIN Roles
                ON Employee.role_id = Roles.id
                 `;
    db.query(sql, (err, res) => {
    if (err) throw err;
    console.table(res);
    showAll();
    });
}

const addEmployee = () => {
    inquirer
    .prompt([
        {
            name: "firstName", type: "input", message: "Enter first name to be added to new employee.",
            validate: (input) => {
                if (input === "") {
                    return 'Input data is invalid or empty';
                }
                return true;
            }
        },
        {
            name: "lastName", type: "input", message: "Enter last name to be added to new employee.",
            validate: (input) => {
                if (input === "") {
                    return 'Input data is invalid or empty';
                }
                return true;
            }
        },
        {
            name: "roleId", type: "input", message: "Enter role id to be added to new employee title.",
            validate: (input) => {
                if (input === "") {
                    return 'Input data is invalid or empty';
                }
                return true;
            }
        },
        {
            name: "managerId", type: "input", message: "Enter manager id to be added to new employee.",
            validate: (input) => {
                if (input === "") {
                    return 'Input data is invalid or empty';
                }
                return true;
            }
        },
        {
            name: "salary", type: "input", message: "Enter salary to be added to new employee's salary.",
            validate: (input) => {
                if (input === "") {
                    return 'Input data is invalid or empty';
                }
                return true;
            }
        },
        {
            name: "departmentName", type: "input", message: "Enter department name to add employee to existing department.",
            validate: (input) => {
                if (input === "") {
                    return 'Input data is invalid or empty';
                }
                return true;
            }
        },
    ])
    .then (response => {
        db.query("INSERT INTO Employee SET ?",
        { first_name: response.firstName, last_name: response.lastName, role_id: parseInt(response.roleId), salary:response.salary, department: response.departmentName, manager_id: response.managerId},
        (err, res) => {
            if (err) {
                console.log("Invalid data");
                addEmployee();
                return;
            }
            console.log("You have sucessfully added an employee.");
            showAll();
        });
    });
};

const UpdateRole = () => {
    db.query(`
        SELECT id, first_name, last_name FROM Employee`,
        (err, res) => {
            if (err) throw err;
            inquirer
            .prompt([
                {
                    name: "EmployeeId",
                    type: "input",
                    message: "Enter the employee ID to update ",
                    validate: (input) => {
                        if (input === "") {
                          return 'Input data is invalid or empty';
                        }
                        return true;
                    }
                },
                {
                    name: "RoleId",
                    type: "input",
                    message: "Enter the role ID to update employee",
                    validate: (input) => {
                        if (input === "") {
                            return 'Input data is invalid or empty';
                        }
                        return true;
                    }
                }
            ])
            .then (response => {
                let newEmployeeId = parseInt(response.EmployeeId);
                let newRoleId = parseInt(response.RoleId);
                db.query(`UPDATE Employee SET role_id = ${newRoleId} WHERE id = ${newEmployeeId}`,
                (err, res) => {
                    if (err) {
                        console.log("Please enter valid id");
                        UpdateRole();
                        return;
                    }
                    console.log("ID is updated.");
                    showAll();
                });
            });
        });
};

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
  
  