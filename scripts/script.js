// 程式碼寫在這裡!

let playerDeck = [];
let dealerDeck = [];

$(document).ready(function() {//對牌桌初始化;
    initCards();
    initButtons();
})

function newGame() {//開新遊戲;
    deck = shuffle(buildDeck());//做出牌組並洗牌;
    playerDeck.push(deal());//發給玩家一張牌;
    dealerDeck.push(deal());//發給莊家一張牌;
    playerDeck.push(deal());//再發給玩家一張牌;
}

function deal() {
    return deck.shift();
}

function initButtons() {//初始化按鈕(準備發牌);
    // document.querySelector('#action-new-game').addEventListener('click', event => newGame()); 
    $('#action-new-game').click(event => newGame()); //jQuery寫出同上功能;
}

function initCards() {//背後加個字;
    // let allCards=document.querySelectorAll('.card div');
    // allCards.forEach(card => {
    //     card.innerHTML = '㊎';
    // });
    $('.card div').html('㊎'); //跟上面有同樣功能，jQuery的方式;
}

function buildDeck() { //做出全部的牌
    let deck = [];
    for (let suit = 1; suit <= 4; suit++){
        for (let number = 1; number <= 13; number++){
            let c = new Card(suit, number);
            deck.push(c);
        }
    }
    return deck;
}

//shuffle cards
//https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;
  
    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
  
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
  
      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
  
    return array;
}

class Card {//牌有花色跟數字;
    constructor(suit, number){
        this.suit = suit;
        this.number = number;
    }
}