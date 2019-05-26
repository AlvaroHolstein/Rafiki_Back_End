const app = require("./server");
const port = process.env.PORT || 80;
const porthttps = process.env.PORTHTTPS || 81;
const http = require("http");
const https = require("https");
const { conn } = require("./mongo_connect");
const { User, userSchema } = require("./app/models/users.model");
const request = require("request");
// const options = {}, serve se tivermos uma ligação (https)

const ports = ["192.168.1.83", "172.23.116.246", "127.0.0.1", "192.168.1.74"];
function getAdress() {
  for (let i = 0; i < ports.length; i++) {
    console.log(ports[i]);
    request(`http://${ports[i]}`, (err, response, body) => {
      if (err) {
        // if (err.errno == "ETIMEDOUT") {
        //   console.log("Ficou no " + ports[i])
        //   return ports[i]
        // }
        // console.log(err, 'err')
      }
      if (response) console.log(response, "response");
      if (body) console.log(body, "body");
    });
  }
}
// const serverHttps = https.createServer(options, app)

const serverHttp = http.createServer(app);
serverHttp.listen(port, getAdress(), () => {
  console.log(`Server http running on port :${port}`);
});

// serverHttps.listen()

/**
 * ALALALALALALALALALALALA.....
 * Só corram isto uma vez, se não grava as mesmas coisas
 * mais que uma vez.
 */
// async function a() {
//     for (let us of arr) {

//         let doc = userSchema
//         for (let key in us) { // Andar pelos campos do array
//             if (key != "skill" && key != "level" && key != "badges") {

//                 if (key == "rank") doc[key] = us[key][0]
//                 else if (key == "foto") {
//                     let k = "picture"
//                     doc[k] = us[key]
//                 }
//                 else if (key == "desc") {
//                     let k = "description"
//                     doc[k] = us[key]
//                 }
//                 else if (key == "exp") {
//                     let k = "experience"
//                     doc[k] = us[key]
//                 }
//                 else if (key == "upvotes") {
//                     doc[key] = 0
//                 }
//                 else {
//                     doc[key] = us[key]
//                 }

//             }
//         }
//         console.log(doc)
//         let row = new User(doc)
//         await row.save()
//     }
// }
// a()

/**
 * Undefined é igual a vazio
 * rank[0]
 * experience
 * description
 * picture
 * Not's
 *  level
 *  badges
 *  skill
 */
