document.addEventListener("DOMContentLoaded", function() {
  var button = document.getElementById("button");
  var valueBox = document.getElementById("valueBox");
  var audioContext = new (window.AudioContext || window.webkitAudioContext)();
  var startButton = document.getElementById("startButton");

  var containerWidth = 700;
  var buttonSize = 70;

  button.addEventListener("mousedown", startMovingButton);
  button.addEventListener("touchstart", startMovingButton);
  startButton.addEventListener("click", startSound);

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
    // Código para mover el botón
  }

  function stopMovingButton(event) {
    // Código para detener el movimiento del botón
  }

  function showValueBox() {
    // Código para mostrar el valueBox
  }

  function startSound() {
    var x = parseInt(button.style.left, 10) || 0;
    var normalizedX = x / (containerWidth - buttonSize);
    var frequency = normalizedX * 1000 + 200;

    valueBox.innerHTML = frequency.toFixed(2) + " Hz";

    generateSound(frequency);
  }

  function generateSound(frequency) {
    var oscillator = audioContext.createOscillator();
    oscillator.frequency.value = frequency;
    oscillator.type = "sine";

    oscillator.connect(audioContext.destination);
    oscillator.start();
    setTimeout(function() {
      oscillator.stop();
    }, 100);
  }
});
