"use strict";
let aufgabenListe = [];
let aktuellBearbeiteteAufgabeId = null; // Aktuell bearbeitete Aufgabe
// Aufgaben aus dem localStorage laden
function ladeAufgabenAusStorage() {
    const gespeicherteAufgaben = localStorage.getItem('aufgabenListe');
    if (gespeicherteAufgaben) {
        aufgabenListe = JSON.parse(gespeicherteAufgaben);
    }
}
// Aufgaben im localStorage speichern
function speichereAufgabenInStorage() {
    localStorage.setItem('aufgabenListe', JSON.stringify(aufgabenListe));
}
// Neue Aufgabe hinzufügen
function hinzufuegenAufgabe(titel, datum, uhrzeit, bearbeiter, kommentar) {
    const neueAufgabe = {
        id: Date.now(), // Verwenden der aktuellen Zeit als eindeutige ID
        titel,
        datum,
        uhrzeit,
        bearbeiter,
        kommentar,
        status: "nicht begonnen"
    };
    aufgabenListe.push(neueAufgabe);
    speichereAufgabenInStorage();
    ladeAufgaben(); // Aufgaben neu laden
}
// Aufgaben anzeigen
function ladeAufgaben() {
    const aufgabenListeElement = document.getElementById("aufgabenListe");
    aufgabenListeElement.innerHTML = ''; // Alle Aufgaben zuerst löschen
    aufgabenListe.forEach((aufgabe) => {
        const aufgabeElement = document.createElement("div");
        aufgabeElement.classList.add("aufgabe");
        aufgabeElement.setAttribute("data-id", aufgabe.id.toString());
        aufgabeElement.innerHTML = `
            <h3>${aufgabe.titel}</h3>
            <p>Datum: ${aufgabe.datum}, Uhrzeit: ${aufgabe.uhrzeit}</p>
            <p>Bearbeiter: ${aufgabe.bearbeiter}</p>
            <p>Kommentar: ${aufgabe.kommentar}</p>
            <button class="bearbeiten" data-id="${aufgabe.id}">Bearbeiten</button>
            <button class="loeschen" data-id="${aufgabe.id}">Löschen</button>
        `;
        aufgabenListeElement.appendChild(aufgabeElement);
    });
    // Event-Listener für Bearbeiten und Löschen
    document.querySelectorAll(".bearbeiten").forEach((button) => {
        button.addEventListener("click", (event) => {
            const id = event.target.getAttribute("data-id");
            if (id) {
                bearbeiteAufgabe(Number(id)); // Aufgabe bearbeiten
            }
        });
    });
    document.querySelectorAll(".loeschen").forEach((button) => {
        button.addEventListener("click", (event) => {
            const id = event.target.getAttribute("data-id");
            if (id) {
                loescheAufgabe(Number(id)); // Aufgabe löschen
            }
        });
    });
}
// Aufgabe löschen
function loescheAufgabe(id) {
    aufgabenListe = aufgabenListe.filter((aufgabe) => aufgabe.id !== id); // Aufgabe aus der Liste entfernen
    speichereAufgabenInStorage();
    ladeAufgaben();
}
function bearbeiteAufgabe(id) {
    aktuellBearbeiteteAufgabeId = id;
    const aufgabe = aufgabenListe.find((aufgabe) => aufgabe.id === id);
    if (aufgabe) {
        document.getElementById("titel").value = aufgabe.titel;
        document.getElementById("datum").value = aufgabe.datum;
        document.getElementById("uhrzeit").value = aufgabe.uhrzeit;
        document.getElementById("bearbeiter").value = aufgabe.bearbeiter;
        document.getElementById("kommentar").value = aufgabe.kommentar;
        const hinzufuegenButton = document.getElementById("hinzufuegenButton");
        hinzufuegenButton.textContent = "Speichern";
    }
}
const formular = document.getElementById("aufgabenForm");
formular.addEventListener("submit", (event) => {
    event.preventDefault();
    const titel = document.getElementById("titel").value;
    const datum = document.getElementById("datum").value;
    const uhrzeit = document.getElementById("uhrzeit").value;
    const bearbeiter = document.getElementById("bearbeiter").value;
    const kommentar = document.getElementById("kommentar").value;
    if (aktuellBearbeiteteAufgabeId === null) {
        hinzufuegenAufgabe(titel, datum, uhrzeit, bearbeiter, kommentar);
    }
    else {
        const aufgabeIndex = aufgabenListe.findIndex((aufgabe) => aufgabe.id === aktuellBearbeiteteAufgabeId);
        if (aufgabeIndex !== -1) {
            aufgabenListe[aufgabeIndex] = {
                id: aktuellBearbeiteteAufgabeId,
                titel,
                datum,
                uhrzeit,
                bearbeiter,
                kommentar,
                status: "nicht begonnen",
            };
            speichereAufgabenInStorage();
            ladeAufgaben();
        }
    }
    formular.reset();
    const hinzufuegenButton = document.getElementById("hinzufuegenButton");
    hinzufuegenButton.textContent = "Aufgabe hinzufügen";
    aktuellBearbeiteteAufgabeId = null;
});
async function communicate(_url) {
    const response = await fetch(_url);
    if (response.ok) {
        const serverTasks = await response.json();
        console.log(response);
    }
    //let response: Response = await fetch(_url);
    console.log("Response", response);
}
let link = "https://jennisinger.github.io/EIA2-Richtig/04.Aufgabenliste/tasks.json";
communicate(link);
ladeAufgabenAusStorage();
ladeAufgaben();
//# sourceMappingURL=aufgabenliste.js.map