document.addEventListener('DOMContentLoaded', function() {
    // Créer une nouvelle ligne entre #freakey-button et #freakey-link
    const freakeyLine = new LeaderLine(
        document.getElementById('freakey-button'),
        LeaderLine.pointAnchor(document.getElementById('freakey-link'), {x: '50%', y: 0}),
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
        LeaderLine.pointAnchor(document.getElementById('illego-link'), {x: 0, y: '50%'}),
        {
            color: 'white', 
            size: 1,
            dash: {animation: true},
            startPlug: 'behind',
            endPlug: 'behind',
            path: 'straight'
        }
    );
    
    // Fonction pour mettre à jour la position des lignes
    function updateLines() {
        freakeyLine.position();
        illegoLine.position();
    }
    
    // Mettre à jour la position des lignes chaque fois que la fenêtre est redimensionnée
    window.addEventListener('resize', updateLines);
    window.addEventListener('load', updateLines);
});
