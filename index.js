const inquirer = require("inquirer");
const fs = require("fs");

const writeFile = (answers) => 
`
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="style.css">
    <title>Team Profile</title>
</head>
<body>
    <header>
        <h1>My Team</h1>
    </header>

    <main id="info-blocks">
        <div class="row">
            <div class="card">
                <h4 class="name">${manager.getName()}</h4>
                <h3 class="role">${manager.getRole()}</h3>
                <p class="id">${manager.getId()}</p>
                <p class="email">${manager.getEmail()}</p>
                <p class="office">${manager.getOffice()}</p>
            </div>
            <div class="card"></div>
            <div class="card"></div>
        </div>
    </main>
</body>
</html>`

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
    .then((answers) => {
        const manager = new Manager(answers.name, answers.id, answers.email, answers.office);
    })