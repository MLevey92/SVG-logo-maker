const inquirer = require('inquirer');
const fs = require('fs');
const {Square, Triangle, Circle} = require('./lib/shapes.js');

const generateSVG = ( {text, textColor, shape} ) =>
`
<svg version="1.1"
     width="300" height="200"
     xmlns="http://www.w3.org/2000/svg">

  <rect width="100%" height="100%" fill="white" />

  ${shape}

  <text x="150" y="125" font-size="60" text-anchor="middle" fill="${textColor}">${text}</text>

</svg>
`

inquirer
    .prompt([
        {
            type: 'input',
            message: 'Logo text (maximum 3 characters): ',
            name: 'text',
        },
        {
            type: 'input',
            message: 'Text color (keyword or hex): ',
            name: 'textColor',
        },
        {
            type: 'list',
            message: 'Shape',
            name: 'shape',
            choices: ['Circle', 'Triangle', 'Square'],
        },
        {
            type: 'input',
            message: 'Shape color (keyword or hex): ',
            name: 'shapeColor',
        }
    ])
    .then((answers) => {
        const ans = answers.shape;
        let shape;
        switch(ans) {
            case 'Triangle':
                shape = new Triangle();
                break;
            case 'Square':
                shape = new Square();
                break;
            case 'Circle':
                shape = new Circle();
                break;
        }
        shape.setColor(answers.shapeColor);

        const svgTemp = {
            text: answers.text,
            textColor: answers.textColor,
            shape: shape.render()
        }
        
        const svg = generateSVG(svgTemp);
        
        
        fs.writeFile('./examples/logo.svg', svg, (err) =>
            err ? console.log(err) : console.log('logo created!')
        );
        
    });