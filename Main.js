var vinyl=document.getElementById("vinyl");
var ATotalCookie=document.getElementById("count");

var AMultiplicateur=document.getElementById('compteur_multiplicateur');
var AprixMultiplicateur=document.getElementById('prixMultiplicateur');

var AautoClick=document.getElementById('compteur_autoClick');
var AprixAutoClick=document.getElementById('prixAutoClick');

var GlowBorderMultiplier = document.getElementsByTagName('h3')[0];
var GlowBorderAutoClick = document.getElementsByTagName('h3')[1];
var GlowBorderBonus = document.getElementsByTagName('h3')[2];

var AtimeLeft = document.getElementById('timeLeft')

var angle=0;
setInterval(function(){
    vinyl.style.transform="rotateZ("+ angle++ +"deg)";
}, 10);



function afficherScore(){
    ATotalCookie.textContent=compteur;
}
function afficherMultiplicateur(){
    AMultiplicateur.textContent=multiplicateur;
}
function afficherPrixMultiplicateur(){
    AprixMultiplicateur.textContent = prixMultiplicateur;
}
function afficherAutoClick(){
    AautoClick.textContent=AutoClick;
}
function afficherPrixAutoClick(){
    AprixAutoClick.textContent = prixAutoClick;
}

/**********************SCORE****************** */
var compteur = 0;
function augmenterNombreCompteur() {
    compteur+=multiplicateur;
    afficherScore();
}

/********************MULTIPLICATEUR************ */

var multiplicateur = 1;
var prixParDefautMultiplicateur= 50;
var prixMultiplicateur = prixParDefautMultiplicateur;
function augmenterMultiplicateur(){
        /*******cout de l'augmentation******/

        if(compteur>=prixMultiplicateur){
            multiplicateur+=1;
            compteur = compteur-prixMultiplicateur;
            
            prixMultiplicateur =Math.pow(prixMultiplicateur,1.20);
            prixMultiplicateur = Math.ceil(prixMultiplicateur);

            afficherScore();
            afficherMultiplicateur();
            afficherPrixMultiplicateur();
        }
        else{
            alert("trop pauvre le prix est de "+prixMultiplicateur)
        }
}

/*********************AUTOCLICK******************** */
var AutoClick = 1;
var prixParDefautAutoClick= 70;
var prixAutoClick = prixParDefautAutoClick;
function augmenterAutoClick(){
        /*******cout de l'augmentation******/

        if(compteur>=prixAutoClick){
            AutoClick+=1;
            compteur = compteur - prixAutoClick;
            
            prixAutoClick =Math.pow(prixAutoClick,1.20);
            prixAutoClick = Math.ceil(prixAutoClick);

            afficherScore();
            afficherAutoClick();
            afficherPrixAutoClick();
            autoClick();
        }
        else{
            alert("trop pauvre le prix est de "+prixAutoClick)
        }
    }

function autoClick(){
    setInterval(function(){
        vinyl.click()
    },500)
}

/**********************BONUS***************************************/
var dcpt = 30;
function switchBonus(){
    GlowBorderBonus.style.animationName= 'flickerGreen';
    vinyl.onclick=bonusx4;
    
       if(typeof running === "undefined" || !running) {
            running = true;
            timer =setInterval( function timeLeft() {
                    if(dcpt>0){
                        --dcpt;
                        AtimeLeft.textContent=dcpt;
                        console.log(dcpt)

                    }
                    else{
                        running = false;
                        clearInterval(timer);

                        vinyl.onclick=augmenterNombreCompteur;
                        dcpt=30;
                        AtimeLeft.textContent=dcpt;
                        GlowBorderBonus.style.animationName= 'flickerYellow'

                    }
                },1000);
        }
    }


function bonusx4(){
    bonus = multiplicateur*4;
    compteur+=bonus;
    afficherScore();
    
}
function entierAleatoire(min, max)
{
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
var une_minutes= 60000;
var dix_minutes= 80000;

timeBetweenBonus = entierAleatoire(une_minutes, dix_minutes);
console.log(timeBetweenBonus/60000);

function miseEnAttente()
{
   setIntervalid = setInterval(switchBonus,timeBetweenBonus);   
}
miseEnAttente()





/************************CHANGEMENT COULEUR QUAND ISVALID*********** */
function CostIsValid(){
    if(compteur>=prixMultiplicateur){
        GlowBorderMultiplier.style.animationName ='flickerGreen'
    }
    else {
        GlowBorderMultiplier.style.animationName ='flickerBlue'
    }
    if(compteur>=prixAutoClick){
        GlowBorderAutoClick.style.animationName ='flickerGreen'
    }
    else {
        GlowBorderAutoClick.style.animationName ='flickerPurple'
    }
   
    setTimeout(CostIsValid,200)
}
CostIsValid();


