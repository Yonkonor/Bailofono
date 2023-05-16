document.addEventListener("DOMContentLoaded", function() {
  var button = document.getElementById("button");
  var valueBox = document.getElementById("valueBox");

  var containerWidth = 700;
  var buttonSize = 70;

  button.addEventListener("mousedown", startMovingButton);
  button.addEventListener("touchstart", startMovingButton);

  function startMovingButton(event) {
    event.preventDefault();

    if (event.type === "mousedown") {
      document.addEventListener("mousemove", moveButton);
      document.addEventListener("mouseup", stopMovingButton);
    } else if (event.type === "touchstart") {
      document.addEventListener("touchmove", moveButton);
      document.addEventListener("touchend", stopMovingButton);
    }
  }

  function moveButton(event) {
    var x;

    if (event.type === "mousemove") {
      x = event.pageX - buttonSize / 2;
    } else if (event.type === "touchmove") {
      x = event.touches[0].pageX - buttonSize / 2;
    }

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

  function stopMovingButton(event) {
    if (event.type === "mouseup") {
      document.removeEventListener("mousemove", moveButton);
      document.removeEventListener("mouseup", stopMovingButton);
    } else if (event.type === "touchend") {
      document.removeEventListener("touchmove", moveButton);
      document.removeEventListener("touchend", stopMovingButton);
    }

    showValueBox();
  }

  function showValueBox() {
    valueBox.style.display = "block";
  }
});

