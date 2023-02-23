const app = require('./app');

const port = process.env.NODE_ENV === 'production' ? (process.env.PORT || 80) : 1700;
app.listen(port, () => console.log('Server listening on port ' + port));

module.exports = app;