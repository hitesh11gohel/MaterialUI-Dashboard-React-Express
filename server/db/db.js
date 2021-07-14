const mongoose = require('mongoose');
const chalk = require('chalk');

mongoose.connect(" mongodb://127.0.0.1:27017/Argon", {
    useCreateIndex: true,
    useFindAndModify: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log(chalk.greenBright.inverse("Database Connected....."));
}).catch(() => {
    console.log(chalk.redBright.inverse("No Connection"));
});