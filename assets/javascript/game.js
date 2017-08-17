var wordList = ["ability", "active", "activity", "aggressive", "animals",
    "antagonistic", "anxious", "arrogance", "authentic", "backslapping", "bandanna",
    "barrage", "behavior", "blacksmith", "bloodthirsty", "boldness", "braggart", "brave",
    "britches", "bronco", "brutality", "buckaroo", "buckboard", "bully", "bunkhouse", "burr",
    "bushwhacker", "buzzards", "cahoots", "campfires", "cattle", "cavalry", "chaps", "cheat",
    "churlish", "civility", "commitment", "contemptible", "control", "cooperation", "corral",
    "courage", "courageous", "cowboy", "curt", "dadgumit", "decent", "dependable", "desolate",
    "determined", "don", "drought", "dude", "dust", "energetic", "epic", "equestrian",
    "excellence", "exhaustion", "experience", "failure", "faith", "faithful", "feud", "fever",
    "fisticuffs", "foothills", "fortitude", "fortune", "frenzy", "frontier", "frontiersman",
    "furor", "fury", "gait", "gallop", "gang", "gaucho", "gauntlet", "giddyup", "gold", "graze",
    "grit", "gullies", "gun", "gunfire", "gunslinger", "hardhearted", "hazardous", "herd",
    "heroes", "hitch", "hogtie", "holster", "horse", "horseshoes", "hostility", "howdy",
    "idealistic", "indians", "inevitable", "infamous", "infuriate", "intense", "invasion",
    "jail", "jealousy", "justice", "kinship", "lariat", "lasso", "lawman", "leather", "livery",
    "livestock", "longhorns", "marksmen", "maverick", "mercantile", "mount", "nefarious",
    "neigh", "nicker", "notorious", "nuisance", "obedient", "observant", "opinionated", "opportunist",
    "outlaw", "outrider", "packhorse", "peacemaker", "perceptive", "perilous", "perseverance",
    "persistence", "ponderosa", "ponies", "potential", "powerful", "pressure", "prideful",
    "priorities", "prospecting", "quarrelsome", "quest", "quick", "ranch", "ranchero", "ranching",
    "range", "rawhide", "reasonable", "rebellious", "reckless", "recognition", "remuda",
    "reputation", "resolute", "resourceful", "riata", "ricochet", "rodeo", "rowel", "rustlers",
    "ruthless", "saddlebags", "saloon", "salve", "savvy", "schemer", "sheriff", "skedaddle",
    "slaughter", "sober", "solemn", "solitary", "sorrow", "spurs", "stallion", "stampede",
    "staunchness", "stirrups", "stockade", "stray", "supplies", "surly", "suspicion", "tack",
    "talent", "tallow", "teamwork", "temperament", "tenacious", "tendency", "terrain", "territories",
    "threats", "thundering", "tombstone", "traditions", "treacherous", "treaty",
    "ultimate", "ultimatum", "uncharted", "uncivil", "uncouth", "unique", "unison", "unity",
    "unscrupulous", "valiant", "vamoose", "varmint", "vendetta", "vengeful", "venison", "vicious",
    "victim", "victorious", "victory", "victuals", "vigilant", "vile", "villainous", "visible",
    "vocal", "vulnerable", "vultures", "wary", "whinny", "whitewater", "widespread", "wild", "wrangler",
    "yearning", "yeehaw", "yokel", "yonder", "zealous"
];

var wordNumber = Math.floor(Math.random() * wordList.length);
var answer = wordList[wordNumber];
var hiddenAnswer = [];
var bullets = [];
var currentWord = document.getElementById("current-word");
var lastWord = document.getElementById("last-word");
var guesses = 12;
var wins = 0;
var winCount = document.getElementById("win-count");
var losses = 0;
var lossCount = document.getElementById("loss-count");
var guessed = [];
var lettersGuessed = document.getElementById("letters-guessed");
var image = document.getElementById("hangman-image");

