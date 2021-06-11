const inquirer = require("inquirer");
const fs = require("fs");

const writeFile = (answers) => 
``

inquirer
    .prompt ([
        {
            type: "input",
            name: "name",
            message: "What is the team manager's name?"
        },
        {
            type: "input",
            name: "id",
            message: "What is the team manager's ID?"
        },
        {
            type: "input",
            name: "email",
            message: "What is the team manager's email address?"
        },
        {
            type: "input",
            name: "office",
            message: "What is the team manager's office number?"
        },
        {
            type: "list",
            name: "add2team",
            message: "Let's finish building your team. Which employee would you like to add next?", 
            choices: ["Engineer", "Intern", "I'm finished building my team."],  
        },
    ])