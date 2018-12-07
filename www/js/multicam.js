'use strict';

// var qvgaVideo = document.querySelector('video#qvga');
var hdVideo = document.querySelector('video#hd');

// var qvgaConstraints = {
//   video: {
//     mandatory: {
//       maxWidth: 320,
//       maxHeight: 180
//     }
//   }
// };

// var vgaConstraints  = {
//   video: {
//     mandatory: {
//       maxWidth: 640,
//       maxHeight: 360
//     }
//   }
// };

var hdConstraints = {
  video: {
    mandatory: {
      minWidth: 320,
      minHeight: 180
    }
  }
};

function errorCallback(error) {
  console.log('navigator.getUserMedia error: ', error);
}

// navigator.mediaDevices.getUserMedia(
//   qvgaConstraints
// ).then(
//   function (stream) {
//     qvgaVideo.srcObject = stream;
//     qvgaVideo.play();
//   },
//   errorCallback
// );

navigator.mediaDevices.getUserMedia(
  hdConstraints
).then(
  function (stream) {
    hdVideo.srcObject = stream;
    hdVideo.play();
  },
  errorCallback
);
