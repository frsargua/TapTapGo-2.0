import { Sequelize } from "sequelize";

const sequelize = new Sequelize("database", "username", "password", {
  host: "host",
  dialect: "mysql",
  define: {
    timestamps: false,
  },
});

export default sequelize;
