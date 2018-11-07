const port = 5000

const express = require('express');
const bodyParser = require('body-parser');
var positions = ['Водитель', 'Разработчик', 'Повар', 'Певец', 'Руководитель', 'Тестировщик', 'Уборщик',
'Работник цеха', 'Промоутер'];

var employees = [{
    id: 1,
    fullName: 'Звягенцева Юлия Андреевна',
    position: 'Повар',
    birthDate: new Date("06 Sept 1965"),
    status: 'работает',
    commentary: ''
},
{
    id: 2,
    fullName: 'Иванов Пётр Васильевич',
    position: 'Разработчик',
    birthDate: new Date("01 Feb 1999"),
    status: 'работает',
    commentary: ''
},
{
    id: 3,
    fullName: 'Иванова Софья Петровна',
    position: 'Уборщик',
    birthDate: new Date("02 Jan 1984"),
    status: 'уволен',
    commentary: ''
},
{
    id: 4,
    fullName: 'Невский Пётр Георгиевич',
    position: 'Промоутер',
    birthDate: new Date("29 Feb 2004"),
    status: 'уволен',
    commentary: ''
},
{
    id: 5,
    fullName: 'Созонов Иван Дмитриевич',
    position: 'Уборщик',
    birthDate: new Date("19 Apr 1972"),
    status: 'работает',
    commentary: 'любит леденцы'
},
{
    id: 6,
    fullName: 'Юдинцев Сергей Леонидович',
    position: 'Тестировщик',
    birthDate: new Date("09 Jan 1991"),
    status: 'работает',
    commentary: ''
},
{
    id: 7,
    fullName: 'Галушкин Семён Владиславович',
    position: 'Певец',
    birthDate: new Date("19 May 1974"),
    status: 'работает',
    commentary: 'тенор'
}
]

function findEmployeeKey(id) {
    for (key in employees) {
        if (employees[key].id === id) {
            return key;
        }
    }
    return -1;
}

function findEmployeeById(id) {
    for (key in employees) {
        if (employees[key].id === id) {
            return employees[key];
        }
    }
    return {};
}


const app  = express();

//for POST parsing
app.use(bodyParser.json());

//prevent CORS error in browser
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

app.route('/employees').get((req, res) => {
    console.log('received get "employees"'); 
    res.send(employees);
  });

app.route('/employees/:id').get((req, res) => {
    const requestedEmployee = +req.params['id'];
    console.log('received get "employees/' + requestedEmployee);
    var employee = findEmployeeById(requestedEmployee);
    if (employee == {}) {
        res.status(404).send(employee);
    } else {
        res.send(employee);
    }
});

app.route('/employees/:id').put((req, res) => {
    console.log("received put with id");
    let employeeKey = findEmployeeKey(+req.body.id);
    if (employeeKey == -1) {
        res.status(404).send();
    } else {
        employees[employeeKey].fullName = req.body.fullName;
        employees[employeeKey].position = req.body.position;
        employees[employeeKey].birthDate = req.body.birthDate;
        employees[employeeKey].status = req.body.status;
        employees[employeeKey].commentary = req.body.commentary;
        //employees[employeeKey].photo = req.body.photo;
        res.status(200).send(employees[employeeKey]);
    }
});
  
app.route('/positions').get((req, res) => {
    console.log('received get "positions"'); 
    res.send(positions);
});

app.route('/employees').post((req, res) => {
    console.log('received post for ' + req.body.fullName);
    lastId++;
    let employee = {id: lastId, fullName: req.body.fullName, position: req.body.position,
        birthDate: req.body.birthDate, status: req.body.status, commentary: req.body.commentary};
    employees.push(employee);
    res.status(201).send(employee);
});

app.route('/employees').put((req, res) => {
    console.log("received put for " + req.body.fullName);
    let employeeKey = findEmployeeKey(req.body.id);
    if (employeeKey == -1) {
        res.status(404).send();
    } else {
        employees[employeeKey].fullName = req.body.fullName;
        employees[employeeKey].position = req.body.position;
        employees[employeeKey].birthDate = req.body.birthDate;
        employees[employeeKey].status = req.body.status;
        employees[employeeKey].commentary = req.body.commentary;
        //employees[employeeKey].photo = req.body.photo;
        res.status(200).send(employees[employeeKey]);
    }
});


var lastId = employees[employees.length - 1].id;
console.log(`listening on port ${port}`);
app.listen(port, () => {
    console.log('Server started!');
  });
