import { Sequelize } from "sequelize";

const sequelize = new Sequelize('fastech', 'root', '', {
    dialect: "mysql",
    host: "localhost"
});

sequelize.authenticate()
    .then(() => console.log("Connected to Database"))
    .catch(err => console.log(err))

export default sequelize;