const app = require('./server');

//app.listen(process.env.PORT);


const port = process.env.NODE_ENV === 'production' ? (process.env.PORT || 80) : 3000;
app.listen(port, () => console.log('Server listening on port ' + port));

module.exports = app;
