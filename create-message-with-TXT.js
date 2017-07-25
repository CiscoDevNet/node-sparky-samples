var Spark = require('node-sparky');

var spark = new Spark({
  token: process.env.SPARK_TOKEN
});

// Create new room
spark.roomAdd('Test: create message with attachment')
  .then(function (room) {
    console.log(`Created room with id: ${room.id}`);

    // Create file object from filename
    spark.contentCreate('tmp/attachment.txt')
      .then(function (file) {

        // Post message
        let newMessage = {
          roomId: room.id,
          text: 'This message has a text file as attachment'
        };
        return spark.messageSend(newMessage, file)
      })
      .then(function (message) {
        // Show message
        console.log(`Created message with id: ${message.id}`);
      })
      .catch(function (err) {
        // process error
        console.log("err while creating message: " + err);
      });
  }).catch(function (err) {
    // process error
    console.log(err);
  });