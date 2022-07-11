let cardSeiya = {
    name: "Seiya de Pégaso",
    image: "assets/img/card_seiya.png",
    origin: "Os Cavaleiros do Zodiaco",
    attributes: {
        attack: 80,
        defense: 60,
        magic: 90
    }
}

let cardBulbasauro = {
    name: "Bulbasauro",
    image: "assets/img/card_bulbasaur.png",
    origin : "Pokémon",
    attributes: {
        attack: 70,
        defense: 65,
        magic: 85
    }
}

let cardDarth = {
    name: "Darth Vader",
    image: "assets/img/card_darthvader.png",
    origin : "Star Wars",
    attributes: {
        attack: 88,
        defense: 62,
        magic: 90
    }
}

let cardKirito = {
    name : "Kirito",
    image : "assets/img/card_kirito.png",
    origin : "Sword Art Online",
    attributes : {
        attack : 83,
        defense : 60,
        magic : 90
    }
}

let cardAang = {
    name : "Aang",
    image : "assets/img/card_aang.png",
    origin :"Avatar: A Lenda de Aang",
    attributes : {
        attack : 89,
        defense : 60,
        magic : 96
    }
}

let cardEdward = {
    name : "Edward Elric",
    image : "assets/img/card_edward.png",
    origin : "Fullmetal Alchemist",
    attributes : {
        attack : 79,
        defense : 62,
        magic : 95
    }
}

let cardBatman = {
    name : "Batman",
    image : "assets/img/card_batman.png",
    origin : "DC Comics",
    attributes : {
        attack : 90,
        defense : 70,
        magic : 0
    }
}

let cardCorvus = {
    name : "Corvus Glaive",
    image : "assets/img/card_corvus.png",
    origin : "Marvel Comics",
    attributes : {
        attack : 91,
        defense : 89,
        magic : 0
    }
}

let cardLevi = {
    name : "Levi Ackerman",
    image : "assets/img/card_levi.png",
    origin : "Shingeki No Kyojin",
    attributes : {
        attack : 95,
        defense : 65,
        magic : 0
    }
}

let cardHeimdall = {
    name : "Heimdall",
    image : "assets/img/card_heimdall.png" ,
    origin : "Marvel Comics",
    attributes : {
        attack : 95,
        defense : 95,
        magic : 0
    }
}

let machineCard;
let playerCard;
let cards = [cardSeiya, cardBulbasauro, cardDarth, cardKirito, cardAang, cardEdward, cardBatman, cardCorvus, cardLevi, cardHeimdall];
// 0          1           2            3           4            5           6           7           8           9           10

let playerPoints = 0;
let machinePoints = 0;
let round = 0;

readyPage();
updateScore();
updateNumberCards();
scoreboardNames();

function readyPage() {
    let overlays = Array.from(document.getElementsByClassName('overlay-text'));
    overlays.forEach(overlay => {
        overlay.addEventListener('click', () => {
            overlay.classList.remove('visible');
        });
    });
}

function updateScore() {
    let divScoreboard = document.getElementById('scoreboard');
    let html = playerPoints + "&nbsp;&nbsp;" + machinePoints ;
    divScoreboard.innerHTML = html;
}

function updateNumberCards() {
    let divNumberCards = document.getElementById('number-cards');
    let html = "Cartas restantes no jogo: " + cards.length;
    divNumberCards.innerHTML = html;
}

function scoreboardNames() {
    let divScoreboardNames = document.getElementById('scoreboard-names');
    let html = "JOGADOR" + "&nbsp;&nbsp;" + "MÁQUINA";
    divScoreboardNames.innerHTML = html;
}

function activatePlayButton() {
    document.getElementById('btnPlay').disabled = false;
}

function drawCard() {
    let playerCardNumber = parseInt(Math.random() * cards.length);
    playerCard = cards[playerCardNumber];
    cards.splice(playerCardNumber, 1);

    let machineCardNumber = parseInt(Math.random() * cards.length);
    machineCard = cards[machineCardNumber];
    cards.splice(machineCardNumber, 1);

    let divNumberRounds = document.getElementById('number-rounds');
    round++;
    let html = round;
    divNumberRounds.innerHTML = html;

    document.getElementById('btnDraw').disabled = true;
    document.getElementById('btnPlay').disabled = true;
    document.getElementById('btnBuffNerf').disabled = false;

    displayPlayerCard();
}

