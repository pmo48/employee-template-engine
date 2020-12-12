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
const idArray = [];

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
            message: `What is your Manager's ID?`,
            validate: answer => {
              if(idArray.indexOf(answer) !== -1) {
                return "ID in use, please pick another";
              }
              return true;
            }
          },
          {
            type: "input",
            name: "email",
            message: `What is your Manager's email?`,
            validate: answer => {
              const pass = answer.match(
                /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
              );
              if (pass) {
                return true;
              }
              return "Please enter a valid email address.";
            }
          },
          {
            type: "input",
            name: "officeNumber",
            message: `What is your Manager's office number?`,
          }
        ]).then((answers)=>{
          const manager = new Manager(answers.name, answers.id, answers.email,answers.officeNumber);
          teamMembers.push(manager);
          idArray.push(answers.id);
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
          message: `What is your engineer's ID?`,
          validate: answer => {
            if(idArray.indexOf(answer) !== -1) {
              return "ID in use, please pick another";
            }
            return true;
          }
        },
        {
          type: "input",
          name: "email",
          message: `What is your engineer's email?`,
          validate: answer => {
            const pass = answer.match(
              /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            );
            if (pass) {
              return true;
            }
            return "Please enter a valid email address.";
          }
        },
        {
          type: "input",
          name: "github",
          message: `What is your engineer's GitHub username?`
        }
      ]).then((answers)=>{
        const engineer = new Engineer(answers.name, answers.id, answers.email,answers.github);
        teamMembers.push(engineer);
        idArray.push(answers.id);
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
        message: `What is your Intern's ID?`,
        validate: answer => {
          if(idArray.indexOf(answer) !== -1) {
            return "ID in use, please pick another";
          }
          return true;
        }
        },
        {
        type: "input",
        name: "email",
        message: `What is your Intern's email?`,
        validate: answer => {
          const pass = answer.match(
            /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          );
          if (pass) {
            return true;
          }
          return "Please enter a valid email address.";
          }
        },
        {
        type: "input",
        name: "school",
        message: `What is your Intern's school?`
        }
    ]).then((answers)=>{
        let intern = new Intern(answers.name, answers.id, answers.email,answers.school);
        teamMembers.push(intern);
        idArray.push(answers.id);
        promptUser();
    })
    }
    if (answer.role === "I don't want to add any more team members"){
        return fs.writeFileSync(outputPath,render(teamMembers));
    }
})

promptUser();