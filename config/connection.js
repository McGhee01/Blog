const Sequelize = require('sequelize');
require('dotenv').config();
let sequelize;
if (process.env.JAWSB_URL) {
    sequelize = new Sequelize(process.env.JAWSB_URL);
}
   else {
        sequelize = new Sequelize (process.env.DB_NAME, process.env.DB_USER, process.env.DB_PW, {
            host:'localhost',
            dialect: 'mysql',
            port: 3306
        });
        }


model.eports = sequelize