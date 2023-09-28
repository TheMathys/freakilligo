document.addEventListener('DOMContentLoaded', function() {
    // Créer une nouvelle ligne entre #freakey-button et #freakey-link
    const freakeyLine = new LeaderLine(
        document.getElementById('freakey-button'),
        document.getElementById('freakey-link'),
        {
            color: 'white', 
            size: 1, 
            dash: {animation: true},
            startPlug: 'behind',
            endPlug: 'behind',
            path: 'straight'
        }
    );

    // Créer une nouvelle ligne entre #illego-button et #illego-link
    const illegoLine = new LeaderLine(
        document.getElementById('illego-button'),
        document.getElementById('illego-link'),
        {
            color: 'white', 
            size: 1,
            dash: {animation: true},
            startPlug: 'behind',
            endPlug: 'behind',
            path: 'straight'
        }
    );
    
    // // Fonction pour mettre à jour la position des lignes
    // function updateLines() {
    //     freakeyLine.position();
    //     illegoLine.position();
    // }
    
    // // Mettre à jour la position des lignes chaque fois que la fenêtre est redimensionnée
    // window.addEventListener('resize', updateLines);
    // window.addEventListener('load', updateLines);
});
