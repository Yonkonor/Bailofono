let buttonWidth = sliderButton.offsetWidth;
let maxX = sliderWidth - buttonWidth;

// Variables para controlar el sonido
let f = 880;
let imax = 1;
let vt = 0;

// Actualizar el valor de X y la posición del botón en la corredera
function updateSliderPosition() {
  x = sliderButton.offsetLeft / maxX;
  f = 880 + x * (1660 - 880);
}

// Actualizar la intensidad del sonido
function updateSoundIntensity() {
  let i = (Math.abs(vt) / imax) * 100;
  // Aplicar intensidades relativas para los armónicos
  let harmonic1 = i * 0.5;
  let harmonic2 = i * 0.3;
  let harmonic3 = i * 0.1;
  
  // Aquí puedes utilizar los valores de intensidad para generar el sonido
  console.log('Intensidad:', i);
  console.log('Armónico 1:', harmonic1);
  console.log('Armónico 2:', harmonic2);
  console.log('Armónico 3:', harmonic3);
}

// Evento para controlar el desplazamiento del botón en la corredera
function handleTouchMove(event) {
  event.preventDefault();
  let touch = event.touches[0];
  let newPosition = touch.clientX - buttonWidth / 2;
  if (newPosition >= 0 && newPosition <= maxX) {
    sliderButton.style.left = newPosition + 'px';
    updateSliderPosition();
    updateSoundIntensity();
  }
}

// Evento para iniciar el sonido
function handleTouchStart() {
  // Aquí puedes agregar la lógica para iniciar el sonido
  console.log('Sonido iniciado');
}

// Agregar los eventos de desplazamiento y inicio del sonido
sliderButton.addEventListener('touchmove', handleTouchMove);
sliderButton.addEventListener('touchstart', handleTouchStart);
