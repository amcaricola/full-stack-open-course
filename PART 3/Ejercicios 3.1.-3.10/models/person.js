const mongoose = require('mongoose');

const url = process.env.MONGODB_URI;

mongoose.set('strictQuery', false);

mongoose
    .connect(url)
    .then(() => {
        console.log('connected to MongoDB');
    })
    .catch((error) => {
        console.log('error connecting to MongoDB:', error.message);
    });

const personSchema = new mongoose.Schema({
    name: {
        type: String,
        minlength: 3,
        required: true,
    },
    number: {
        type: String,
        minlength: 8,
        validate: {
            validator: function (v) {
                return /^\d{2,3}-\d+$/.test(v);
            },
            message: (props) => `${props.value} is not a valid phone number!`,
        },
        required: true,
    },
});

personSchema.set('toJSON', {
    transform: (document, item) => {
        item.id = item._id.toString();
        delete item._id;
        delete item.__v;
    },
});

module.exports = mongoose.model('person', personSchema);
