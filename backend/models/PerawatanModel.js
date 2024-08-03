import { Sequelize } from "sequelize";
import db from "../config/Database.js";

const { DataTypes } = Sequelize;

const Perawatantb = db.define(
  "perawatan",
  {
    namaPerawatan: DataTypes.STRING,
    harga: DataTypes.STRING,
    idcategory: DataTypes.INTEGER,
  },
  {
    freezeTableName: true,
  }
);

export default Perawatantb;

(async () => {
  await db.sync();
})();
