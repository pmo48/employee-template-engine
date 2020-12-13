//required classes of employee types found in other files

const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");

//required node apps needed to run product

const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

//variables to define output location

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

//function that calls the file to render the html doc with inputs

const render = require("./lib/htmlRenderer");

//array to hold all team members that'll get pushed to the html page and array to hold IDs to ensure IDs aren't used twice

const teamMembers = [];
const idArray = [];

//Initiates questions

const promptUser = () =>
  inquirer.prompt([
    //Question using a picklist to see which employee to add
    {
        type: "list",
        name: "role",
        message:"What type of team member do you want to add?",
        choices: ["Manager","Engineer","Intern","I don't want to add any more team members"]
      }
      //If manager is selected, runs manager questions
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

            //validates ID is unique by checking against array
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
            //validates email entry
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
          //add new manager data into a variable that gets pushed to the team member array and ID array
        ]).then((answers)=>{
          const manager = new Manager(answers.name, answers.id, answers.email,answers.officeNumber);
          teamMembers.push(manager);
          idArray.push(answers.id);
          //re-runs prompt function to start at beginning
          promptUser();
        })
      }
    //If engineer is selected, runs enginer questions

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

          //validates ID is unique by checking against array
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
          
          //validates email entry
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
        //add new engineer data into a variable that gets pushed to the team member array and ID array
      ]).then((answers)=>{
        const engineer = new Engineer(answers.name, answers.id, answers.email,answers.github);
        teamMembers.push(engineer);
        idArray.push(answers.id);
        //re-runs prompt function to start at beginning
        promptUser();
      })
    }
  //If engineer is selected, runs enginer questions
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
        //validates ID is unique by checking against array
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
        //validates email entry
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
        //adds new intern data into a variable that gets pushed to the team member array and ID array
    ]).then((answers)=>{
        let intern = new Intern(answers.name, answers.id, answers.email,answers.school);
        teamMembers.push(intern);
        idArray.push(answers.id);
        //re-runs prompt function to start at beginning
        promptUser();
    })
    }
    //if "I dont..." is selected, it will end the process and write the output to the outputPath folder and pass the teamMembers array into the render function for build the page

    if (answer.role === "I don't want to add any more team members"){
        return fs.writeFileSync(outputPath,render(teamMembers));
    }
})

promptUser();