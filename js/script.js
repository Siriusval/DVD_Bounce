window.addEventListener('load', function () {


  // *** VARIABLES GLOBALES  ***
  //canvas
  var canvas = document.getElementById("myCanvas");
  var ctx = canvas.getContext("2d");

  //element
  var element = {
    x: 0,
    y: 55,
    w: 300,
    h: 150,
    speedX: 2,
    speedY: 2,
    couleurActuelle: 0
  };

  //couleurs
  var couleurs = [
    {
      couleur: "blue",
      rgb: "rgb(0, 0, 255)",
    },
    {
      couleur: "red",
      rgb: "rgb(255, 0, 0)"
    },
    {
      couleur: "green",
      rgb: "rgb(0, 255, 0)"
    },
    {
      couleur: "yellow",
      rgb: "rgb(255, 255, 0)"
    },
    {
      couleur: "pink",
      rgb: "rgb(255, 0, 255)"
    },
    {
      couleur: "turquoise",
      rgb: "rgb(0, 255, 240)"
    }
  ];


  var CANVAS_WIDTH ;
  var CANVAS_HEIGHT;
  var posMaxY ;
  var posMaxX ;

  var largeur ;
  var ratio;
  var imagePath ;



  // *** FONCTIONS ***
  //Changer la taille du canvas
  var init = function () {
    //Listener
    window.addEventListener('resize', resizeCanvas, false);

    ajouterImages();
    resizeCanvas();
    changeColor();
  }

  var ajouterImages = function () {
    for(var i = 0; i < couleurs.length ; i++) {
      couleurs[i].image = new Image();
      couleurs[i].image.src = "img/DVD-logo-"+couleurs[i].couleur+".png";
    }
    ratio = couleurs[0].image.width / couleurs[0].image.height;
  }

  //Changer la taille du canvas si la fenetre change
  var resizeCanvas = function () {
    //Recuperer taille fenetre
    CANVAS_WIDTH = window.innerWidth;
    CANVAS_HEIGHT = window.innerHeight;

    //Changer taille canvas
    ctx.canvas.width = CANVAS_WIDTH;
    ctx.canvas.height = CANVAS_HEIGHT;

    //Changer taille element
    largeur = CANVAS_WIDTH / 6;
    element.w = largeur;
    //element.h = largeur / 2;
    element.h = largeur / ratio;

    //Changer limites
    posMaxX = CANVAS_WIDTH - element.w;
    posMaxY = CANVAS_HEIGHT - element.h;

   }

  //Changer la couleur lors du rebond
  var changeColor = function () {
     //Regler le style
     element.couleurActuelle++;
     //Si la limite des couleurs est atteinte, reviens a la premiere
     if (element.couleurActuelle === couleurs.length) {
       element.couleurActuelle = 0;
     }
     ctx.fillStyle = couleurs[element.couleurActuelle].rgb;
     imagePath = couleurs[element.couleurActuelle].image;

   }

  //Boucle logique
  var update = function () {

    var limitTop = element.y < 0;
    var limitBot = element.y > posMaxY;

    var limitLeft = element.x < 0;
    var limitRight = element.x > posMaxX;


    //Si l'element depasse sur l axe X
    //A gauche
    if (limitLeft) {
      element.x = 0;
      element.speedX *= -1;
    }
    //A droite
    else if (limitRight) {
      element.x = posMaxX;
      element.speedX *= -1;
    }

    //Si l'element depasse sur l axe Y
    //En haut
    if (limitTop) {
      element.y = 0;
      element.speedY *= -1;
    }
    //En bas
    else if (limitBot) {
      element.y = posMaxY;
      element.speedY *= -1;
    }

    if (limitTop || limitBot ||limitLeft || limitRight) {
        changeColor();
    }

    //Changer la position de l'element en fonction de sa vitesse
    element.x += element.speedX;
    element.y += element.speedY;

  };

//Boucle de rendu
  var draw = function () {

    //Effacer
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    //Dessiner
    //ctx.fillRect(element.x, element.y, element.w, element.h);
    ctx.drawImage(imagePath,element.x, element.y, element.w, element.h);

  };

  //Boucle principale
  var step = function () {
    //Update logique
    update();
    //Rendu de l'application
    draw();
    //Repeter 60 fps
    window.requestAnimationFrame(step);
  };

  // *** MAIN ***
  init();
  step();
});
