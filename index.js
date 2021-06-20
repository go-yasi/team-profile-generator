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
            // grab user inputs
            const manager = new Manager(answers.name, answers.id, answers.email, answers.office);
            // add mamanger to team
            teamProfile.push(manager);
            // run function to add next member
            nextMember();
        });
}

const nextMember = () => {
    return inquirer
        .prompt([
            {
                type: "list",
                message: "Let's finish building your team! Which type of employee would you like to add next?",
                choices: ["Engineer", "Intern", "I'm finished building my team."],
                name: "employee"
            }
        ])
        .then((answers) => {
            if (answers.employee === "Engineer") {
                // function to ask Engineer-specific questions
                addEngineer();
            } else if 
            (answers.employee === "Intern") {
                // need function to ask Intern-specific questions
                addIntern();
            } else {
                // genereate HTML
                const generateHTML = teamHTML(answers);
                fs.writeFile("new.html", generateHTML, (err) =>
                err ? console.log(err) : console.log("Congratulations! Your new Team Profile has been generated!")
                );
            }
        })
}

const addEngineer = () => {
    return inquirer
        .prompt([
            {
                type: "input",
                message: "What is the engineer's name?",
                name: "name"
            },
            {
                type: "input",
                message: "What is the engineer's employee ID?",
                name: "id"
            },
            {
                type: "input",
                message: "What is the engineer's email address?",
                name: "email"
            },
            {
                type: "input",
                message: "What is the engineer's GitHub username?",
                name:"github"
            }
        ])
        .then((answers) => {
            // grab user inputs fo new engineer
            const engineer = new Engineer(answers.name, answers.id, answers.email, answers.github);
            // add to team
            teamProfile.push(engineer);
            // run function to add next member
            nextMember();
        })
}

const addIntern = () => {
    return inquirer
        .prompt([
            {
                type: "input",
                message: "What is the intern's name?",
                name: "name"
            },
            {
                type: "input",
                message: "What is the intern's employee ID?",
                name: "id"
            },
            {
                type: "input",
                message: "What is the intern's email address?",
                name: "email"
            },
            {
                type: "input",
                message: "What school does the intern attend?",
                name: "school"
            }
        ])
        .then((answers) => {
            // grab user inputs for new intern
            const intern = new Intern(answers.name, answers.id, answers.email, answers.school);
            // add new intern to team
            teamProfile.push(intern);
            // run function to add next member
            nextMember();
        })
}

// HTML with provided answers
const teamHTML = (answers) =>
`
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="./style.css">
    <title>Team Profile</title>
</head>
<body>
    <header>
        <h1>My Team</h1>
    </header>

    <main id="info-blocks">
        <div class="row">
            <div class="card">
                <div class="card-head">
                    <h3 class="name">${manager.getName()}</h3>
                    <h4 class="role">${manager.getRole()}</h4>
                </div>
                <div class="card-info">
                    <p class="id">ID: ${manager.getId()}</p>
                    <a class="email">Email:  ${manager.getEmail()}</a>
                    <p class="office">Office: ${manager.getOffice()}</p>
                </div>
            </div>
            <div class="card">
                <div class="card-head">
                    <h3 class="name">${engineer.getName()}</h3>
                    <h4 class="role">${engineer.getRole()}</h4>
                </div>
                <div class="card-info">
                    <p class="id">ID: ${engineer.getId()}</p>
                    <a class="email">Email:  ${engineer.getEmail()}</a>
                    <p class="office">Office: ${engineer.getOffice()}</p>
                </div>
            </div>
        </div>
    </main>
</body>
</html>
`

// call ask manager to start the application
addManager();