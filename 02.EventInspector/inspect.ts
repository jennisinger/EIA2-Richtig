// Elementreferenzen vorbereiten
const infoBox = document.getElementById("infoBox") as HTMLSpanElement;
const customButton = document.getElementById("customButton") as HTMLButtonElement;

// Funktion zur Anzeige von Mausinformationen und Event-Targets
function setInfoBox(event: MouseEvent): void {
    if (infoBox) {
        // Mausposition und Ziel des Events
        infoBox.style.left = `${event.pageX + 10}px`;
        infoBox.style.top = `${event.pageY + 10}px`;
        infoBox.innerText = `Position: (${event.pageX}, ${event.pageY})\nTarget: ${event.target ? (event.target as HTMLElement).id || (event.target as HTMLElement).tagName : 'unknown'}`;
        infoBox.style.display = "block";
    }
}

// Funktion zum Loggen der Event-Informationen in der Konsole
function logInfo(event: Event): void {
    console.log("Event Type:", event.type);
    console.log("Event Target:", event.target);
    console.log("Current Target:", event.currentTarget);
    console.log("Event Object:", event);
}

// Funktion zur Verarbeitung des Load-Events
function handleLoad(): void {
    document.addEventListener("mousemove", setInfoBox);
    document.addEventListener("click", logInfo);
    document.addEventListener("keyup", logInfo);

    if (customButton) {
        customButton.addEventListener("click", () => {
            // Custom-Event erstellen
            const customEvent = new CustomEvent("customEvent", {
                detail: { message: "Button was clicked!" },
                bubbles: true
            });

            // Custom-Event auslösen
            customButton.dispatchEvent(customEvent);
        });
    }

    // Custom-Event auf document abfangen
    document.addEventListener("customEvent", (event: Event) => {
        if (event instanceof CustomEvent) {
            console.log("Custom Event caught at document level:", event.detail.message);
        }
    });
}

// Wenn das Fenster geladen ist, handleLoad-Funktion ausführen
window.addEventListener("load", handleLoad);

// Mausposition im Info-Box anzeigen bei Mausbewegung
document.addEventListener("mouseout", () => {
    if (infoBox) {
        infoBox.style.display = "none";
    }
});
