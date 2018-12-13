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