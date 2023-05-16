document.addEventListener("DOMContentLoaded", function() {
  var button = document.getElementById("button");
  var valueBox = document.getElementById("valueBox");

  var containerWidth = 500;
  var buttonSize = 20;

  button.addEventListener("mousedown", function(event) {
    event.preventDefault();
    document.addEventListener("mousemove", moveButton);
    document.addEventListener("mouseup", stopMovingButton);
  });

  function moveButton(event) {
    var x = event.pageX - buttonSize / 2;
    if (x < 0) {
      x = 0;
    } else if (x > containerWidth - buttonSize) {
      x = containerWidth - buttonSize;
    }

    button.style.left = x + "px";

    var normalizedX = x / (containerWidth - buttonSize);
    var XA = normalizedX * normalizedX;

    valueBox.innerHTML = XA.toFixed(2);
  }

  function stopMovingButton() {
    document.removeEventListener("mousemove", moveButton);
    document.removeEventListener("mouseup", stopMovingButton);
    showValueBox();
  }

  function showValueBox() {
    valueBox.style.display = "block";
  }
});
