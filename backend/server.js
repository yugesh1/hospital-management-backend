const app = require("./app");
const connectDB = require("./config/database");
const dotenv = require("dotenv");
const whatsapp = require("./utils/whatsappFeature");

dotenv.config({ path: "backend/config/config.env" });

//
connectDB();

const server = app.listen(process.env.PORT, () => {
  console.log(`server running at port ${process.env.PORT}`);
});

process.on("uncaughtException", (err) => {
  console.log(`Error : ${err.message}`);
  console.log("Shutting down due to UnCaught Exception");
  process.exit(1);
});

process.on("unhandledRejection", (err) => {
  console.log(`Error :${err.message}`);
  console.log(`Shutting Down Server Due to unhandled rejection`);

  server.close(() => {
    process.exit(1);
  });
});