function displayPlayerCard() {
    let divPlayerCard = document.getElementById("player-card");
    let moldura = '<img src="assets/img/card-super-trunfo-transparent.png" class="molduraCard">';
    divPlayerCard.style.backgroundImage = `url(${playerCard.image})`;

    let name = `<p class="card-subtitle">${playerCard.name}</p>`;
    let origin = `<p class="player-card-origin">${playerCard.origin}</p>`;
    let textOptions = "";

    for (let attribute in playerCard.attributes) {
        textOptions += "<input type='radio' onclick='activatePlayButton()' name='attribute' value='" + attribute + "'>" + attribute + " " + playerCard.attributes[attribute] + "<br>";
    }
    let versus = '<img src="assets/img/versus-image.png" class="versus-image">';
    let html = "<div id='options' class='status-card'>";

    divPlayerCard.innerHTML = moldura + name + html + textOptions + origin +'</div>';

    document.getElementById("versus-image").innerHTML = versus;
}

function getSelectedAttribute() {
    let radioAttribute = document.getElementsByName('attribute');
    for (let i = 0; i < radioAttribute.length; i++) {
        if (radioAttribute[i].checked) {
            return radioAttribute[i].value;
        }
    }
}

function startGame() {
    let selectedAttribute = getSelectedAttribute();

    if(cards.length != 0){
        if (playerCard.attributes[selectedAttribute] > machineCard.attributes[selectedAttribute]) {
            document.getElementById('victory-text').classList.add('visible');
            playerPoints++;
        } else if (playerCard.attributes[selectedAttribute] < machineCard.attributes[selectedAttribute]) {
            document.getElementById('defeat-text').classList.add('visible');
            machinePoints++;
        }
        else {
            document.getElementById('tie-text').classList.add('visible');
        } 
    }

    if (cards.length == 0) {
        if (playerCard.attributes[selectedAttribute] > machineCard.attributes[selectedAttribute]) {
            playerPoints++;
        } else if (playerCard.attributes[selectedAttribute] < machineCard.attributes[selectedAttribute]) {
            machinePoints++;
        }
        if (playerPoints > machinePoints) {
            document.getElementById('game-win-text').classList.add('visible');
        } else if (machinePoints > playerPoints) {
            document.getElementById('game-over-text').classList.add('visible');
        } else {
            document.getElementById('game-tie-text').classList.add('visible');
        }
    } else {
        document.getElementById('btnNextround').disabled = false;
    }

    document.getElementById('btnPlay').disabled = true;
    document.getElementById('btnBuffNerf').disabled = true;

    updateScore();
    displayMachineCard();
    updateNumberCards();
}

function displayMachineCard() {
    let divMachineCard = document.getElementById("machine-card");
    let moldura = '<img src="assets/img/card-super-trunfo-transparent.png" class="molduraCard">';
    divMachineCard.style.backgroundImage = `url(${machineCard.image})`;
    
    let name = `<p class="card-subtitle">${machineCard.name}</p>`;
    let origin = `<p class="machine-card-origin">${machineCard.origin}</p>`;
    let textOptions = "";

    for (let attribute in machineCard.attributes) {
        textOptions += "<p type='text' name='attribute' class='--spacing-top' value='" + attribute + "'>" + attribute + " " + machineCard.attributes[attribute] + "<br>";
    }

    let html = "<div id='options' class='status-card --spacing'>";

    divMachineCard.innerHTML = moldura + name + html + textOptions + origin + "</div>";
}

function buffNerf() {
    let divResultBF = document.getElementById("result-buff-nerf");
    let ResultBF = parseInt(Math.random() * 10);
    let textBF = "";

    if (ResultBF % 2 == 0) {
        for (attribute in playerCard.attributes) {
            playerCard.attributes[attribute] += ResultBF;
            textBF += "<p type='text'>" + " + " + ResultBF  + " = " + playerCard.attributes[attribute] + "</br>";
        }
    }
    else{
        for(attribute in playerCard.attributes) {
            playerCard.attributes[attribute] -= ResultBF;
            textBF += "<p type='text'>" + " - " + ResultBF  + " = " + playerCard.attributes[attribute] + "</br>"; 
        }
    }

    html = textBF;
    divResultBF.innerHTML = html;

    document.getElementById('btnBuffNerf').disabled = true
}
function nextRound() {
    let divCards = document.getElementById('cards');

    divCards.innerHTML = `<div id="player-card" class="card"></div> <div id="versus-image" class="versus-cards">
    </div><div id="machine-card" class="card"></div> <div id="result-buff-nerf"></div>`;

    document.getElementById('btnDraw').disabled = false;
    document.getElementById('btnPlay').disabled = true;
    document.getElementById('btnNextround').disabled = true;
    document.getElementById('btnBuffNerf').disabled = true;

}