require("dotenv").config();
const Sequelize = require("sequelize");

let sequelize = new Sequelize(
  process.env.DB_NAME as string,
  process.env.DB_USER as string,
  process.env.DB_PASSWORD as string,
  {
    host: "localhost",
    dialect: "mysql",
    port: 3306,
    logging: false,
  }
);

export default sequelize;
