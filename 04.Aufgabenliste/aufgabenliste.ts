interface Aufgabe {
    id: number;
    titel: string;
    datum: string;
    uhrzeit: string;
    bearbeiter: string;
    kommentar: string;
    status: "nicht begonnen" | "in Bearbeitung" | "abgeschlossen";
}

let aufgabenListe: Aufgabe[] = [];
let aktuellBearbeiteteAufgabeId: number | null = null; // Aktuell bearbeitete Aufgabe

// Aufgaben aus dem localStorage laden
function ladeAufgabenAusStorage(): void {
    const gespeicherteAufgaben = localStorage.getItem('aufgabenListe');
    if (gespeicherteAufgaben) {
        aufgabenListe = JSON.parse(gespeicherteAufgaben);
    }
}

// Aufgaben im localStorage speichern
function speichereAufgabenInStorage(): void {
    localStorage.setItem('aufgabenListe', JSON.stringify(aufgabenListe));
}

// Neue Aufgabe hinzufügen
function hinzufuegenAufgabe(titel: string, datum: string, uhrzeit: string, bearbeiter: string, kommentar: string): void {
    const neueAufgabe: Aufgabe = {
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
function ladeAufgaben(): void {
    const aufgabenListeElement = document.getElementById("aufgabenListe")!;
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
            const id = (event.target as HTMLElement).getAttribute("data-id");
            if (id) {
                bearbeiteAufgabe(Number(id)); // Aufgabe bearbeiten
            }
        });
    });

    document.querySelectorAll(".loeschen").forEach((button) => {
        button.addEventListener("click", (event) => {
            const id = (event.target as HTMLElement).getAttribute("data-id");
            if (id) {
                loescheAufgabe(Number(id)); // Aufgabe löschen
            }
        });
    });
}

// Aufgabe löschen
function loescheAufgabe(id: number): void {
    aufgabenListe = aufgabenListe.filter((aufgabe) => aufgabe.id !== id); // Aufgabe aus der Liste entfernen
    speichereAufgabenInStorage();
    ladeAufgaben(); // Aufgaben neu laden
}

// Aufgabe bearbeiten
function bearbeiteAufgabe(id: number): void {
    aktuellBearbeiteteAufgabeId = id; // ID der bearbeiteten Aufgabe speichern
    const aufgabe = aufgabenListe.find((aufgabe) => aufgabe.id === id);
    if (aufgabe) {
        // Formular mit den bestehenden Daten der Aufgabe ausfüllen
        (document.getElementById("titel") as HTMLInputElement).value = aufgabe.titel;
        (document.getElementById("datum") as HTMLInputElement).value = aufgabe.datum;
        (document.getElementById("uhrzeit") as HTMLInputElement).value = aufgabe.uhrzeit;
        (document.getElementById("bearbeiter") as HTMLInputElement).value = aufgabe.bearbeiter;
        (document.getElementById("kommentar") as HTMLTextAreaElement).value = aufgabe.kommentar;

        // Button-Text ändern und zur Speichern-Funktion umschalten
        const hinzufuegenButton = document.getElementById("hinzufuegenButton") as HTMLButtonElement;
        hinzufuegenButton.textContent = "Speichern"; // Button zum Speichern umbenennen
    }
}

// Event-Listener für das Formular
const formular = document.getElementById("aufgabenForm") as HTMLFormElement;
formular.addEventListener("submit", (event) => {
    event.preventDefault();
    const titel = (document.getElementById("titel") as HTMLInputElement).value;
    const datum = (document.getElementById("datum") as HTMLInputElement).value;
    const uhrzeit = (document.getElementById("uhrzeit") as HTMLInputElement).value;
    const bearbeiter = (document.getElementById("bearbeiter") as HTMLInputElement).value;
    const kommentar = (document.getElementById("kommentar") as HTMLTextAreaElement).value;

    if (aktuellBearbeiteteAufgabeId === null) {
        hinzufuegenAufgabe(titel, datum, uhrzeit, bearbeiter, kommentar); // Neue Aufgabe hinzufügen
    } else {
        // Bestehende Aufgabe mit der neuen ID und Daten aktualisieren
        const aufgabeIndex = aufgabenListe.findIndex((aufgabe) => aufgabe.id === aktuellBearbeiteteAufgabeId);
        if (aufgabeIndex !== -1) {
            aufgabenListe[aufgabeIndex] = {
                id: aktuellBearbeiteteAufgabeId,
                titel,
                datum,
                uhrzeit,
                bearbeiter,
                kommentar,
                status: "nicht begonnen", // Standardwert für den Status
            };
            speichereAufgabenInStorage(); // Aufgaben im localStorage speichern
            ladeAufgaben(); // Aufgaben neu laden
        }
    }

    // Formular zurücksetzen und Button wieder auf "Aufgabe hinzufügen" setzen
    formular.reset();
    const hinzufuegenButton = document.getElementById("hinzufuegenButton") as HTMLButtonElement;
    hinzufuegenButton.textContent = "Aufgabe hinzufügen";
    aktuellBearbeiteteAufgabeId = null; // Bearbeitete Aufgabe zurücksetzen
});

// Initiales Laden der Aufgaben
ladeAufgabenAusStorage();
ladeAufgaben();



