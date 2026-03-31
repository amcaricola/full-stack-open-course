const mongoose = require("mongoose");

if (process.argv.length < 3) {
  console.log("give password as argument");
  process.exit(1);
}

const password = process.argv[2];
const personName = process.argv[3];
const personNumber = process.argv[4];

if (personName && !personNumber) {
  console.log("To add person, number must be provided");
  process.exit(1);
}

const url = `mongodb+srv://amcaricola_db_user:${password}@cluster0.rdifoke.mongodb.net/phonebook?appName=Cluster0`;

mongoose.set("strictQuery", false);
mongoose.connect(url);

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
});

const Person = mongoose.model("person", personSchema);

if (personName && personNumber) {
  const new_person = new Person({
    name: personName,
    number: personNumber,
  });
  new_person.save().then(() => {
    console.log(`added ${personName} number ${personNumber} to phonebook`);
    mongoose.connection.close();
  });
  return;
}

Person.find({}).then((result) => {
  console.log("phonebook:");
  result.forEach((document) => {
    console.log(document.name, document.number);
  });
  mongoose.connection.close();
});
