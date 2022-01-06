const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");

const app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.get("/", function(req, res) {
     res.sendFile(__dirname + "/signup.html");
});

app.post("/", function(req, res) {
     const firstName = req.body.firstName;
     const lastName = req.body.lastName;
     const email = req.body.email;
     const data = {
          members: [
               {
                    email_address: email,
                    status: "subscribed",
                    merge_fields: {
                         FNAME: firstName,
                         LNAME: lastName,
                    }
               }
          ]
     };
     const jsonData = JSON.stringify(data);
     const url = "https://us5.api.mailchimp.com/3.0/lists/4803105c80";
     const options = {
          method: "POST",
          auth: "Lythmass:92691999b83a83e87eeac10dbf5f9c41-us5",
     };
     const request = https.request(url, options, function(response) {
          if(response.statusCode === 200) {
               res.sendFile(__dirname + "/success.html");
          } else {
               res.sendFile(__dirname + "/failure.html");
          }
     });
     request.write(jsonData);
     request.end();
});

app.post("/failure", function(req, res) {
     res.redirect("/");
});

app.listen(process.env.PORT || 3000, function() {
     console.log("The server is runnig on port 3000.");
});

//Mailchimp API Key 92691999b83a83e87eeac10dbf5f9c41-us5
//Mailchimp Audience ID 4803105c80
