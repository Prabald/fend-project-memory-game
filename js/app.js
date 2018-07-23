/*
 * Create a list that holds all of your cards
 */

var cards=["fa fa-diamond","fa fa-paper-plane-o","fa fa-anchor","fa fa-bolt","fa fa-cube","fa fa-anchor","fa fa-leaf","fa fa-bicycle","fa fa-diamond","fa fa-bomb","fa fa-leaf",
"fa fa-bomb","fa fa-bolt","fa fa-bicycle","fa fa-paper-plane-o","fa fa-cube"];
let matched=0;
let stars=3;
let matchCount=0;
let moveCount=0;
let openCards=[];

//To create deck
   let timer = new Timer();

//To create the deck and add event listeners to all the cards
function createDeck(){
    cards=shuffle(cards);   

    timer.addEventListener('secondsUpdated', function (e) {
    $('#basicUsage').html(timer.getTimeValues().toString());
});
    let pack=document.createDocumentFragment();
    
    resetStars();
     
    for(let j=0;j<=15;j++)
        {
            const li=document.createElement('li');
            
            li.className="card";
            const i=document.createElement('i');
            i.className=cards[j];
            li.appendChild(i);
            li.addEventListener("click",function(){
                if(moveCount===0){
                        timer.start();
                    }
                if(check($(this))){
                    
                    if(openCards.length===0){
                        start= new Date().getTime();
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

let isMatch=function()
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

//

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
            timer.stop();
            
            $(".deck").empty();
            let content="<h1 id='wintext'>Congrats! You win by<b> "+stars+" </b>stars<br> <b>"+moveCount+"</b> moves";
            content+="<br><button  onclick='resetGame()'>Restart</button>";
            content +="<br>Time Taken= "+  document.getElementById("basicUsage").innerHTML;
            $(".deck").append(content);
            
        }
}

//To reset the game
function resetGame(){
    $(".deck").empty();
    openCards=[];
    matched=0;
    moveCount=0;
    stars=3;
    updateMoveCount();
    createDeck();
    resetStars();

    timer.stop();
    $('#basicUsage').html(timer.getTimeValues().toString());

}
//To update the counter
function updateMoveCount(){
    document.querySelector(".moves").innerHTML=moveCount;
    if(moveCount===15||moveCount===20){
        console.log("Star reduced");
        removeStar();
        stars--;
    }
}
//To create the shaking effect

//To reduce a star
function removeStar()
{
 let starList = $(".fa-star");
    
    $(starList[starList.length-1]).toggleClass("fa-star fa-star-o");
    
}
//To close the opened card
let closeCard =function(){                            
    
    openCards.forEach(function(x) {
        x.toggleClass("open");
        x.toggleClass("show");
    });
    openCards=[];
}

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    let currentIndex = array.length, temporaryValue, randomIndex;

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
//To reset the stars
function resetStars(){
    $(".stars").empty();
    for (let i=0; i<3; i++){
        $(".stars").append(`<li><i class="fa fa-star"></i></li>`);
}
    stars=3;
}
//To check whether the user has won or not 
function hasWon(){
    if(matched===16)
        return true;
    else 
        return false;
}
