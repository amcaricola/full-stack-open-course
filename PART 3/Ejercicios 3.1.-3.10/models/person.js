const mongoose = require('mongoose');

const PASSWORD = process.env.PASSWORD;

const url = `mongodb+srv://amcaricola_db_user:${PASSWORD}@cluster0.rdifoke.mongodb.net/phonebook?appName=Cluster0`;

mongoose.set('strictQuery', false);

console.log('connecting to', url);

mongoose
    .connect(url)
    .then(() => {
        console.log('connected to MongoDB');
    })
    .catch((error) => {
        console.log('error connecting to MongoDB:', error.message);
    });

const personSchema = new mongoose.Schema({
    name: String,
    number: String,
});

personSchema.set('toJSON', {
    transform: (document, item) => {
        item.id = item._id.toString();
        delete item._id;
        delete item.__v;
    },
});

module.exports = mongoose.model('person', personSchema);
