require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const morgan = require('morgan');
let Persons = require('./models/person');

morgan.token('post-content', (req) => {
    if (req.method === 'POST' || req.method === 'PUT') {
        return JSON.stringify(req.body);
    } else {
        return '';
    }
});

// middlewares ---------------------------------------------------------------
const errorHandler = (error, request, response, next) => {
    console.error(error.message);

    if (error.name === 'CastError') {
        return response.status(400).send({ error: 'Wrong id' });
    } else if (error.name === 'ValidationError') {
        return response.status(400).json({ error: error.message });
    }

    next(error);
};

app.use(express.static('dist'));
app.use(
    cors({
        origin: '*',
        optionsSuccessStatus: 200,
    }),
);
app.use(express.json());
app.use(
    morgan(
        ':method :url :status :res[content-length] - :response-time ms :post-content',
    ),
);

// GET FRONTEND ---------------------------------------------------------------
app.get('/', (request, response) => {
    response.sendFile('dist/index.html');
});

// GET INFO  ------------------------------------------------------------------

app.get('/info', (request, response) => {
    Persons.find({}).then((result) => {
        const _res =
            '<p>Phonebook has info for ' +
            result.length +
            ' people</p><p>' +
            new Date() +
            '</p>';

        response.send(_res);
    });
});

// API -------------------------------------------------------------------------
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

app.post('/api/persons', (request, response, next) => {
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

            newPerson
                .save()
                .then((person) => {
                    response.json(person);
                })
                .catch((error) => next(error));
        }
    });
});

app.put('/api/persons/:id', (request, response, next) => {
    const id = request.params.id;
    const person = {
        name: request.body.name,
        number: request.body.number,
    };
    const validator = { new: true, runValidators: true, context: 'query' };
    Persons.findByIdAndUpdate(id, person, validator)
        .then((result) => {
            if (!result) {
                return response.status(404).json({
                    error: 'id not found',
                });
            }
            return response.status(200).json(person);
        })
        .catch((error) => next(error));
});

app.delete('/api/persons/:id', (request, response, next) => {
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

// ERROR MIDDLEWARE ---------------------------------------------------------------
app.use(errorHandler);

// SERVER -------------------------------------------------------------------------
const port = process.env.PORT;
app.listen(port, () => {
    console.log(`Server running on port ${port} - http://localhost:${port}/`);
    console.log(`API : http://localhost:${port}/api/persons`);
});
