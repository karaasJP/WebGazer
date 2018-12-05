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
function Restart() {
  // webgazer.begin();
}
