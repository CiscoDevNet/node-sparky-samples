var Spark = require('node-sparky');

var spark = new Spark({
  token: process.env.SPARK_TOKEN
});

// Create new room
spark.roomAdd('Test: get message with attachment')
  .then(function (room) {
    console.log(`Created room with id: ${room.id}`);

    // Create file object from filename
    spark.contentCreate('tmp/attachment.txt')
      .then(function (file) {

        // Post message
        let newMessage = {
          roomId: room.id,
          text: 'This message has a file as attachment'
        };
        return spark.messageSend(newMessage, file)
      })
      .then(function (message) {
        // Show message
        console.log(`Created message with id: ${message.id}`);

        // readMessage
        readMessage(message);
      })
      .catch(function (err) {
        // process error
        console.log("err while creating message: " + err);
      });
  }).catch(function (err) {
    // process error
    console.log(err);
  });


function readMessage(message) {
  console.log("Reading message attachment");

  spark.contentGet(message.files[0])
    .then(function (file) {
      // Read file
      console.log('Received file name: %s', file.name);

      contentWrite(file);
    })
    .catch(function (err) {
      console.log(err);
    });

}

// only from Node, not for browsers
function contentWrite(file) {
  console.log("Writing file contents");

  const fs = require("fs");
  const writeFile = require('when/node').lift(fs.writeFile);
  writeFile("tmp/extracted." + file.ext, file.binary)
    .then(function (result) {
      console.log("Successfully created file");
    })
    .catch(function (err) {
      console.log(err);
    });
}
