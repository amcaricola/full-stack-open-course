const express = require("express");
let persons = require("./persons.json");
const app = express();

// MATH RANDOM 3.5
const generateId = () => {
  return Math.floor(Math.random() * 100000000);
};

app.use(express.json());

app.get("/info", (request, response) => {
  const _res =
    "<p>Phonebook has info for " +
    persons.length +
    " people</p><p>" +
    new Date() +
    "</p>";
  response.send(_res);
});

app.get("/api/persons", (request, response) => {
  response.json(persons);
});

app.get("/api/persons/:id", (request, response) => {
  const id = Number(request.params.id);
  const person = persons.find((person) => person.id === id);
  if (person) {
    response.json(person);
  } else {
    response.status(404).json({ error: "id not found" });
  }
});

app.post("/api/persons", (request, response) => {
  const bodyContent = request.body;

  if (!bodyContent.name || !bodyContent.number) {
    return response.status(400).json({
      error: "content missing",
    });
  }

  if (persons.find((person) => person.name === bodyContent.name)) {
    return response.status(400).json({
      error: "name must be unique",
    });
  }

  const newPerson = {
    id: generateId(),
    name: bodyContent.name,
    number: bodyContent.number,
  };

  persons = persons.concat(newPerson);

  response.json(newPerson);
});

app.delete("/api/persons/:id", (request, response) => {
  const id = Number(request.params.id);
  const person = persons.find((person) => person.id === id);
  if (!person) {
    return response.status(404).json({
      error: "id not found",
    });
  }
  persons = persons.filter((person) => person.id !== id);
  response.status(204).end();
});

const port = 3001;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
  console.log(`http://localhost:${port}/info`);
  console.log(`http://localhost:${port}/api/persons`);
});