var audiowin = new Audio('assets/images/NiceOne.mp3');
var audioloss = new Audio('assets/images/Happens.mp3');
var audioone = new Audio('assets/images/losing.mp3');
var audiostart = new Audio('assets/images/HighNoon.ogg');
var audioeasy = new Audio('assets/images/Easy.ogg');
var audiogun = new Audio('assets/images/gunshot.wav');
var audioding = new Audio('assets/images/ding.wav');

for (var i = 0; i < answer.length; i++) {
    hiddenAnswer.push("_");
}

audiostart.play();
currentWord.textContent = hiddenAnswer.join(" ");

//Hide all bulletholes and show all bullets (called when game restarts)
function clearBullets() {
    bullets = [];
    for (var i = 1; i < 13; i++) {
        var elem = document.getElementById("shot" + i);
        var elem2 = document.getElementById("bullet" + i);
        elem.style.display = 'none';
        elem2.style.display = 'inline';
    }
}

//Fill hiddenAnswer with underscores instead of letters
function initializeWord(x) {
    hiddenAnswer = [];
    for (var i = 0; i < x.length; i++) {
        hiddenAnswer.push("_");
    }
}

//Erase one bullet when a wrong letter is guessed
function removeBullet(x) {
    switch (x) {
        case 12:
            var elem = document.getElementById("bullet1");
            elem.style.display = 'none';
            break;
        case 11:
            var elem = document.getElementById("bullet2");
            elem.style.display = 'none';
            break;
        case 10:
            var elem = document.getElementById("bullet3");
            elem.style.display = 'none';
            break;
        case 9:
            var elem = document.getElementById("bullet4");
            elem.style.display = 'none';
            break;
        case 8:
            var elem = document.getElementById("bullet5");
            elem.style.display = 'none';
            break;
        case 7:
            var elem = document.getElementById("bullet6");
            elem.style.display = 'none';
            break;
        case 6:
            var elem = document.getElementById("bullet7");
            elem.style.display = 'none';
            break;
        case 5:
            var elem = document.getElementById("bullet8");
            elem.style.display = 'none';
            break;
        case 4:
            var elem = document.getElementById("bullet9");
            elem.style.display = 'none';
            break;
        case 3:
            var elem = document.getElementById("bullet10");
            elem.style.display = 'none';
            break;
        case 2:
            var elem = document.getElementById("bullet11");
            elem.style.display = 'none';
            break;
        case 1:
            var elem = document.getElementById("bullet12");
            elem.style.display = 'none';
            break;
    }
}

//Reset the gameboard when a player wins or loses
function resetGame() {
    clearBullets();
    lastWord.textContent = answer;
    guesses = 12;
    guessed = [];
    wordNumber = Math.floor(Math.random() * wordList.length);
    answer = wordList[wordNumber];
    initializeWord(answer);
    winCount.textContent = wins;
    lossCount.textContent = losses;
    lettersGuessed.textContent = guessed;
    currentWord.textContent = hiddenAnswer.join(" ");
    image.src = "assets/images/wrong0.png";
}

