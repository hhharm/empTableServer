const port = process.env.PORT || 5000;
const express = require('express');
const bodyParser = require('body-parser');
var path = require('path');
var fs = require('fs');
var busboy = require('connect-busboy');

var dir = path.join(__dirname, 'public');

var mime = {
    jpg: 'image/jpeg',
    jpeg: 'image/jpeg',
    png: 'image/png'
};

var positions = [ 'Физик', 'Режиссёр', 'Архитектор', 'Повар', 'Писатель','Генетик', 'Журналист', 'Дирижёр',
'Композитор', 'Телеведущий', 'Адвокат', 'Музыкант','Продюсер', 'Актёр', 'Модель'
].sort();

var employees = [{
        id: 1,
        fullName: 'Алексей Иванович Аджубей',
        position: 'Журналист',
        birthDate: new Date("9 Jan 1924"),
        status: 'уволен',
        commentary: ''
    },
    {
        id: 2,
        fullName: 'Френсис Селлерс Коллинз',
        position: 'Генетик',
        birthDate: new Date("14 Apr 1950"),
        status: 'работает',
        commentary: ''
    },
    {
        id: 3,
        fullName: 'Джоан Роулинг',
        position: 'Писатель',
        birthDate: new Date("31 Jul 1965"),
        status: 'работает',
        commentary: 'какая интересная дата рождения!'
    },
    {
        id: 4,
        fullName: 'Джеймс Тревор Оливер',
        position: 'Повар',
        birthDate: new Date("27 May 1975"),
        status: 'работает',
        commentary: ''
    },
    {
        id: 5,
        fullName: 'Заха Хадид',
        position: 'Архитектор',
        birthDate: new Date("31 Oct 1950"),
        status: 'уволен',
        commentary: 'британский архитектор арабского происхождения. В 2004 году стала первой в истории женщиной-архитектором, награждённой Притцкеровской премией.'
    },
    {
        id: 6,
        fullName: 'Константин Сергеевич Новосёлов',
        position: 'Физик',
        birthDate: new Date("23 Aug 1974"),
        status: 'работает',
        commentary: 'Нобелевский лауреат. "За новаторские эксперименты по исследованию двумерного материала графена"'
    },
    {
        id: 7,
        fullName: 'Светлана Александровна Алексиевич',
        position: 'Писатель',
        birthDate: new Date("31 May 1948"),
        status: 'работает',
        commentary: ''
    },
    {
        id: 8,
        fullName: 'Валерий Абисалович Гергиев',
        position: 'Дирижёр',
        birthDate: new Date("2 May 1953"),
        status: 'работает',
        commentary: 'Художественный руководитель Мариинского театра.'
    },
    {
        id: 9,
        fullName: 'Дмитрий Феликсович Черняков',
        position: 'Режиссёр',
        birthDate: new Date("11 May 1970"),
        status: 'работает',
        commentary: ''
    },
    {
        id: 10,
        fullName: 'Владимир Викторович Мухин',
        position: 'Повар',
        birthDate: new Date("15 Mar 1983"),
        status: 'работает',
        commentary: ''
    }, {
        id: 11,
        fullName: 'Владимир Владимирович Познер',
        position: 'Журналист',
        birthDate:  new Date('1 Apr 1934'),
        status: 'работает',
        commentary: ''
    }, {
        id: 12,
        fullName: 'Иван Андреевич Ургант',
        position: 'Телеведущий',
        birthDate:  new Date('16 Apr 1978'),
        status: 'работает',
        commentary: 'Российский актёр театра и кино, шоумен, теле- и радиоведущий, певец, музыкант, продюсер.'
    }, {
        id: 13,
        fullName: 'Екатерина Владимировна Чемберджи',
        position: 'Композитор',
        birthDate:  new Date('6 May 1960'),
        status: 'уволен',
        commentary: ''
    }, {
        id: 14,
        fullName: 'Семён Сергеевич Слепаков',
        position: 'Продюсер',
        birthDate:  new Date('23 Aug 1979'),
        status: 'работает',
        commentary: 'российский продюсер, сценарист, комедийный актёр, автор-исполнитель песен. В прошлом — капитан команды КВН «Сборная Пятигорска»'
    }, {
        id: 15,
        fullName: 'Сергей Викторович Бадамшин',
        position: 'Адвокат',
        birthDate:  new Date('4 Jul 1979'),
        status: 'работает',
        commentary: ''
    }, {
        id: 16,
        fullName: 'Сергей Владимирович Шнуров',
        position: 'Музыкант',
        birthDate:  new Date('13 Apr 1973'),
        status: 'уволен',
        commentary: ''
    } , {
        id: 17,
        fullName: 'Дмитрий Львович Быков',
        position: 'Писатель',
        birthDate:  new Date('20 Dec 1967'),
        status: 'работает',
        commentary: 'Русский писатель, поэт и публицист, литературный критик, радио- и телеведущий, журналист, преподаватель литературы, кинокритик. Известный политический деятель, яркий представитель оппозиции, частый участник политических дебатов'
    }, {
        id: 18,
        fullName: 'Борис Натанович Стругацкий',
        position: 'Писатель',
        birthDate:  new Date('15 Apr 1933'),
        status: 'уволен',
        commentary: '"Счастье для всех, даром, и пусть никто не уйдет обиженным!"'
    }, {
        id: 19,
        fullName: 'Татьяна Дмитриевна Ларина',
        position: 'Актёр',
        birthDate:  new Date('6 Jun 1999'),
        status: 'уволен',
        commentary: ''
    }, {
        id: 20,
        fullName: 'Настасья Филипповна Барашкова',
        position: 'Модель',
        birthDate:  new Date('11 Nov 1921'),
        status: 'уволен',
        commentary: ''
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

const app = express();

//parse file from post/put
app.use(busboy());

//prevent CORS error in browser
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "PUT, POST, GET");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

//for POST and PUT parsing
app.use(express.urlencoded({
    extended: true
}));
app.use(express.json());

app.route('/employees').get((req, res) => {
    //  console.log('received get "employees"');
    res.send(employees);
});

app.route('/employees/:id').get((req, res) => {
    const requestedEmployee = +req.params['id'];
    // console.log('received get "employees/' + requestedEmployee);
    var employee = findEmployeeById(requestedEmployee);
    if (employee == {}) {
        res.status(404).send(employee);
    } else {
        res.send(employee);
    }
});

app.route('/employees/images/:id').get((req, res) => {
    let ifFileExists = true;
    const requestedEmployee = req.params['id'];
    var file = path.join(dir, requestedEmployee);
    if (fs.existsSync(file + '.jpg')) {
        file += '.jpg'
    } else if (fs.existsSync(file + '.jpeg')) {
        file += '.jpeg'
    } else if (fs.existsSync(file + '.png')) {
        file += '.png'
    } else {
        var file = path.join(dir, 'nophoto.png');
    }
    // console.log("sending file " + file);
    var type = mime[path.extname(file).slice(1)];
    res.set('Content-Type', type);
    res.sendFile(file);
});

app.route('/employees/:id').put((req, res) => {
    let employeeKey = findEmployeeKey(+req.body.id);
    // console.log("received put with id (key=" + employeeKey);
    if (employeeKey == -1) {
        res.status(404).send();
    } else {
        employees[employeeKey].fullName = req.body.fullName;
        employees[employeeKey].position = req.body.position;
        employees[employeeKey].birthDate = req.body.birthDate;
        employees[employeeKey].status = req.body.status;
        employees[employeeKey].commentary = req.body.commentary;
        res.status(200).send(employees[employeeKey]);
    }
});

app.route('/positions').get((req, res) => {
    // console.log('received get "positions"');
    res.send(positions);
});

app.route('/employees').post((req, res) => {
    // console.log('received post for ' + req.body.fullName);
    lastId++;
    let employee = {
        id: lastId,
        fullName: req.body.fullName,
        position: req.body.position,
        birthDate: req.body.birthDate,
        status: req.body.status,
        commentary: req.body.commentary
    };
    employees.push(employee);
    res.status(201).send(employee);
});

app.route('/employees').put((req, res) => {
    // console.log("received put for " + req.body.fullName);
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

app.route('/employees/images/:id').post((req, res) => {
    var fstream;
    req.pipe(req.busboy);
    req.busboy.on('file', function (fieldname, file, filename) {
        let fextention = filename.split('.').pop();
        let fullname = dir + '\\' + req.params['id'] + '.' + fextention;
        fstream = fs.createWriteStream(fullname);
        file.pipe(fstream);
        fstream.on('close', function () {
            res.status(200).end();
        });
    });
});

var lastId = employees[employees.length - 1].id;
console.log(`listening on port ${port}`);
app.listen(port, () => {
    console.log('Server started!');
});
