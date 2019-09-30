// 程式碼寫在這裡!

let playerDeck = [];
let dealerDeck = [];
let playerPoints = 0;
let dealerPoints = 0;
let inGame = false;
let winner = 0;

$(document).ready(function() {//對牌桌初始化;
    initCards();
    initButtons();
})

function newGame() {//開新遊戲;
    resetGame(); //先清掉上一場遊戲;
    deck = shuffle(buildDeck());//做出牌組並洗牌;
    playerDeck.push(deal());//發給玩家一張牌;
    dealerDeck.push(deal());//發給莊家一張牌;
    playerDeck.push(deal());//再發給玩家一張牌;

    //開始遊戲;
    inGame = true;
    renderGameTable();//顯示牌組;
    
}

function deal() {
    return deck.shift();
}

function initButtons() {//初始化按鈕;
    // document.querySelector('#action-new-game').addEventListener('click', event => newGame());//準備發牌;
    $('#action-new-game').click(event => newGame()); //jQuery寫出同上功能;
    $('#action-hit').click(event =>{//拿一張牌;
        event.preventDefault();
        playerDeck.push(deal());//把牌加進玩家牌組;
        renderGameTable();
    });
    $('#action-stand').click(event =>{//停止叫牌;
        event.preventDefault();
        dealerRound();
    });
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

function renderGameTable(){//生成雙方檯面上的牌組同時計算點數;
    playerDeck.forEach((card, i) => {//先生成玩家的牌組;
        let onDeck=$(`#yourCard${i+1}`); //因為i是0 ~ 4，實際上則為1 ~ 5
        onDeck.html(card.cardNumber());//秀出牌面;
        onDeck.prev().html(card.cardSuit());//秀出花色;
    });
    dealerDeck.forEach((card, i) => {//再生成莊家的牌組;
        let onDeck=$(`#dealerCard${i+1}`); //因為i是0 ~ 4，實際上則為1 ~ 5
        onDeck.html(card.cardNumber());//秀出牌面;
        onDeck.prev().html(card.cardSuit());//秀出花色;
    });
    //計算點數;
    playerPoints = calcPoints(playerDeck);
    dealerPoints = calcPoints(dealerDeck);

    //遊戲結束;
    if (playerPoints >= 21 || dealerPoints >= 21){
        inGame = false; //遊戲結束
    }

    //秀點數;
    $('.your-cards h1').html(`你 ${playerPoints}點`);
    $('.dealer-cards h1').html(`莊家 ${dealerPoints}點`);

    //按鈕要打開才能玩;
    // if(inGame){
    //     $('#action-hit').attr('disabled',false);
    //     $('#action-stand').attr('disabled',false);
    // } else {
    //     $('#action-hit').attr('disabled',true);
    //     $('#action-stand').attr('disabled',true);
    // }
    $('#action-hit').attr('disabled', !inGame);
    $('#action-stand').attr('disabled', !inGame);
}

function resetGame(){//清掉上一場遊戲;
    deck=[];
    playerDeck = [];
    dealerDeck = [];
    playerPoints = 0;
    dealerPoints = 0;
}

function calcPoints(deck){//計算牌組的總點數;
    let points = 0;
    deck.forEach((card, i) => {
        points += card.cardPoint();
    });

    //計算A出現時可做1點或11點
    if(points > 21){
        deck.forEach(card => {
            if(card.cardNumber() === 'A'){
                points -= 10; //A原本設為11點，讓他直接變成1點
            }
        })
    }
    return points;
}

function dealerRound(){//如果stand之後停止叫牌，莊家根據手上點數叫牌;
    while(true){
        dealerPoints = calcPoints(dealerDeck);
        playerPoints = calcPoints(playerDeck);
        if ((dealerPoints < playerPoints)  && (playerPoints <= 21)){
            dealerDeck.push(deal());
        } else {
            break;
        }
    }
    inGame = false;
    renderGameTable();
}

class Card {//牌有花色跟數字;
    constructor(suit, number){
        this.suit = suit;
        this.number = number;   
    }

cardNumber(){
    switch (this.number){
        case 1: 
            return 'A';
        case 11:
            return 'J';
        case 12:
            return 'Q';
        case 13:
            return 'K';
        default:
            return this.number;
    }
}

cardPoint(){//可以叫出牌的代表數值 in blackjack;
    switch(this.number){
        case 1: 
            return 11;
        case 11: 
        case 12:
        case 13: 
            return 10;
        default:
            return this.number;
    }
}

cardSuit(){//可以叫出牌的花色;
    switch(this.suit){
        case 1:
            return '♠';
        case 2:
            return '♥';
        case 3:
            return '♦';
        case 4:
            return '♣';
    }
}


}
