interface Aufgabe {
    id: number;
    titel: string;
    datum: string;
    uhrzeit: string;
    bearbeiter: string;
    kommentar: string;
    status: "nicht begonnen" | "in Bearbeitung" | "abgeschlossen";
}

// Array, das alle Aufgaben speichert
let aufgabenListe: Aufgabe[] = [];
let bearbeiteteAufgabeId: number | null = null;  // Variable zur Speicherung der bearbeiteten Aufgaben-ID

// Funktion, um die Aufgaben aus dem localStorage zu laden
function ladeAufgabenAusStorage(): void {
    const gespeicherteAufgaben = localStorage.getItem('aufgabenListe');
    if (gespeicherteAufgaben) {
        aufgabenListe = JSON.parse(gespeicherteAufgaben); // Aufgaben aus dem localStorage laden
    }
}

// Funktion, um die Aufgaben im localStorage zu speichern
function speichereAufgabenInStorage(): void {
    localStorage.setItem('aufgabenListe', JSON.stringify(aufgabenListe)); // Aufgaben im localStorage speichern
}

// Funktion, um eine Aufgabe zu speichern (Hinzufügen oder Bearbeiten)
function speichereAufgabe(titel: string, datum: string, uhrzeit: string, bearbeiter: string, kommentar: string): void {
    if (bearbeiteteAufgabeId !== null) {
        // Wenn eine Aufgabe bearbeitet wird, finden wir die Aufgabe anhand der ID und aktualisieren sie
        const aufgabe = aufgabenListe.find((aufgabe) => aufgabe.id === bearbeiteteAufgabeId);
        if (aufgabe) {
            aufgabe.titel = titel;
            aufgabe.datum = datum;
            aufgabe.uhrzeit = uhrzeit;
            aufgabe.bearbeiter = bearbeiter;
            aufgabe.kommentar = kommentar;
        }
        bearbeiteteAufgabeId = null;  // Rücksetzen der bearbeitetenAufgabeId nach dem Bearbeiten
    } else {
        // Wenn keine Aufgabe bearbeitet wird, erstellen wir eine neue Aufgabe
        const neueAufgabe: Aufgabe = {
            id: Date.now(), // Verwenden der aktuellen Zeit als eindeutige ID
            titel,
            datum,
            uhrzeit,
            bearbeiter,
            kommentar,
            status: "nicht begonnen" // Standardwert für den Status
        };
        aufgabenListe.push(neueAufgabe); // Neue Aufgabe zur Liste hinzufügen
    }

    speichereAufgabenInStorage();  // Aufgaben im localStorage speichern
    ladeAufgaben();  // Aufgaben neu laden
}

// Funktion, um alle Aufgaben anzuzeigen
function ladeAufgaben(): void {
    const aufgabenListeElement = document.getElementById("aufgabenListe")!;
    aufgabenListeElement.innerHTML = ''; // Liste leeren

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
                bearbeiteAufgabe(Number(id));
            }
        });
    });

    document.querySelectorAll(".loeschen").forEach((button) => {
        button.addEventListener("click", (event) => {
            const id = (event.target as HTMLElement).getAttribute("data-id");
            if (id) {
                loescheAufgabe(Number(id));
            }
        });
    });
}

// Funktion, um eine Aufgabe zu löschen
function loescheAufgabe(id: number): void {
    aufgabenListe = aufgabenListe.filter((aufgabe) => aufgabe.id !== id); // Aufgabe entfernen
    speichereAufgabenInStorage();  // Aufgaben im localStorage speichern
    ladeAufgaben();  // Aufgaben neu laden
}

// Funktion, um eine Aufgabe zu bearbeiten
function bearbeiteAufgabe(id: number): void {
    const aufgabe = aufgabenListe.find((aufgabe) => aufgabe.id === id);
    if (aufgabe) {
        // Setze die ID der Aufgabe, die bearbeitet wird
        bearbeiteteAufgabeId = id;

        // Fülle das Formular mit den bestehenden Werten der Aufgabe
        (document.getElementById("titel") as HTMLInputElement).value = aufgabe.titel;
        (document.getElementById("datum") as HTMLInputElement).value = aufgabe.datum;
        (document.getElementById("uhrzeit") as HTMLInputElement).value = aufgabe.uhrzeit;
        (document.getElementById("bearbeiter") as HTMLInputElement).value = aufgabe.bearbeiter;
        (document.getElementById("kommentar") as HTMLTextAreaElement).value = aufgabe.kommentar;

        // Ändere den Button-Text und die Funktion zum Speichern
        const hinzufuegenButton = document.getElementById("hinzufuegenButton") as HTMLButtonElement;
        hinzufuegenButton.textContent = "Speichern";  // Buttontext ändern auf "Speichern"
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

    speichereAufgabe(titel, datum, uhrzeit, bearbeiter, kommentar);  // Aufruf der richtigen Funktion

    formular.reset();  // Formular zurücksetzen, aber nur bei einer neuen Aufgabe
});

// Initiales Laden der Aufgaben
ladeAufgabenAusStorage();  // Aufgaben aus dem localStorage laden
ladeAufgaben();  // Aufgaben anzeigen





