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
  // キーコード
  var keyCode = event.keyCode;
  console.log("押されたキーのコード : " + keyCode);
  target = document.getElementById("message");
  target.innerHTML = "keycode: " + keyCode + "<br>";
  if (48 <= keyCode && keyCode <= 90)
    target.innerHTML += String.fromCharCode(keyCode);

  if (48 <= keyCode && keyCode <= 57) {
    var row = keyCode - 48;

    var elem = document.elementFromPoint(0, 0);
    elem.dispatchEvent(new MouseEvent("click", {
      clientX: x[row],
      clientY: y[row]
    }));
    target.innerHTML += "<br>" + x[row] + " " + y[row];

    var calcolor = document.getElementById("Pt" + row);
    times[row] += 1;
    console.log(times[row]);
    calcolor.style.opacity = String(0.2 * times[row] + 0.2);
    if (times[row] >= 5) {
      calcolor.style.backgroundColor = "yellow";
    }
  }
}


window.addEventListener("mousemove", Coordinate);

function Coordinate(e) {
  var mX = e.pageX;
  var mY = e.pageY;
  document.getElementById("txtX").value = mX;
  document.getElementById("txtY").value = mY;
}