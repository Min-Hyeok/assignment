const express = require('express');
const app = express();

app.use(express.static('dist'));

require('./src/router/hub.router.js')(app);

app.listen(3000, () => {
    console.log('http://localhost:3000');
});
