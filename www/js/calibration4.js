var xydata;
var strXYdata = "";

window.onload = function () {

  //start the webgazer tracker
  webgazer.setRegression('ridge') /* currently must set regression and tracker */
    .setTracker('clmtrackr')
    .setGazeListener(function (data, clock) {
      // console.log(data); /* data is an object containing an x and y key which are the x and y prediction coordinates (no bounds limiting) */
      // console.log(clock); /* elapsed time in milliseconds since webgazer.begin() was called */
      xydata = data;
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
  //webgazer.end(); //Uncomment if you want to save the data even if you reload the page.
  window.localStorage.clear(); //Comment out if you want to save data across different sessions
}

/**
 * Restart the calibration process by clearing the local storage and reseting the calibration point
 */
function Restart() {
  document.getElementById("Accuracy").innerHTML = "<a>Not yet Calibrated</a>";
  ClearCalibration();
  PopUpInstruction();
}

// 上記main.jsよりコピー
// ***********************************


window.addEventListener("keydown", handleKeydown);

const times = new Array(10);
for (let i = 0; i < 10; i++) {
  times[i] = 0;
}

const x = new Array(10);
const y = new Array(10);
x[1] = x[4] = x[7] = 398;
x[2] = x[5] = x[8] = 1003;
x[3] = x[6] = x[9] = 1549;
y[1] = y[2] = y[3] = 43;
y[4] = y[5] = y[6] = 469;
y[7] = y[8] = y[9] = 875;

function handleKeydown(event) {
  if (xydata) {
    console.log("x: " + xydata.x);
    console.log("y: " + xydata.y);
  }
  // キーコード
  var keyCode = event.keyCode;
  console.log("押されたキーのコード : " + keyCode);
  target = document.getElementById("message");
  target.innerHTML = "keycode: " + keyCode + "<br>";
  if (48 <= keyCode && keyCode <= 90)
    target.innerHTML += String.fromCharCode(keyCode);

  // 1~9のキーが入力されたとき．
  if (48 <= keyCode && keyCode <= 57) {
    var row = keyCode - 48;

    // strXYdataに座標データを保存する
    strXYdata += "row:" + row;
    if (xydata) {
      strXYdata += "  x:" + xydata.x;
      strXYdata += "  y:" + xydata.y;
    }
    strXYdata += "  times:" + String(times[row] + 1);
    strXYdata += "\n";

    // 指定した座標をクリックしたように動作させる
    var elem = document.elementFromPoint(0, 0);
    elem.dispatchEvent(new MouseEvent("click", {
      clientX: x[row],
      clientY: y[row]
    }));
    target.innerHTML += "<br>" + x[row] + " " + y[row];

    var calcolor = document.getElementById("Pt" + row);
    times[row] += 1;

    // console.log(times[row]);
    // ターゲットの濃さをかえる
    if (times[row] < 5) {
      calcolor.style.opacity = String(0.2 * times[row] + 0.2);
    } else {
      calcolor.style.backgroundColor = "yellow";
    }
  }

  // Oを押したら出力
  if (keyCode == 79) {
    outputTxt();
  }
}

// マウスの座標をページ内に出力
window.addEventListener("mousemove", Coordinate);

function Coordinate(e) {
  var mX = e.pageX;
  var mY = e.pageY;
  document.getElementById("txtX").value = mX;
  document.getElementById("txtY").value = mY;
}


// テキストファイルを生成して出力
function AsciiToUint8Array(S) {
  var len = S.length;
  var P = new Uint8Array(len);
  for (var i = 0; i < len; i++) {
    P[i] = S[i].charCodeAt(0);
  }
  return P;
}

function SaveToFile(FileName, Stream) {
  if (window.navigator.msSaveBlob) {
    window.navigator.msSaveBlob(new Blob([Stream.subarray(0, Stream.length)], {
      type: "text/plain"
    }), FileName);
  } else {
    var a = document.createElement("a");
    a.href = URL.createObjectURL(new Blob([Stream.subarray(0, Stream.length)], {
      type: "text/plain"
    }));
    //a.target   = '_blank';
    a.download = FileName;
    document.body.appendChild(a) //  FireFox specification
    a.click();
    document.body.removeChild(a) //  FireFox specification
  }
}

function outputTxt() {
  var Stream = new Uint8Array(AsciiToUint8Array(strXYdata));
  SaveToFile('output.txt', Stream);
}