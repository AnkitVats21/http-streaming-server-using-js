const express = require("express");
const app = express();
const fs = require("fs");
var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();
var urlencodedParser = bodyParser.urlencoded({ extended: false })


app.get("/", function (req, res) {
  res.sendFile(__dirname + "/index.html");
});

app.get("/js", function (req, res) {
  res.sendFile(__dirname + "/client.js");
});

app.get("/video/:videoId", function (req, res) {
  var index=req.params.videoId;
  // Ensure there is a range given for the video
  const range = req.headers.range;
  if (!range) {
    res.status(400).send("Requires Range header");
  }

  // get video stats (about 61MB)
  const basePath="C:\\Users\\Ankit\\Videos\\Marvel's Agent Carter Season 01 Complete 720p HDTV DD5.1 x264-QTL\\Marvel's.Agent.Carter.S01E0"
  var videoList=[]
  for(var i=1;i<9;i++){
    videoList.push(basePath+i+".720p.HDTV.DD5.1.x264-QTL.mp4")
  }

  var videoPath=videoList[index-1];
  const videoSize = fs.statSync(videoPath).size;

  // Parse Range
  // Example: "bytes=32324-"
  const CHUNK_SIZE = 10 ** 6; // 1MB
  const start = Number(range.replace(/\D/g, ""));
  const end = Math.min(start + CHUNK_SIZE, videoSize - 1);

  // Create headers
  const contentLength = end - start + 1;
  const headers = {
    "Content-Range": `bytes ${start}-${end}/${videoSize}`,
    "Accept-Ranges": "bytes",
    "Content-Length": contentLength,
    "Content-Type": "video/mp4",
  };

  // HTTP Status 206 for Partial Content
  res.writeHead(206, headers);

  // create video read stream for this particular chunk
  const videoStream = fs.createReadStream(videoPath, { start, end });

  // Stream the video chunk to the client
  videoStream.pipe(res);
});


app.post('/prev',jsonParser, (req, res) => {
  var vid = parseInt(req.body.id);
  data={
    id:vid>1?vid-1:vid
  }
  res.json(JSON.stringify(data));
    // res.sendStatus(201);
});

app.post('/next',jsonParser, (req, res) => {
  var vid = parseInt(req.body.id);
  data={
    id:vid<8?vid+1:vid
  }
  res.json(JSON.stringify(data));
  // res.sendStatus(201);
});



app.listen(8000, function () {
  console.log("Listening on port 8000!");
});
