const data =  require("ttn").data;
const application =  require("ttn").application;
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  const appID = "intelligentirrigration";
  const accessKey = "ttn-account-v2.JSO6Y17HgEGg3n_3V8rApfJZGa3gkKyru7cozkhPa8o";
  data(appID, accessKey)
      .then(function (client) {
        client.on("uplink", function (devID, payload) {
          console.log("Received uplink from ", devID)
          console.log(payload)
        })
      })
      .catch(function (err) {
        console.error(err);
        process.exit(1)
      });

    // discover handler and open application manager client
    application(appID, accessKey)
      .then(function (client) {
        return client.get()
      })
      .then(function (app) {
        console.log("Got app", app)
      })
      .catch(function (err) {
        console.error(err);
        process.exit(1)
      });
    res.render('index', { title: 'Express' });
});

module.exports = router;
