const Joi = require('joi');
const express = require('express');
const app = express();
app.use(express.json());

const courses = [
    { id: 1, name: 'course1' },
    { id: 2, name: 'course2' },
    { id: 3, name: 'course3' }
];

app.get('/', (req, res) => {
    res.send('Hello World');
});
app.get('/api/courses', (req, res) => {
    res.send(courses);
});
// app.get('/api/courses/:id', (req, res) => {
//     res.send(req.params.id);
// });

// app.post('/api/courses', (req, res) => {
//     const course = {
//         id: courses.length + 1,
//         name: req.body.name // use json()
//     };
//     courses.push(course);
//     res.send(course);
// });
// app.post('/api/courses', (req, res) => {
//     if (!req.body.name || req.body.name.length < 3) {
//         res.status(400).send('3');
//         return;
//     }
//     const course = {
//         id: courses.length + 1,
//         name: req.body.name // use json()
//     };
//     courses.push(course);
//     res.send(course);
// });
app.post('/api/courses', (req, res) => {
    const { error } = validateCourse(req.body); //reult.error

    if (error) {
        res.status(400).send(error.details[0].message);
        return;
    }
    const course = {
        id: courses.length + 1,
        name: req.body.name // use json()
    };
    courses.push(course);
    res.send(course);
});

app.put('/api/courses/:id', (req, res) => {
    const course = courses.find((c) => c.id === parseInt(req.params.id));
    if (!course) {
        res.status(404).send('没有找到');
    }

    const { error } = validateCourse(req.body); //reult.error

    if (error) {
        res.status(400).send(error.details[0].message);
        return;
    }

    course.name = req.body.name;
    res.send(course);
});

function validateCourse(course) {
    const schema = {
        name: Joi.string().min(3).required() // Joi v14.3.1
    };

    return Joi.validate(course, schema);
}

app.get('/api/courses/:id', (req, res) => {
    const course = courses.find((c) => c.id === parseInt(req.params.id));
    if (!course) {
        res.status(404).send('没有找到');
    }
    res.send(course);
});

app.delete('/api/courses/:id', (req, res) => {
    const course = courses.find((c) => c.id === parseInt(req.params.id));
    if (!course) {
        res.status(404).send('没有找到');
    }
    const index = courses.indexOf(course);
    courses.splice(index, 1);
    res.send(course);
    // Look up the course
    // Not existing, return 404

    // Delete

    //Retrun the same course
});

// app.get('/api/posts/:year/:month',(req,res) => {
//     res.send(req.params) //URL后面
// })

// http://localhost:3222/api/posts/2021/1?sortBy=name
app.get('/api/posts/:years/:months', (req, res) => {
    res.send(req.query); //获取？号后面的json
});

const port = 3222;
app.listen(port, () => {
    console.log(`port ${port}`);
});
