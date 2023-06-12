document.addEventListener("DOMContentLoaded", function() {
  var button = document.getElementById("button");
  var valueBox = document.getElementById("valueBox");
  var audioContext = new (window.AudioContext || window.webkitAudioContext)();

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
    var frequency = normalizedX * 1000 + 200; // Ajusta la fórmula para obtener la frecuencia deseada

    valueBox.innerHTML = frequency.toFixed(2) + " Hz";

    // Generar sonido
    generateSound(frequency);
  }

  function generateSound(frequency) {
    var oscillator = audioContext.createOscillator();
    oscillator.frequency.value = frequency;
    oscillator.type = "sine"; // Puedes cambiar el tipo de forma de onda aquí

    oscillator.connect(audioContext.destination);
    oscillator.start();
    setTimeout(function() {
      oscillator.stop();
    }, 100); // Duración del sonido en milisegundos
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
