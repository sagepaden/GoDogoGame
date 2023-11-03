// Run this with Node JS.
// Try renaming this file to `index.js` and running `node index.js`
// You'll need to `npm install peer`


const { PeerServer } = require("peer");

const PORT = 9001;

const peerServer = PeerServer({
  port: PORT, key:"demodemo", path: "/myapp",
  allow_discovery: true,
});


peerServer.on("connection", c => {
  console.log("connection ID:", c.id)
})

peerServer.on("disconnect", c => {
  console.log("disconnect!", c.id)
})

console.log(`Running Peer JS Server on port ${PORT}.`)