//Show a bullet hole and play sound. Called when incorrect letter is guessed
function shoot() {
    if (guesses != 0) {
    	audiogun.play();
    }

    var bulletNum = Math.floor(Math.random() * 12);

    while (bullets.indexOf(bulletNum) >= 0) {
        bulletNum = Math.floor(Math.random() * 12);
    }

    var position = Math.floor(Math.random() * 85);
    var position2 = Math.floor(Math.random() * 95);

    switch (bulletNum) {
        case 0:
            var elem = document.getElementById("shot1");
            elem.style.left = position + '%';
            elem.style.top = position2 + '%';
            elem.style.display = 'block';
            break;
        case 1:
            var elem = document.getElementById("shot2");
            elem.style.left = position + '%';
            elem.style.top = position2 + '%';
            elem.style.display = 'block';
            break;
        case 2:
            var elem = document.getElementById("shot3");
            elem.style.left = position + '%';
            elem.style.top = position2 + '%';
            elem.style.display = 'block';
            break;
        case 3:
            var elem = document.getElementById("shot4");
            elem.style.left = position + '%';
            elem.style.top = position2 + '%';
            elem.style.display = 'block';
            break;
        case 4:
            var elem = document.getElementById("shot5");
            elem.style.left = position + '%';
            elem.style.top = position2 + '%';
            elem.style.display = 'block';
            break;
        case 5:
            var elem = document.getElementById("shot6");
            elem.style.left = position + '%';
            elem.style.top = position2 + '%';
            elem.style.display = 'block';
            break;
        case 6:
            var elem = document.getElementById("shot7");
            elem.style.left = position + '%';
            elem.style.top = position2 + '%';
            elem.style.display = 'block';
            break;
        case 7:
            var elem = document.getElementById("shot8");
            elem.style.left = position + '%';
            elem.style.top = position2 + '%';
            elem.style.display = 'block';
            break;
        case 8:
            var elem = document.getElementById("shot9");
            elem.style.left = position + '%';
            elem.style.top = position2 + '%';
            elem.style.display = 'block';
            break;
        case 9:
            var elem = document.getElementById("shot10");
            elem.style.left = position + '%';
            elem.style.top = position2 + '%';
            elem.style.display = 'block';
            break;
        case 10:
            var elem = document.getElementById("shot11");
            elem.style.left = position + '%';
            elem.style.top = position2 + '%';
            elem.style.display = 'block';
            break;
        case 11:
            var elem = document.getElementById("shot12");
            elem.style.left = position + '%';
            elem.style.top = position2 + '%';
            elem.style.display = 'block';
            break;
    }
    bullets.push(bulletNum);
}

//Changes image as wrong letters are guessed
function updateImage(x) {
    switch (x) {
        case 0:
            image.src = "assets/images/wrong12.png";
            break;
        case 1:
            image.src = "assets/images/wrong11.png";
            break;
        case 2:
            image.src = "assets/images/wrong10.png";
            break;
        case 3:
            image.src = "assets/images/wrong9.png";
            break;
        case 4:
            image.src = "assets/images/wrong8.png";
            break;
        case 5:
            image.src = "assets/images/wrong7.png";
            break;
        case 6:
            image.src = "assets/images/wrong6.png";
            break;
        case 7:
            image.src = "assets/images/wrong5.png";
            break;
        case 8:
            image.src = "assets/images/wrong4.png";
            break;
        case 9:
            image.src = "assets/images/wrong3.png";
            break;
        case 10:
            image.src = "assets/images/wrong2.png";
            break;
        case 11:
            image.src = "assets/images/wrong1.png";
            break;
        case 12:
            image.src = "assets/images/wrong0.png";
            break;
    }
}

document.onkeyup = function(event) {
    var letter = event.key;
    var charCode = letter.charCodeAt(0);

    //Check if the guess is a letter
    if (charCode >= 97 && charCode <= 122) {

        //Game is over, player has lost
        if (guesses === 0) {
            losses++;
            resetGame();
        }

        //Word does not contain letter
        else if (answer.indexOf(letter) < 0 && guessed.indexOf(letter) < 0) {
            guessed.push(letter);
            removeBullet(guesses);
            guesses--;
            if (guesses === 0) {
                audioloss.play();
            } else if (guesses === 1) {
                audioone.play();
            }
            shoot();
        }

        //Word does contain letter
        else if (guessed.indexOf(letter) < 0) {
            guessed.push(letter);
            audioding.play();
            for (var i = 0; i < answer.length; i++) {
                if (answer[i] === letter) {
                    hiddenAnswer[i] = answer[i];
                }
            }
        }

        //Update all content
        lettersGuessed.textContent = guessed.join(" ");
        currentWord.textContent = hiddenAnswer.join(" ");
        updateImage(guesses);

        //Game is over, player has won
        if (hiddenAnswer.indexOf("_") < 0) {
            wins++;
            if (guesses === 12) {
                audioeasy.play();
            } else {
                audiowin.play();
            }
            resetGame();
        }
    }
}