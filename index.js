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

function addEmployee(type) {
    // console.log("-------------------------------------------");
    // console.log("Let's build your team!");
    console.log("-------------------------------------------");
    console.log("Please provide the " + type + "'s info:");
    
    inquirer
    .prompt([
        {
            type: "input",
            name: "name",
            message: `What is the ${type}'s name?`
        },
        {
            type: "input",
            name: "id",
            message: `What is the ${type}'s ID?`
        },
        {
            type: "input",
            name: "email",
            message: `What is the ${type}'s email address?`
        }
    ])
    .then((employeeResponse) => {
        if(type === "Manager") {
            addManager(employeeResponse);
        } else if(type === "Engineer") {
            addEngineer(employeeResponse);
        } else if(type === "Intern") {
            addIntern(employeeResponse);
        }
    });
};


// function to prompt questions about Manager and push to array
function addManager(employeeResponse) {
    inquirer
    .prompt([
        {
            type: "input",
            name: "office",
            message: "What is the Manager's office number?"
        }
    ])
    .then((answers) => {
        // grab employee info
        const name = employeeResponse.name;
        const id = employeeResponse.id;
        const email = employeeResponse.email;
        // grab manager info
        const office = answers.office;
        
        // create new manager
        const manager = new Manager(name, id, email, office);
        // add manager to team
        teamProfile.push(manager);

        // run function to add next employee
        employeeType();
    });
};

// function to prompt questions about Engineer and push to array
function addEngineer(employeeResponse) {
    inquirer
    .prompt([
        {
            type: "input",
            message: "What is the Engineer's GitHub username?",
            name:"github"
        }
    ])
    .then((answers) => {
        // grab employee info
        const name = employeeResponse.name;
        const id = employeeResponse.id;
        const email = employeeResponse.email;
        // grab engineer info
        const github = answers.github;

        // create new engineer
        const engineer = new Engineer(name, id, email, github);
        // add engineer to team
        teamProfile.push(engineer);

        // run function to add next employee
        employeeType();
    });
};


// function to prompt questions about Intern and push to array
function addIntern(employeeResponse){
    inquirer
    .prompt([
        {
            type: "input",
            message: "What school does the Intern attend?",
            name: "school"
        }
    ])
    .then((answers) => {
        // grab employee info
        const name = employeeResponse.name;
        const id = employeeResponse.id;
        const email = employeeResponse.email;
        // grab intern info
        const school = answers.school;

        // create new intern
        const intern = new Intern(name, id, email, school);
        // add intern to team
        teamProfile.push(intern);

        // run function to add next employee
        employeeType();
    });
};

// function to select employee type
function employeeType() {
    let type;
    inquirer
    .prompt([
        {
            type: "list",
            message: `-------------------------------------------
Let's continue building your team! 
Which type of employee would you like to add?`,
            choices: ["Manager", "Engineer", "Intern", "I'm finished building my team."],
            name: "employeeType"
        }
    ])
    .then((answers) => {
        if (answers.employeeType === "Manager") {
            addEmployee("Manager");
        } else if (answers.employeeType === "Engineer") {
            addEmployee("Engineer");
        } else if (answers.employeeType === "Intern") {
            addEmployee("Intern");
        } else {
            generateHTML();
            return;
        }
    });
};

// function to generate html
function generateHTML() {
    var html= 
`<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Roboto+Condensed&family=Roboto:wght@300;400&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="./style.css">
    <title>Team Profile</title>
</head>
<body>
    <header>
        <h1>Team Profile</h1>
    </header>

    <main id="info-blocks">
        <div class="row">
`
    for(var i = 0; i < teamProfile.length; i++) {
        if (teamProfile[i].getRole() === "Manager") {
            html +=
`       
            <div class="manager card">
                <div class="card-head">
                    <h3 class="name">${teamProfile[i].getName()}</h3>
                    <h4 class="role">Manager</h4>
                </div>
                <div class="card-info">
                    <p class="id">Employee ID: ${teamProfile[i].getId()}</p>
                    <p class="office">Office: ${teamProfile[i].getOffice()}</p>
                    <p class="email">Email: <a href="mailto:${teamProfile[i].getEmail()}">${teamProfile[i].getEmail()}</a></p>
                </div>
            </div>
`
    } else if (teamProfile[i].getRole() === "Engineer") {
        html +=
`
            <div class="engineer card">
                <div class="card-head">
                    <h3 class="name">${teamProfile[i].getName()}</h3>
                    <h4 class="role">Engineer</h4>
                </div>
                <div class="card-info">
                    <p class="id">Employee ID: ${teamProfile[i].getId()}</p>
                    <p class="github">GitHub: <a href="https://github.com/${teamProfile[i].getGithub()}">@${teamProfile[i].getGithub()}</a></p>
                    <p class="email">Email: <a href="mailto:${teamProfile[i].getEmail()}">${teamProfile[i].getEmail()}</a></p>
                </div> 
            </div>
`
    } else if (teamProfile[i].getRole() === "Intern") {
        html +=
`       
            <div class="intern card">
                <div class="card-head">
                    <h3 class="name">${teamProfile[i].getName()}</h3>
                    <h4 class="role">Intern</h4>
                </div>
                <div class="card-info">
                    <p class="id">Employee ID: ${teamProfile[i].getId()}</p>
                    <p class="school">School: ${teamProfile[i].getSchool()}</p>
                    <p class="email">Email: <a href="mailto:${teamProfile[i].getEmail()}">${teamProfile[i].getEmail()}</a></p>
                </div> 
            </div>
`
    }};

    html +=
`
        </div>

   </main>

</body>
</html>`;

    fs.writeFile("home.html", html, (err) => 
    err ? console.log(err) : console.log("Your Team profile has been generated!"))
}

// call function to start application
addEmployee("Manager");
