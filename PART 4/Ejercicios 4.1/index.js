const app = require('./app.js');
const { PORT } = require('./utils/cofig.js');

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT} - http://localhost:${PORT}`);
});
