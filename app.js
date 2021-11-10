const fs = require('fs');
const inquirer = require('inquirer');

inquirer
    .prompt([
        {
            type: '',
            name: 'select',
            message:'What would you like to do?'
        }
    ])
    .then(answers => console.log(answers));