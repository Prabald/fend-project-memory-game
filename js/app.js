/*
 * Create a list that holds all of your cards
 */

let cards=["fa fa-diamond","fa fa-paper-plane-o","fa fa-anchor","fa fa-bolt","fa fa-cube","fa fa-anchor","fa fa-leaf","fa fa-bicycle","fa fa-diamond","fa fa-bomb","fa fa-leaf",
"fa fa-bomb","fa fa-bolt","fa fa-bicycle","fa fa-paper-plane-o","fa fa-cube"];
cards=shuffle(cards);
let matched=0;
let matchCount=0;
let moveCount=0;
let openCards=[];
/*
 * To display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */
function createDeck(){
    let pack=document.createDocumentFragment();

        for(let j=0;j<=15;j++)
        {
            const li=document.createElement('li');
            
            li.className="card";
            const i=document.createElement('i');
            i.className=cards[j];
            li.appendChild(i);
            li.addEventListener("click",function(){
                
                if(check($(this))){
                    
                    if(openCards.length===0){
                        openCards.push($(this));
                        console.log(openCards);
                    }
                    else if(openCards.length===1){
                          openCards.push($(this));
                        if(isMatch($(this)))
                            {
                                 setTimeout(Match, 400);
                            }
                        else{
                                 setTimeout(closeCard, 700);
                            }
                    }
                    moveCount++;
                    $(this).addClass("open"); 
                    $(this).addClass("show");
                    updateMoveCount();
                   
                }
               
            });
            pack.appendChild(li);

        }
    document.querySelector(".deck").appendChild(pack);
}
//To check whether the current card is a match or not

var isMatch=function()
{
    const class1 =openCards[0].children().attr("class");
    const class2=openCards[1].children().attr("class");
    if(class1===class2){
        return true;
    }
    else{
        return false;
    }
    
}
//To add functionality to restart button
$(".restart").click(function(){resetGame();});
//To set the cards in matched state and to check if the user has won
function Match(){
      openCards[0].addClass("match");
      openCards[1].addClass("match");
      openCards=[];
      matched+=2;
        console.log(matched);
    
    if(hasWon())
        {
            console.log("Congrats! You won.");
            resetGame();
        }
}
//To reset the game
function resetGame(){
    $(".deck").empty();
    openCards=[];
    matched=0;
    moveCount=0;
    updateMoveCount();
    createDeck();
    
}
//
function updateMoveCount(){
    document.querySelector(".moves").innerHTML=moveCount;
}
var closeCard =function(){
     openCards.forEach(function(x) {
        x.toggleClass("open");
        x.toggleClass("show");
    });
    openCards=[];
}

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

/*Checks if the card is already open or matched*/
function check(card) 
{
  return !(card.hasClass("open") || card.hasClass("match"));
};

function hasWon(){
    if(matched===16)
        return true;
    else 
        return false;
}


/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
