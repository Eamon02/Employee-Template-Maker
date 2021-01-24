const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");
const Choice = require("inquirer/lib/objects/choice");
const { inherits } = require("util");
const { exit } = require("process");

const ENGINEER = "ENGINEER", intern = "Intern", manager = "Manager";

const employees = []

// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

async function init() {
    try {

        let answer = await inquirer.prompt([
            {
                type: 'input',
                name: 'name',
                message: 'Enter Employee name',
            },
            {
                type: 'number',
                name: 'id',
                message: 'Enter Employee id',
            },
            {
                type: 'input',
                name: 'email',
                message: 'Enter Employee email',
            },
            {
                type: 'list',
                name: 'role',
                message: 'Enter Employee role',
                choices: ['ENGINEER', 'Intern', 'Manager']
            }]);

        //Switch Based on Role Selection Function
        switch (answer.role) {

            case ENGINEER:
                {
                    try {
                        let answer2 = await inquirer.prompt([
                            {
                                type: 'input',
                                name: 'github',
                                message: 'Enter Engineer Github',
                            }

                        ]);

                        employees.push(new Engineer(answer.name, answer.id, answer.email, answer2.github))

                        break;

                    } catch (error) {
                        throw error;
                    }

                };
            case intern:
                {
                    try {
                        let answer2 = await inquirer.prompt([
                            {
                                type: 'input',
                                name: 'school',
                                message: 'Enter Intern School Name',
                            }

                        ]);

                        employees.push(new Intern(answer.name, answer.id, answer.email, answer2.school))

                        break;

                    } catch (error) {
                        throw error;
                    }

                };
            case manager:
                {
                    console.log("create engineer");
                    try {
                        let answer2 = await inquirer.prompt([
                            {
                                type: 'input',
                                name: 'officeNumber',
                                message: 'Enter Manager Office Number',
                            }
                        ]);

                        employees.push(new Manager(answer.name, answer.id, answer.email, answer2.officeNumber))

                        break;

                    } catch (error) {
                        throw error;
                    }

                };
        }

        //Repeat Function
        try {
            let repeat = await inquirer.prompt(
                {
                    type: 'confirm',
                    name: 'addAnother',
                    message: 'Add Another Employee',
                }
            );

            if (repeat.addAnother === true) {
                console.log('go again')
                return init()
            } else {
                renderOut()
            }

        } catch (error) {
            throw error;
        }

        console.log(employees)
    } catch (error) {
        throw error;
    }
};

//Render function
function renderOut() {
    if (fs.existsSync(outputPath)) {
        fs.writeFile(outputPath, render(employees), (err) => {
            if (err) throw err
            console.log('success')
        })
    } else {
        fs.mkdir('output', (err) => {
            fs.writeFile(outputPath, render(employees), (err) => {
                if (err) throw err
                console.log('success')
            })
        }
        )
    }
}


init()

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