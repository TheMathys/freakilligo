
// document.addEventListener('DOMContentLoaded', function() {
//     // Créer une nouvelle ligne entre #freakey-button et #freakey-link
//     const freakeyLine = new LeaderLine(
//         document.getElementById('freakey-button'),
//         LeaderLine.pointAnchor(document.getElementById('freakey-link'), {x: '50%', y: 0}),
//         {
//             color: 'white', 
//             size: 1, 
//             dash: {animation: true},
//             startPlug: 'behind',
//             endPlug: 'behind',
//             path: 'straight'
//         }
//     );

//     // Créer une nouvelle ligne entre #illego-button et #illego-link
//     const illegoLine = new LeaderLine(
//         document.getElementById('illego-button'),
//         LeaderLine.pointAnchor(document.getElementById('illego-link'), {x: 0, y: '50%'}),
//         {
//             color: 'white', 
//             size: 1,
//             dash: {animation: true},
//             startPlug: 'behind',
//             endPlug: 'behind',
//             path: 'straight'
//         }
//     );
    
//     // Fonction pour mettre à jour la position des lignes
//     function updateLines() {
//         freakeyLine.position();
//         illegoLine.position();
//     }
    
//     // Mettre à jour la position des lignes chaque fois que la fenêtre est redimensionnée
//     window.addEventListener('resize', updateLines);
//     window.addEventListener('load', updateLines);
// });

$(document).ready(function() {
    $('.bullet-button').click(function(e) {
        e.stopPropagation();
      
        var targetID = $(this).attr('target');
      
        if($(this).hasClass('active')) {
            // Si le bouton est déjà actif, retirez la classe 'active' et changez l'image
            $(this).removeClass('active');
            $('#' + targetID).removeClass('active');
            $(this).find('img').attr('src', './img/bullet-plain.png');
        } else {
            // Désactivez tous les autres boutons et liens, et changez toutes les images pour les boutons inactifs
            $('.bullet-button').removeClass('active').find('img').attr('src', './img/bullet-plain.png');
            $('.bullet-link').removeClass('active');
          
            // Activez le bouton cliqué et son lien, et changez l'image pour le bouton actif
            $(this).addClass('active');
            $('#' + targetID).addClass('active');
            $(this).find('img').attr('src', './img/bullet-dotted.png');
        }
    });

    $(document).click(function() {
        $('.bullet-button, .bullet-link').removeClass('active');
        $('.bullet-button').find('img').attr('src', './img/bullet-plain.png');
    });
});


// $(document).ready(function() {
//     $('.bullet-button').click(function(e) {
//         e.stopPropagation();
      
//         var targetID = $(this).attr('target');
//         var lineID = targetID.replace('link', 'line');
      
//         if($(this).hasClass('active')) {
//             $(this).removeClass('active');
//             $('#' + targetID).removeClass('active');
//             $('#' + lineID).removeClass('active');
//             $(this).find('img').attr('src', './img/bullet-plain.png');
//         } else {
//             $('.bullet-button, .bullet-link, .bullet-line').removeClass('active');
//             $('.bullet-button').find('img').attr('src', './img/bullet-plain.png');
          
//             $(this).addClass('active');
//             $('#' + targetID).addClass('active');
//             $('#' + lineID).addClass('active');
//             $(this).find('img').attr('src', './img/bullet-dotted.png');
//         }
//     });

//     $(document).click(function() {
//         $('.bullet-button, .bullet-link, .bullet-line').removeClass('active');
//         $('.bullet-button').find('img').attr('src', './img/bullet-plain.png');
//     });
// });
