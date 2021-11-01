const app = require('./app');
const config = require('./Config/index');

app.listen(config.port, () => {
    console.log(`Server started`);
});