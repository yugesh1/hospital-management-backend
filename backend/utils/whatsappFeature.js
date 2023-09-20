const { Client, LegacySessionAuth, LocalAuth } = require("whatsapp-web.js");
const fs = require("fs");
const qrcode = require("qrcode-terminal");

const SESSION_FILE_PATH = "./session.json";

// Load the session data if it has been previously saved
let sessionData;
if (fs.existsSync(SESSION_FILE_PATH)) {
  sessionData = require(SESSION_FILE_PATH);
}

// const client = new Client({
//   authStrategy: new LegacySessionAuth({
//     session: sessionData,
//   }),
// });

const client = new Client({
  authStrategy: new LocalAuth(),
  puppeteer: {
    args: ["--no-sandbox"],
  },
});

// client.on("qr", (qr) => {
//   // console.log("QR RECEIVED", qr);
//   qrcode.generate(qr, { small: true });
// });

client.on("ready", () => {
  console.log("Client is ready!");

  client.getChats().then((chats) => {
    const getMyChats = chats.find((c1) => c1.name === "Daulat Singh (Dongri)");
    // client.sendMessage(
    //   getMyChats.id._serialized,
    //   "Hello I am Sahil .This is a automated message"
    // );
    // console.log(getMyChats);
  });
});

client.on("authenticated", (session) => {
  sessionData = session;

  // console.log(session);

  //   fs.writeFile(SESSION_FILE_PATH, `${session}`, (err) => {
  //     if (err) {
  //       console.error(err);
  //     }
  //   });
});

// client.initialize();
