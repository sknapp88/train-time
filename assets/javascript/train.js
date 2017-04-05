

  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyDhRqLH7q-cF9NSUOLHBRr9YGS-GH7zwGY",
    authDomain: "train-time-bdf21.firebaseapp.com",
    databaseURL: "https://train-time-bdf21.firebaseio.com",
    projectId: "train-time-bdf21",
    storageBucket: "train-time-bdf21.appspot.com",
    messagingSenderId: "617067371716"
  };
  firebase.initializeApp(config);

  var database = firebase.database();

  $("#action").click(function(){

    event.preventDefault();

    var name = $("#name").val().trim();
    var destination = $("#destination").val().trim();
    var firstTime = $("#first-time").val().trim();
    var freq = $("#freq").val().trim();

    database.ref().push({
      name: name,
      destination: destination,
      firstTime: firstTime,
      freq: freq
    });
    console.log(name);

    database.ref().on("child_added", function(childSnapshot, prevChildKey){
      console.log(childSnapshot.val());
      var trainName = childSnapshot.val().name;
      var trainDestination = childSnapshot.val().destination;
      var trainStart = childSnapshot.val().firstTime;
      var trainFreq = childSnapshot.val().freq;

      console.log(trainName);
      console.log(trainDestination);
      console.log(trainStart);
      console.log(trainFreq);

      var startTime = moment(trainStart, "hh:mm");
      var currentTime = moment().format("hh:mm");
      var diffTime = moment().diff(moment(startTime), "minutes");
      console.log(diffTime);
      var waitTime = diffTime % trainFreq;
      var minutesTT = trainFreq - waitTime;
      var nextTrain = moment().add(minutesTT, "hh:mm");



      $("#on-time").append(`
          <tr>
            <td id="nameDisplay">${trainName}</td>
            <td id="trainDestination">${childSnapshot.val().destination}</td>
            <td id="trainFreq">${childSnapshot.val().freq}</td>
            <td id="arrTime">${nextTrain}</td>
            <td id="minutes">${minutesTT}</td>
          </tr>

        `);
      $("#name").val('');
      $("#destination").val('');
      $("#first-time").val('');
      $("#freq").val('');
    });





  });