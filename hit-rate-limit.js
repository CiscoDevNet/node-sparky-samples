var Spark = require('node-sparky');

var spark = new Spark({
  token: process.env.SPARK_TOKEN
});

// Create new room
spark.roomAdd('Test: rate limitation')
  .then(function (room) {
    console.log(`Created room with id: ${room.id}`);

    // Post messages
    // - above 400 requests on 60 seconds timeframes, the Rate Limit would be hit
    const interval = 150; // in ms
    setInterval(function () {

      let num = incr();
      let newMessage = {
        roomId: room.id,
        text: 'Hello World ' + num
      };

      spark.messageSend(newMessage)
        .then(function (message) {
          // Show message
          console.log(`Created message ${num}, with id: ${message.id}, at: ${new Date(Date.now()).toISOString()}`);
        })
        .catch(function (err) {
          // Process error
          console.log(`error for message ${num}, ${err}`);
        });
    }, interval);
  })
  .catch(function (err) {
    // process error
    console.log(err);
  });

var counter = 0;
function incr() {
  return counter++;
}