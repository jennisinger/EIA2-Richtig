"use strict";
var poem;
(function (poem) {
    const subjects = ["Harry", "Hermine", "Ron", "Hagrid", "Snape", "Dumbledore"];
    const predicates = ["braut", "liebt", "studiert", "hasst", "zaubert", "zerstört"];
    const objects = ["Zaubertränke", "den Grimm", "Lupin", "Hogwarts", "die Karte des Rumtreibers", "Dementoren"];
    function getVerse(_subjects, _predicates, _objects) {
        let verse = "";
        const subjectIndex = Math.floor(Math.random() * _subjects.length);
        verse += _subjects.splice(subjectIndex, 1)[0] + " ";
        const predicateIndex = Math.floor(Math.random() * _predicates.length);
        verse += _predicates.splice(predicateIndex, 1)[0] + " ";
        const objectIndex = Math.floor(Math.random() * _objects.length);
        verse += _objects.splice(objectIndex, 1)[0];
        return verse;
    }
    for (let i = subjects.length; i > 0; i--) {
        const line = getVerse(subjects, predicates, objects);
        console.log(line);
    }
})(poem || (poem = {}));
//# sourceMappingURL=Zufallsgedicht.js.map