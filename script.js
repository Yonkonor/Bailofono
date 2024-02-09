// app.js
document.addEventListener('DOMContentLoaded', () => {
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    const accelerometerOptions = { frequency: 10 }; // Actualiza cada 10ms

    let frequencySlider = document.getElementById('frequencySlider');
    
    // Inicializa el oscilador y el nodo de ganancia
    oscillator.type = 'sine'; // Puedes cambiar a otros tipos de onda (square, sawtooth, triangle)
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    oscillator.start();

    // Función para cambiar la frecuencia
    function changeFrequency() {
        oscillator.frequency.setValueAtTime(frequencySlider.value, audioContext.currentTime);
    }

    // Función para ajustar la intensidad basada en la aceleración
    function handleAcceleration(event) {
        let acceleration = event.accelerationIncludingGravity;
        let intensity = Math.sqrt(acceleration.x**2 + acceleration.y**2 + acceleration.z**2) / 9.8;
        gainNode.gain.value = intensity;
    }

    // Configura el control deslizable de frecuencia
    frequencySlider.addEventListener('input', changeFrequency);

    // Configura el acelerómetro
    if (window.DeviceMotionEvent) {
        window.addEventListener('devicemotion', handleAcceleration, accelerometerOptions);
    } else {
        console.log('El dispositivo no es compatible con el acelerómetro.');
    }
});
