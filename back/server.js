const app = require("./app.js");
const dotenv = require("dotenv");
const { sql, testConnection } = require("./dbConnection");

//load env variables
dotenv.config();
const port = process.env.PORT;


(async () => {
  try {
    //1 test database connection
    await testConnection();

    //2 server start
    app.listen(port, () => {
      console.log(`App running on port ${port}`);
    });
  } catch (error) {
    process.exit(1); //terminate the running application if the database cennection fails. 1 means error
  }

  process.on('SIGINT', async () => {
    console.log("Closing database connection ...")
    await sql.end(); //closes all connections
    process.exit(0);
  })
})();
