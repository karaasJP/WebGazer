window.addEventListener("keydown", handleKeydown);

function handleKeydown(event) {
  // キーコード
  var keyCode = event.keyCode;
  console.log("押されたキーのコード : " + keyCode);
  target = document.getElementById("message");
  target.innerHTML = "keycode: " + keyCode + "<br>";
  if (48 <= keyCode && keyCode <= 90)
    target.innerHTML += String.fromCharCode(keyCode);
}

window.addEventListener("mousemove", Coordinate);

function Coordinate(e) {
  var mX = e.pageX;
  var mY = e.pageY;

  document.getElementById("txtX").value = mX;
  document.getElementById("txtY").value = mY;
}