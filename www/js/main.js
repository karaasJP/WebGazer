window.onload = function () {

  //start the webgazer tracker
  webgazer.setRegression('ridge') /* currently must set regression and tracker */
    .setTracker('clmtrackr')
    .setGazeListener(function (data, clock) {
      // console.log(data); /* data is an object containing an x and y key which are the x and y prediction coordinates (no bounds limiting) */
      // console.log(clock); /* elapsed time in milliseconds since webgazer.begin() was called */
    })
    .begin()
    .showPredictionPoints(true); /* shows a square every 100 milliseconds where current prediction is */


  //Set up the webgazer video feedback.
  var setup = function () {

    //Set up the main canvas. The main canvas is used to calibrate the webgazer.
    var canvas = document.getElementById("plotting_canvas");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    canvas.style.position = 'fixed';
  };

  function checkIfReady() {
    if (webgazer.isReady()) {
      setup();
    } else {
      setTimeout(checkIfReady, 100);
    }
  }
  setTimeout(checkIfReady, 100);
};

window.onbeforeunload = function () {
  // webgazer.end(); //Uncomment if you want to save the data even if you reload the page.
  // window.localStorage.clear(); //Comment out if you want to save data across different sessions
}


/**
 * Clear the canvas and the calibration button.
 */
function ClearCanvas() {
  $(".Calibration").hide();
  var canvas = document.getElementById("plotting_canvas");
  canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height);
}

/**
  * Show the help instructions right at the start.
  */
// function helpModalShow() {
//   $('#helpModal').modal('show');
// }

/**
 * Restart the calibration process by clearing the local storage and reseting the calibration point
 */
// function Restart() {
//   document.getElementById("Accuracy").innerHTML = "<a>Not yet Calibrated</a>";
//   ClearCalibration();
//   PopUpInstruction();
// }


var videoElement = document.querySelector('video');
var audioSelect = document.querySelector('select#audioSource');
var videoSelect = document.querySelector('select#videoSource');

navigator.mediaDevices.enumerateDevices()
  .then(gotDevices).then(getStream).catch(handleError);

audioSelect.onchange = getStream;
videoSelect.onchange = getStream;


function gotDevices(deviceInfos) {
  for (var i = 0; i !== deviceInfos.length; ++i) {
    var deviceInfo = deviceInfos[i];
    var option = document.createElement('option');
    option.value = deviceInfo.deviceId;
    if (deviceInfo.kind === 'audioinput') {
      option.text = deviceInfo.label ||
        'microphone ' + (audioSelect.length + 1);
      audioSelect.appendChild(option);
    } else if (deviceInfo.kind === 'videoinput') {
      option.text = deviceInfo.label || 'camera ' +
        (videoSelect.length + 1);
      videoSelect.appendChild(option);
    } else {
      console.log('Found one other kind of source/device: ', deviceInfo);
    }
  }
}

function getStream() {
  if (window.stream) {
    window.stream.getTracks().forEach(function (track) {
      track.stop();
    });
  }

  var constraints = {
    audio: {
      deviceId: { exact: audioSelect.value }
    },
    video: {
      deviceId: { exact: videoSelect.value }
    }
  };

  navigator.mediaDevices.getUserMedia(constraints).
    then(gotStream).catch(handleError);
}

function gotStream(stream) {
  window.stream = stream; // make stream available to console
  videoElement.srcObject = stream;
}

function handleError(error) {
  console.log('Error: ', error);
}