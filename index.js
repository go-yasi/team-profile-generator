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
    console.log("Enter " + type + " info");
    inquirer
    .prompt([
        {
            type: "input",
            name: "name",
            message: "What is the employee's name?"
        },
        {
            type: "input",
            name: "id",
            message: "What is the employee's ID?"
        },
        {
            type: "input",
            name: "email",
            message: "What is the employee's email address?"
        }
    ])
    .then((employeeResponse) => {
        if(type === "manager") {
            addManager(employeeResponse);
        } else if(type === "engineer") {
            addEngineer(employeeResponse);
        } else if(type === "intern") {
            addIntern(employeeResponse);
        }
    });
};


// function to prompt questions about Manager and add to array
function addManager(employeeResponse) {
    inquirer
    .prompt([
        {
            type: "input",
            name: "office",
            message: "What is the team manager's office number?"
        }
    ])
    .then((answers) => {
        // grab employee info
        const name = employeeResponse.name;
        const id = employeeResponse.id;
        const email = employeeResponse.email;
        // grab manager info
        const office = answers.office;

        // const manager = new Manager(answers.name, answers.id, answers.email, answers.office);
        
        // create new manager
        const manager = new Manager(name, id, email, office)
        // add manager to team
        teamProfile.push(manager);

        // generate strating HTML with manager info
        // fs.writeFile("new.html", manager, (err) =>
        // err ? console.log(err) : console.log("Congratulations! You've started creating your team profile!")
        // );

        // run function to add next employee
        addEmployee();
    });
};





// call function to start application
addEmployee();



// // function with template literal to add initial html with manager info
// function startHTML() {
// `
// <!DOCTYPE html>
// <html lang="en">
// <head>
//     <meta charset="UTF-8">
//     <meta http-equiv="X-UA-Compatible" content="IE=edge">
//     <meta name="viewport" content="width=device-width, initial-scale=1.0">
//     <link rel="stylesheet" href="./style.css">
//     <title>Team Profile</title>
// </head>
// <body>
//     <header>
//         <h1>My Team</h1>
//     </header>

//     <main id="info-blocks">
//         <div class="row">
//             <div class="card">
//                 <div class="card-head">
//                     <h3 class="name">${manager.getName()}</h3>
//                     <h4 class="role">${manager.getRole()}</h4>
//                 </div>
//                 <div class="card-info">
//                     <p class="id">ID: ${manager.getId()}</p>
//                     <a class="email">Email:  ${manager.getEmail()}</a>
//                     <p class="office">Office: ${manager.getOffice()}</p>
//                 </div>
//             </div>
// `
// }

// // function to end html 
// function closeHTML() {
//     const html = 
//     `        </div>
//     </main>
// </body>
// </html>`;

//     fs.appendFile("new.html", html, (err) => 
//     err ? console.log(err) : console.log("Your Team profile has been generated!")
//     );
// }



// // function to continue adding team members
// const nextMember = () => {
//     return inquirer
//         .prompt([
//             {
//                 type: "list",
//                 message: "Let's finish building your team! Which type of employee would you like to add next?",
//                 choices: ["Engineer", "Intern", "I'm finished building my team."],
//                 name: "employee"
//             }
//         ])
//         .then((answers) => {
//             if (answers.employee === "Engineer") {
//                 // function to ask Engineer-specific questions
//                 addEngineer();
//             } else if 
//             (answers.employee === "Intern") {
//                 // function to ask Intern-specific questions
//                 addIntern();
//             } else {
//                 // need function to append closing HTML
//                 closeHTML();
//             }
//         })
// }

// // function to add an engineer
// const addEngineer = () => {
//     return inquirer
//         .prompt([
//             {
//                 type: "input",
//                 message: "What is the engineer's name?",
//                 name: "name"
//             },
//             {
//                 type: "input",
//                 message: "What is the engineer's employee ID?",
//                 name: "id"
//             },
//             {
//                 type: "input",
//                 message: "What is the engineer's email address?",
//                 name: "email"
//             },
//             {
//                 type: "input",
//                 message: "What is the engineer's GitHub username?",
//                 name:"github"
//             }
//         ])
//         .then((answers) => {
//             // grab user inputs fo new engineer
//             const engineer = new Engineer(answers.name, answers.id, answers.email, answers.github);
//             // add to team
//             teamProfile.push(engineer);
//             // go back to the menu
//             nextMember();
//         })
// }

// // function to add an intern
// const addIntern = () => {
//     return inquirer
//         .prompt([
//             {
//                 type: "input",
//                 message: "What is the intern's name?",
//                 name: "name"
//             },
//             {
//                 type: "input",
//                 message: "What is the intern's employee ID?",
//                 name: "id"
//             },
//             {
//                 type: "input",
//                 message: "What is the intern's email address?",
//                 name: "email"
//             },
//             {
//                 type: "input",
//                 message: "What school does the intern attend?",
//                 name: "school"
//             }
//         ])
//         .then((answers) => {
//             // grab user inputs for new intern
//             const intern = new Intern(answers.name, answers.id, answers.email, answers.school);
//             // add new intern to team
//             teamProfile.push(intern);
//             // go back to the menu
//             nextMember();
//         })
// }



// // call ask manager to start the application
// addManager();
