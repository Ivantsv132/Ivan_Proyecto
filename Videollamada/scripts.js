

const Videolocal = document.getElementById("Videolocal");
const Videoremoto = document.getElementById("Videoremoto");
const IniciarBtn = document.getElementById("IniciarBtn");
const FinalizarBtn = document.getElementById("FinalizarBtn");
const Estado = document.getElementById("Estado");
const LLamadaEntrante = document.getElementById("Llamada-Entrante");
const AceptarBtn = document.getElementById("AceptarBtn");
const RechazarBtn = document.getElementById("RechazarBtn");

let localStream; // Variable que almacena el flujo de medios local
let ws;

async function IniciarLlamada() {
    try {
        localStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true }); //acceso
        Videolocal.srcObject = localStream; //mostrar
        Estado.textContent = "Conectado";
        Estado.style.color = "green";

        ws = new WebSocket("ws://localhost:8080");

        ws.onopen = () => console.log("Conectado al servidor WebSocket.");

        ws.onmessage = (event) => {
            console.log("Mensaje recibido: ", event.data);
        };

        ws.onclose = () => console.log("Conexión cerrada.");
    } catch (err) {
        alert("No se pudo acceder a la cámara/micrófono.");
        console.error("Error al iniciar llamada:", err);
    }
}

function Terminarllamada() {
    if (localStream) {
        localStream.getTracks().forEach(track => track.stop()); //detener
        Videolocal.srcObject = null;
        Estado.textContent = "Desconectado";
        Estado.style.color = "red";
    }

    if (ws) {
        ws.close();
    }
}

IniciarBtn.addEventListener("click", IniciarLlamada);
FinalizarBtn.addEventListener("click", Terminarllamada);

// Simulación de una llamada entrante
setTimeout(() => {
    LLamadaEntrante.style.display = "block";
}, 3000);
