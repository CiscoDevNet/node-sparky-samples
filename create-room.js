var Spark = require('node-sparky');

var spark = new Spark({
  token: process.env.SPARK_TOKEN
});

spark.roomAdd('Test: create room')
  .then(function(room) {
    console.log(room.title);
  })
  .catch(function(err) {
    // process error
    console.log(err);
  });