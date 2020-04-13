const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

const teamArray = [];
// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

// async function init () {
//     try {
//         const {name, id, email, officeNumber, member} = await promptManager();
//         const managerMember = new Manager (name, id, email, officeNumber);
//         teamArray.push(managerMember);

//         if (member === "Engineer"){
//         const {name, id, email, github} = await promptEngineer();
//         const engineerMember = new Engineer (name, id, email, github);
//         teamArray.push(engineerMember);
//         }

//         else if (member === "Intern"){
//         const {name, id, email, school} = await promptIntern();
//         const internMember = new Intern (name, id, email, school);
//         teamArray.push(internMember)
//         }

//         // else {

//         // } 
        
//     }
//     catch (err) {
//         console.log(err);
//     }

// }

function promptManager() {
    return inquirer.prompt([
      {
        type: "input",
        name: "name",
        message: "What is your Manager's name?"
      },

      {
        type: "input",
        name: "email",
        message: "What is your email?"
      },

      {
        type: "input",
        name: "id",
        message: "What your id?"
      },

      {
        type: "input",
        name: "officeNumber",
        message: "What is your office number?"
       }
       //,

      // {
      //   type: "list",
      //   message: "Which type of team member would you like to add?",
      //   name: "member",
      //   choices: ["Engineer","Intern","I don't want to add any more members."]
      // }
    
    ]).then(answers => {
      const managerMember = new Manager(answers.name, answers.id, answers.officeNumber, answers.email)
     teamArray.push(managerMember)
     console.log('My new person', managerMember)

     console.log('CHECK THE ARRAY', teamArray)
     changeMembers()

     });
 
}

function changeMembers() {

  inquirer.prompt([
    {
      type: "list",
      name: "members",
      message: "Which type of team member would you like to add?",
      choices: [
        "Engineer",
        "Intern",
        "I don't want to add any more team members"
      ]
    }
  ]).then(select => {
    switch(select.members) {
    case "Engineer":
      promptEngineer();
      break;
    case "Intern":
      promptIntern();
      break;
    default:
      {
      //pass teamarray into generateHTML fx
      //this is data for manger
      //we need to write to html fs write file to "/output/team.html"
      fs.writeFile("output/team.html", render(teamArray), function(err) {

        if (err) {
          return console.log(err);
        }
      
        console.log("Success!");
      
      });
      console.log("you are done");
      }

    }
  });
}

  function promptEngineer() {
    return inquirer.prompt([
      {
        type: "input",
        name: "name",
        message: "What is your Engineer's name?"
      },

      {
        type: "input",
        name: "email",
        message: "What is your email?"
      },

      {
        type: "input",
        name: "id",
        message: "What your id?"
      },

      {
        type: "input",
        name: "github",
        message: "What is your github username?"
      }
      // ,

      // {
      //   type: "list",
      //   message: "Which type of team member would you like to add?",
      //   name: "member",
      //   choices: ["Engineer","Intern","I don't want to add any more members."]
      // },
    
    ]).then(answers => {
      const engineerMember = new Engineer(answers.name, answers.id, answers.github, answers.email)
     teamArray.push(engineerMember)
     console.log('My new person ENGINEER', engineerMember)

     console.log('CHECK THE ARRAY ENGINEER', teamArray)
    changeMembers()
     });

}

function promptIntern() {
    return inquirer.prompt([
      {
        type: "input",
        name: "name",
        message: "What is your Intern's name?"
      },

      {
        type: "input",
        name: "email",
        message: "What is your email?"
      },

      {
        type: "input",
        name: "id",
        message: "What your id?"
      },

      {
        type: "input",
        name: "school",
        message: "What school did you attend?"
      }
      // ,

      // {
      //   type: "list",
      //   message: "Which type of team member would you like to add?",
      //   name: "member",
      //   choices: ["Engineer","Intern","I don't want to add any more members."]
      // },
    
    ]).then(answers => {
      const internMember = new Intern(answers.name, answers.id, answers.email, answers.school)
     teamArray.push(internMember)
     console.log('My new person Intern', internMember)

     console.log('CHECK THE ARRAY INTERN', teamArray)
    changeMembers()
     });

}

    // .then(answers=>{
    //     const managerMember = new Manager (answers.name, answers.id, answer.officeNumber)
    //     teamArray.push(managerMember)
    //     const engineermemeber= new Engineer(answers.name, answers.id, answers.email,answers.github);
    //     teamArray.push(engineermemeber)
    //     if(answers.member=="Engineer"){
    //         promptEngineer();
    //     }
    // });

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

// init();
promptManager();
