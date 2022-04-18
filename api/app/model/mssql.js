import "dotenv/config";
import sql from "mssql";

const config = {
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  server: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT, 10) || 1433,
  pool: {
    max: 10,
    min: 1,
    idleTimeoutMillis: 300000,
  },
  options: {
    enableArithAbort: true,
    requestTimeout: 3000000,
  },
  trustServerCertificate: true,
  encrypt: false
}

const pool = new sql.ConnectionPool(config)
  .connect()
  .then((poolConnect) => {
    console.log("Connected to MSSQL");
    return poolConnect;
  })
  .catch((err) => {
    console.log("Database Connection Failed!", err, config);
  });

export default  {
  pool
}