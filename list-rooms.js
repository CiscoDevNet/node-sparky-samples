var Spark = require('node-sparky');

var spark = new Spark({
  token: process.env.SPARK_TOKEN
});

spark.roomsGet(3)
  .then(function(rooms) {
    // process rooms as array
    rooms.forEach(function(room) {
      console.log(room.title);
    });
  })
  .catch(function(err) {
    // process error
    console.log(err);
  });