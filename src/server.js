
const path = require("path");
const express = require("express");
const upload = require("express-fileupload")

const app = express();

const staticPath = path.join(__dirname, "../public");

//builtin middleware
app.use(express.static(staticPath))
app.use(upload())

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/index.html");
});

app.post("/", (req, res) => {
  if (req.files) {
    console.log(req.files);
    var file = req.files.file
    var filename = file.name
    console.log(filename)
    file.mv('./uploads/' + filename, function (err) {
      if (err) {
        res.send(err)
      }
      res.send("File uploaded")
    })
  }
})

app.listen(5000, function () {
  console.log("server started on port 5000");
});
