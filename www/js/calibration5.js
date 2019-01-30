var xydata;
var strXYdata = "";
var xdataStock = new Array(5).fill(0);
var ydataStock = new Array(5).fill(0);
var avgXdataStock = 0;
var avgYdataStock = 0;
var stockSize = 0;
var line = 0;
var isSpaced = false;
var checkBlock = new Array(8).fill(0);

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
};

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

var times = new Array(11);
times.fill(0);

var x = new Array(10);
var y = new Array(10);
// x[1] = x[4] = x[7] = 398;
// x[2] = x[5] = x[8] = 973;
// x[3] = x[6] = x[9] = 1549;
// y[1] = y[2] = y[3] = 43;
// y[4] = y[5] = y[6] = 459;
// y[7] = y[8] = y[9] = 875;

x[1] = x[4] = x[7] = 398;
x[2] = x[5] = x[8] = 973;
x[3] = x[6] = x[9] = 1549;
y[1] = y[2] = y[3] = 43;
y[4] = y[5] = y[6] = 476;
y[7] = y[8] = y[9] = 907;

for (var i = 1; i <= 9; i++) {
  strXYdata += "x: " + x[i] + " y: " + y[i] + " button: " + i;
  strXYdata += "\n";
}
strXYdata += "\n";

// var insertSpace = function (num) {
//   num = String(num);
//   if (num.length == 4) {
//     num = num + " ";
//   } else if (num.length == 3) {
//     num = num + "  ";
//   } else if (num.length == 2) {
//     num = num + "   ";
//   } else {
//     num = num + "    ";
//   }
//   return num;
// };

var getDistance = function (posX1, posY1, posX2, posY2) {
  return Math.sqrt(Math.pow(posX1 - posX2, 2) + Math.pow(posY1 - posY2, 2));
};

var closest = function (posX, posY) {
  var min = 2000;
  var minN = 0;
  var distanceArray = new Array(10);
  for (var i = 1; i < 10; i++) {
    distanceArray[i] = getDistance(x[i], y[i], posX, posY);
  }
  for (i = 1; i < 10; i++)
    if (min > distanceArray[i]) {
      min = distanceArray[i];
      minN = i;
    }

  return String(minN);
};

var storingData = function (row) {
  if (xydata) {
    // xydata.x = insertSpace(xydata.x);
    // xydata.y = insertSpace(xydata.y);
    strXYdata += "x: " + xydata.x;
    strXYdata += " y: " + xydata.y;
    strXYdata += " button: " + row;
    strXYdata += " times: " + String(times[row] + 1);

    // 1-9のとき誤差距離を求めて表示
    if (1 <= row && row <= 9) {
      var distance = getDistance(x[row], y[row], xydata.x, xydata.y);
      distance = Math.round(distance * 100) / 100;
      strXYdata += " distance: " + String(distance);
      strXYdata += " closest: " + closest(xydata.x, xydata.y) + "\n";
    }
  } else {
    strXYdata += "button: " + String(row);
    strXYdata += " times: " + String(times[row] + 1) + "\n";
  }
  times[row]++;
  times[10]++;
  // strXYdata += " sum: " + String(times[10]) + "\n";
};

var sum;

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
    target.innerHTML += String.fromCharCode(keyCode) + "<br>";

  var row;
  if (keyCode >= 48)
    row = keyCode - 48;

  // 1~9のキーが入力されたとき
  if (49 <= keyCode && keyCode <= 57) {
    // strXYdataに座標データを保存する
    storingData(row);

    // 指定した座標をクリックしたように動作させる
    var elem = document.elementFromPoint(0, 0);
    elem.dispatchEvent(new MouseEvent("click", {
      clientX: x[row],
      clientY: y[row]
    }));
    target.innerHTML += "<br>" + x[row] + " " + y[row];
    if (xydata)
      target.innerHTML += "<br>rcg:" + closest(xydata.x, xydata.y) + "<br>";

    // ターゲットの濃さをかえる
    var calcolor = document.getElementById("Pt" + row);
    if (times[row] < 5) {
      calcolor.style.opacity = String(0.2 * times[row] + 0.2);
    } else {
      calcolor.style.backgroundColor = "yellow";
    }
  }

  // o(オー)を押したら出力
  if (keyCode == 79) {
    strXYdata += checkBlock;
    outputTxt();
  }

  // 0(zero)を押したとき
  if (keyCode == 48) {
    storingData(row);
  }

  // sを押したとき
  if (keyCode == 83) {
    stockSize = 10;
  }
  // スペースを押したとき
  if (keyCode == 32) {
    // store_points_var = true;
    isSpaced = true;
    line += 1;
    target.innerHTML += "<br>行：" + line + "<br>";
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
    document.body.appendChild(a); //  FireFox specification
    a.click();
    document.body.removeChild(a); //  FireFox specification
  }
}

function outputTxt() {
  var Stream = new Uint8Array(AsciiToUint8Array(strXYdata));
  SaveToFile('output.txt', Stream);
}