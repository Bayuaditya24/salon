import { Sequelize } from "sequelize";
import db from "../config/Database.js";

const { DataTypes } = Sequelize;

const Detail = db.define(
  "detail",
  {
    perawatanPelanggan: DataTypes.STRING,
    hargaP: DataTypes.STRING,
    quantityP: DataTypes.STRING,
    totalHarga: DataTypes.STRING,
    grandtotal: DataTypes.STRING,
    idpenjualan: DataTypes.INTEGER,
  },
  {
    freezeTableName: true,
  }
);

export default Detail;

(async () => {
  await db.sync();
})();
