const { Sequelize, DataTypes } = require("sequelize");

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    port: process.env.DB_PORT,
    host: process.env.DB_HOST,
    dialect: 'postgres',
        pool: {
        max: 5,
        idle: 30000,
        acquire: 60000,
    },
  }
);
console.log({
  database: process.env.DB_NAME,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  dialect: process.env.DB_DIALECT
});

try {
  sequelize.authenticate();
  console.log('Connection has been established successfully.');
} catch (error) {
  console.error('Unable to connect to the database:', error);
}

const db = {};
db.sequelize = sequelize;
db.Sequelize = Sequelize;
db.User = require("./user.model")(sequelize, DataTypes);


// db.sequelize.sync({ alter: true }); 

module.exports = db;