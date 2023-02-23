const config = require('config.json');
const mysql = require('mysql2/promise');
const { Sequelize } = require('sequelize');
const { DataTypes } = require('sequelize');

module.exports = db = {};

initialize();

async function initialize() {
    const { host, port, user, password, database } = config.database;
    const connection = await mysql.createConnection({ host, port, user, password });
    await connection.query(`CREATE DATABASE IF NOT EXISTS \`${database}\`;`);

    const sequelize = new Sequelize(database, user, password, { dialect: 'mysql' });

    db.User = require('../users/user.model')(sequelize);
    db.Product = require('../products/product.model')(sequelize);

    db.User.hasOne(db.Product, {
        foreignKey: {
            name: 'owner_user_id',
            //allowNull: false,
            type: DataTypes.INTEGER
        }
    });

    await sequelize.sync();
}