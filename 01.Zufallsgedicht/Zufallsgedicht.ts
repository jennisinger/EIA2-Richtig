namespace poem {
    
    const subjects: string[] = ["Harry", "Hermine", "Ron", "Hagrid", "Snape", "Dumbledore"];
    const predicates: string[] = ["braut", "liebt", "studiert", "hasst", "zaubert", "zerstört"];
    const objects: string[] = ["Zaubertränke", "den Grimm", "Lupin", "Hogwarts", "die Karte des Rumtreibers", "Dementoren"];

    
    function getVerse(_subjects: string[], _predicates: string[], _objects: string[]): string {
        let verse: string = "";

        
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
}
