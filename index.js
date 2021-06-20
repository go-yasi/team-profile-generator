// require inquirer
const inquirer = require("inquirer");
// require fs to write files
const fs = require("fs");

// import classes
const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");

// empty array to add new team members
const teamProfile = [];

// function to prompt questions about Manager and add to array
const addManager = () => {
    return inquirer
        .prompt([
            {
                type: "input",
                name: "name",
                message: "What is the team manager's name?"
            },
            {
                type: "input",
                name: "id",
                message: "What is the team manager's employee ID?"
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
            }
        ])
        .then((answers) => {
            const manager = new Manager(answers.name, answers.id, answers.email, answers.office);
            teamProfile.push(manager);
        });
}

const nextMember = () => {
    return inquirer
        .prompt([
            {
                type: "list",
                message: "Let's finish building your team! Which type of employee would you like to add?",
                choices: ["Engineer", "Intern", "I'm finished building my team."]
                name: "employee"
            }
        ])
        .then((answers) => {
            if (answers.employee === "Engineer") {
                // need function to ask Engineer-specific questions
            } else if 
            (answers.employee === "Intern") {
                // need function to ask Intern-specific questions
            } else {
                // genereate HTML
            }
        })
}