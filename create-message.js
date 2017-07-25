var Spark = require('node-sparky');

var spark = new Spark({
  token: process.env.SPARK_TOKEN
});

// Create new room
spark.roomAdd('Test: create message')
  .then(function (room) {
    console.log(`Created room with id: ${room.id}`);

    // Post message
    let newMessage = {
      roomId: room.id,
      text: 'Hello World'
    };
    return spark.messageSend(newMessage)
  })
  .then(function (message) {
    // Show message
    console.log(`Created message with id: ${message.id}`);
  })
  .catch(function (err) {
    // process error
    console.log(err);
  });
