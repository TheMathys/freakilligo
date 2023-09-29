
function draw(canvas) {
    const ctx = canvas.getContext("2d");
    const w = canvas.width;
    const h = canvas.height;
    
    // Récupérez la couleur depuis l'attribut data-color ou utilisez un défaut
    const color = "rgba(255, 255, 255, 0.8)";

    // Effacez le canvas
    ctx.clearRect(0, 0, w, h);
    
    // Remplissez le canvas avec la couleur choisie
    ctx.fillStyle = color;
    ctx.fillRect(0, 0, w, h);
    
    // Appliquez un flou au canvas
    const blur = Math.random() * 30 + 30; // Le flou sera toujours entre 70 et 100
    canvas.style.filter = `blur(${blur}px)`;
    
    // Changez l'opacité de manière aléatoire
    const opacity = Math.random() * 0.4 + 0.5; // L'opacité sera toujours entre 0.5 et 0.9
    canvas.style.opacity = opacity;
}

const canva1 = document.getElementById("canva1");
const illegos = ["illego1", "illego2", "illego3", "illego4"].map(id => document.getElementById(id));

setInterval(() => {
    draw(canva1); // Dessiner l'effet pour canva1
    const blur = Math.random() * 30 + 30; // Le flou pour les illegos
    const opacity = Math.random() * 0.4 + 0.5; // L'opacité pour les illegos
    
    // Dessiner le même effet pour tous les illegos
    illegos.forEach(canvas => {
        const ctx = canvas.getContext("2d");
        const w = canvas.width;
        const h = canvas.height;
        const color = "rgba(255, 255, 255, 0.)";
        
        ctx.clearRect(0, 0, w, h);
        ctx.fillStyle = color;
        ctx.fillRect(0, 0, w, h);
        
        canvas.style.filter = `blur(${blur}px)`;
        canvas.style.opacity = opacity;
    });
}, 100);




