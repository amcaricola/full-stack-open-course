require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const morgan = require('morgan');
let Persons = require('./models/person');

// // MATH RANDOM 3.5
// const generateId = () => {
//     return Math.floor(Math.random() * 100000000);
// };

morgan.token('post-content', (req) => {
    if (req.method === 'POST') {
        return JSON.stringify(req.body);
    } else {
        return '';
    }
});

const corsOptions = {
    origin: '*',
    optionsSuccessStatus: 200,
};

const errorHandler = (error, request, response, next) => {
    console.error(error.message);

    if (error.name === 'CastError') {
        return response.status(400).send({ error: 'malformatted id' });
    }

    next(error);
};

app.use(express.static('dist'));
app.use(cors(corsOptions));
app.use(express.json());
app.use(
    morgan(
        ':method :url :status :res[content-length] - :response-time ms :post-content',
    ),
);

app.get('/', (request, response) => {
    response.sendFile('dist/index.html');
});

// app.get('/info', (request, response) => {
//     persons.find({}).then((result) => {
//         console.log(result.length);
//         const _res =
//             '<p>Phonebook has info for ' +
//             result.length +
//             ' people</p><p>' +
//             new Date() +
//             '</p>';

//         response.send(_res);
//     });
// });

app.get('/api/persons', (request, response) => {
    Persons.find({}).then((result) => {
        // console.log(result);
        response.json(result);
    });
});

app.get('/api/persons/:id', (request, response, next) => {
    const id = request.params.id;
    Persons.findById(id)
        .then((result) => {
            if (result) {
                response.status(200).json(result);
            } else {
                response.status(404).end();
            }
        })
        .catch((error) => next(error));
});

app.post('/api/persons', (request, response) => {
    const bodyContent = request.body;

    if (!bodyContent.name || !bodyContent.number) {
        return response.status(400).json({
            error: 'content missing',
        });
    }

    Persons.find({ name: bodyContent.name }).then((result) => {
        if (result.length > 0) {
            return response.status(400).json({
                error: 'name must be unique',
            });
        } else {
            const newPerson = new Persons({
                name: bodyContent.name,
                number: bodyContent.number,
            });

            newPerson.save().then((person) => {
                response.json(person);
            });
        }
    });
});

app.delete('/api/persons/:id', (request, response) => {
    const id = request.params.id;

    Persons.findByIdAndDelete(id)
        .then((result) => {
            if (!result) {
                return response.status(404).json({
                    error: 'id not found',
                });
            }
            response.status(204).end();
        })
        .catch((error) => next(error));
});

app.use(errorHandler);

const port = process.env.PORT;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
    console.log(`http://localhost:${port}/`);
    console.log(`http://localhost:${port}/info`);
    console.log(`http://localhost:${port}/api/persons`);
});

// 69cc8fcb3652300f308ef0db
