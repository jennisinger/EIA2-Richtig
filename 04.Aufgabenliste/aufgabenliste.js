// Array, das alle Aufgaben speichert
var aufgabenListe = [];
// Funktion, um die Aufgaben aus dem localStorage zu laden
function ladeAufgabenAusStorage() {
    var gespeicherteAufgaben = localStorage.getItem('aufgabenListe');
    if (gespeicherteAufgaben) {
        aufgabenListe = JSON.parse(gespeicherteAufgaben); // Aufgaben aus dem localStorage laden
    }
}
// Funktion, um die Aufgaben im localStorage zu speichern
function speichereAufgabenInStorage() {
    localStorage.setItem('aufgabenListe', JSON.stringify(aufgabenListe)); // Aufgaben im localStorage speichern
}
// Funktion, um eine neue Aufgabe hinzuzufügen
function hinzufuegenAufgabe(titel, datum, uhrzeit, bearbeiter, kommentar) {
    var neueAufgabe = {
        id: Date.now(), // Verwenden der aktuellen Zeit als eindeutige ID
        titel: titel,
        datum: datum,
        uhrzeit: uhrzeit,
        bearbeiter: bearbeiter,
        kommentar: kommentar,
        status: "nicht begonnen" // Standardwert für den Status
    };
    aufgabenListe.push(neueAufgabe); // Neue Aufgabe zur Liste hinzufügen
    speichereAufgabenInStorage(); // Aufgaben im localStorage speichern
    ladeAufgaben(); // Alle Aufgaben neu laden und anzeigen
}
// Funktion, um alle Aufgaben anzuzeigen
function ladeAufgaben() {
    var aufgabenListeElement = document.getElementById("aufgabenListe");
    aufgabenListeElement.innerHTML = ''; // Liste leeren
    aufgabenListe.forEach(function (aufgabe) {
        var aufgabeElement = document.createElement("div");
        aufgabeElement.classList.add("aufgabe");
        aufgabeElement.innerHTML = "\n            <h3>".concat(aufgabe.titel, "</h3>\n            <p>Datum: ").concat(aufgabe.datum, ", Uhrzeit: ").concat(aufgabe.uhrzeit, "</p>\n            <p>Bearbeiter: ").concat(aufgabe.bearbeiter, "</p>\n            <p>Kommentar: ").concat(aufgabe.kommentar, "</p>\n            <button class=\"bearbeiten\" data-id=\"").concat(aufgabe.id, "\">Bearbeiten</button>\n            <button class=\"loeschen\" data-id=\"").concat(aufgabe.id, "\">L\u00F6schen</button>\n        ");
        aufgabenListeElement.appendChild(aufgabeElement);
    });
    // Event-Listener für Bearbeiten und Löschen
    document.querySelectorAll(".bearbeiten").forEach(function (button) {
        button.addEventListener("click", function (event) {
            var id = event.target.getAttribute("data-id");
            bearbeiteAufgabe(Number(id));
        });
    });
    document.querySelectorAll(".loeschen").forEach(function (button) {
        button.addEventListener("click", function (event) {
            var id = event.target.getAttribute("data-id");
            loescheAufgabe(Number(id));
        });
    });
}
// Funktion, um eine Aufgabe zu löschen
function loescheAufgabe(id) {
    aufgabenListe = aufgabenListe.filter(function (aufgabe) { return aufgabe.id !== id; }); // Aufgabe entfernen
    speichereAufgabenInStorage(); // Aufgaben im localStorage speichern
    ladeAufgaben(); // Aufgaben neu laden
}
// Funktion, um eine Aufgabe zu bearbeiten
function bearbeiteAufgabe(id) {
    var aufgabe = aufgabenListe.find(function (aufgabe) { return aufgabe.id === id; });
    if (aufgabe) {
        document.getElementById("titel").value = aufgabe.titel;
        document.getElementById("datum").value = aufgabe.datum;
        document.getElementById("uhrzeit").value = aufgabe.uhrzeit;
        document.getElementById("bearbeiter").value = aufgabe.bearbeiter;
        document.getElementById("kommentar").value = aufgabe.kommentar;
        // Ändere den Button-Text und die Funktion
        var hinzufuegenButton_1 = document.getElementById("hinzufuegenButton");
        hinzufuegenButton_1.textContent = "Speichern";
        hinzufuegenButton_1.onclick = function () {
            aufgabe.titel = document.getElementById("titel").value;
            aufgabe.datum = document.getElementById("datum").value;
            aufgabe.uhrzeit = document.getElementById("uhrzeit").value;
            aufgabe.bearbeiter = document.getElementById("bearbeiter").value;
            aufgabe.kommentar = document.getElementById("kommentar").value;
            speichereAufgabenInStorage(); // Aufgaben im localStorage speichern
            ladeAufgaben(); // Aufgaben neu laden
            hinzufuegenButton_1.textContent = "Aufgabe hinzufügen"; // Button zurücksetzen
        };
    }
}
// Event-Listener für das Formular
var formular = document.getElementById("aufgabenForm");
formular.addEventListener("submit", function (event) {
    event.preventDefault();
    var titel = document.getElementById("titel").value;
    var datum = document.getElementById("datum").value;
    var uhrzeit = document.getElementById("uhrzeit").value;
    var bearbeiter = document.getElementById("bearbeiter").value;
    var kommentar = document.getElementById("kommentar").value;
    hinzufuegenAufgabe(titel, datum, uhrzeit, bearbeiter, kommentar);
    formular.reset(); // Formular zurücksetzen
});
// Initiales Laden der Aufgaben
ladeAufgabenAusStorage(); // Aufgaben aus dem localStorage laden
ladeAufgaben(); // Aufgaben anzeigen
