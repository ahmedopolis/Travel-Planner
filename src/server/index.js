const app = require("./app");

// Setup server
const port = process.env.Server_Port || 8000;
const hostName = "localhost";
const localServer = http.createServer(app);

// Spin up the server
localServer.listen(port, listening);

// Callback to debug
function listening() {
  console.log(`Server is running on http://${hostName}: ${port}`);
}
