const Sequelize = require('sequelize');
const sequelize = new Sequelize('budgetdb', 'root', 'vj4cxex6', {
  host: 'localhost',
  dialect: 'mysql',

  pool: {
    max: 5000,
    min: 0,
    acquire: 30000,
    idle: 10000
  },
  // http://docs.sequelizejs.com/manual/tutorial/querying.html#operators
  operatorsAliases: false
});

const User = sequelize.define('userbase', {
    id: sequelize.INT,
    username: Sequelize.STRING,
    email: Sequelize.STRING
  }); 

  sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });