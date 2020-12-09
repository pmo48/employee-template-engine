const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

const teamMembers = [];

// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

const promptUser = () =>
  inquirer.prompt([
    {
        type: "list",
        name: "role",
        message:"What type of team member do you want to add?",
        choices: ["Manager","Engineer","Intern","I don't want to add any more team members"]
      }
  ]).then((answer)=> {
    if (answer.role === "Manager"){
        return inquirer.prompt([
          {
            type: "input",
            name: "name",
            message: `What is your Manager's name?`
          },
          {
            type: "input",
            name: "id",
            message: `What is your Manager's ID?`
          },
          {
            type: "input",
            name: "email",
            message: `What is your Manager's email?`
          },
          {
            type: "input",
            name: "officeNumber",
            message: `What is your Manager's office location?`
          }
        ]).then((answers)=>{
          const manager = new Manager(answers.name, answers.id, answers.email,answers.officeNumber);
          teamMembers.push(manager);
          console.log(teamMembers);
          promptUser();
        })
      }
    if (answer.role === "Engineer"){
      return inquirer.prompt([
        {
          type: "input",
          name: "name",
          message: `What is your engineer's name?`
        },
        {
          type: "input",
          name: "id",
          message: `What is your engineer's ID?`
        },
        {
          type: "input",
          name: "email",
          message: `What is your engineer's email?`
        },
        {
          type: "input",
          name: "github",
          message: `What is your engineer's GitHub??`
        }
      ]).then((answers)=>{
        const engineer = new Engineer(answers.name, answers.id, answers.email,answers.github);
        teamMembers.push(engineer);
        console.log(teamMembers);
        promptUser();
      })
    }
    if (answer.role === "Intern"){
        return inquirer.prompt([
        {
        type: "input",
        name: "name",
        message: `What is your Intern's name?`
        },
        {
        type: "input",
        name: "id",
        message: `What is your Intern's ID?`
        },
        {
        type: "input",
        name: "email",
        message: `What is your Intern's email?`
        },
        {
        type: "input",
        name: "school",
        message: `What is your Intern's school?`
        }
    ]).then((answers)=>{
        let intern = new Intern(answers.name, answers.id, answers.email,answers.school);
        teamMembers.push(intern);
        console.log(teamMembers);
        promptUser();
    })
    }
    if (answer.role === "I don't want to add any more team members"){
        return fs.writeFileSync(outputPath,render(teamMembers));
    }
})

promptUser();




  // promptUser().then((data) => writeFileAsync('test.html', generateHTML(data)))
  // .then(() => console.log('Successfully wrote to test.html'))
  // .catch((err) => console.error(err));


// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```
