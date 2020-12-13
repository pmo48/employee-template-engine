# Employee Template Engine ![license](https://img.shields.io/github/license/pmo48/employee-template-engine)
    
## Table of Contents

  - [Description](#description)
  - [Installation](#installation)
  - [Usage](#usage)
  - [License](#license)
  - [Contributing](#tests)
  - [Tests](#tests)
  - [Questions](#questions)
    
## Description
    
This CLI-based application asks a series of questions about employee information that then generates a webpage based on the employee information.  

![cli-screenshot](./assets/cli.png)
![webpage-screenshot](./assets/finalpage.png)
    
## Installation
    
This project is installed using node.js and invoked via the CLI. Jest and inquirer were both used for testing and asks questions, respectively. 
    
## Usage
    
Simply type "node app" in the project folder via the CLI and answer the questions appropriately. Once complete, navidate to the "output" folder for the finished html file. 
    
## License

[mit](https://choosealicense.com/licenses/mit/)
    
## Contributing
    
If you would like to contribute it, please utilize The [Contributor Covenant](https://www.contributor-covenant.org/) as a guideline.
    
## Tests
    
Navigate to the develop folder and type "npm run test" to kick-off the Jest test automation. These tests have all passed:

 PASS  test/Manager.test.js
  ✓ Can set office number via constructor argument (2ms)
  ✓ getRole() should return "Manager"
  ✓ Can get office number via getOffice() (1ms)

 PASS  test/Engineer.test.js
  ✓ Can set GitHUb account via constructor (1ms)
  ✓ getRole() should return "Engineer"
  ✓ Can get GitHub username via getGithub()

 PASS  test/Intern.test.js
  ✓ Can set school via constructor
  ✓ getRole() should return "Intern" (1ms)
  ✓ Can get school via getSchool()

 PASS  test/Employee.test.js
  ✓ Can instantiate Employee instance (1ms)
  ✓ Can set name via constructor arguments
  ✓ Can set id via constructor argument
  ✓ Can set email via constructor argument (1ms)
  ✓ Can get name via getName()
  ✓ Can get id via getId()
  ✓ Can get email via getEmail()
  ✓ getRole() should return "Employee"

## Questions
    
### What's your GitHub info?
    
My GitHub username is pmo48 and my profile can be found at github.com/pmo48
    
### What other contact info do you have?
    
I can be contacted via email at pmoriarty100@gmail.com if you have any additional questions.

### Where can I see a demo?

See a demo tutorial here - https://drive.google.com/file/d/1g6LnK2aVnNFFY0Ps_cxkPpqVgyeqmXwb/view
    