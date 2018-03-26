/*-------------------------------------
    Variables
--------------------------------------*/
let deck = $('.deck');
let moves = $('.moves');
let ratingStars = $('.fa-star');
let restart = $('.restart');
let timer = $('.timer');
const cardsList = ['anchor', 'anchor', 'bicycle', 'bicycle', 'bolt', 'bolt', 'bomb', 'bomb', 'cube', 'cube', 'diamond', 'diamond', 'leaf', 'leaf', 'paper-plane-o', 'paper-plane-o'];
const cardCount = cardsList.length / 2;
let openedCards = [];
let match = 0;
let movesCount = 0;
let currentTimer;
let second = 0;
let firstClick = false;
const threeStars = 15, twoStars = 25;

/*-------------------------------------
    Functions
--------------------------------------*/
//Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
  let currentIndex = array.length, temporaryValue, randomIndex;

  while (0 !== currentIndex) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

//Function - Main game play
function gamePlay() {
  let cards = shuffle(cardsList);
  deck.empty();
  match = 0;
  movesCount = 0;
  moves.text('0');
  ratingStars.removeClass('fa-star-o').addClass('fa-star');

  //Creates the randomised deck
  for (let i = 0; i < cards.length; i++) {
    deck.append($('<li class="card"><i class="fa fa-' + cards[i] + '"></i></li>'))
  }

  cardListener();

  //Reset timer
  stopTimer(currentTimer);
  second = 0;
  timer.text(`${second}`)
};

//Function - Start timer
function startTimer() {
    timer.text(`${second}`);
    second += 1;
}

//Function - Stop timer
function stopTimer(timer) {
  if (timer) {
    clearInterval(timer);
  }
}

//Function - Star rating
function starRating(movesCount) {
  let rating = 3;
  if (movesCount > threeStars && movesCount <= twoStars) {
    reduceStar(2);
    rating = 2;
  } else if (movesCount > twoStars) {
    reduceStar(1);
    rating = 1;
  }
  return { score: rating };
};

//Function - Reduce star based on count
function reduceStar(starNumber) {
  ratingStars.eq(starNumber).removeClass('fa-star').addClass('fa-star-o');
}

//Function - End game modal
function endGame(movesCount, score) {
  stopTimer(currentTimer);

  swal({
    closeOnEsc: false,
    closeOnClickOutside: false,
    title: 'Congratulations! You Won!',
    text: 'With ' + movesCount + ' Moves and ' + score + ' Stars in ' + (second-1) + ' Seconds.\n Woooooo!',
    icon: 'success',
    buttons: {
      playAgain: {
        text: 'Play again!'
      }
    }
  }).then(function (isConfirm) {
    if (isConfirm) {
      firstClick = false;
      gamePlay();
    }
  })
}

//Function - Card listener
function cardListener() {

  //Click Event - Flip card
  deck.find('.card').bind('click', function () {

    //Current flipped card
    let currentCard = $(this);
    let card = currentCard.context.innerHTML;
    currentCard.addClass('open show');
    openedCards.push(card);

    //Start timer on first click
    if(firstClick === false && openedCards.length === 1) {
      startTimer();
      currentTimer = setInterval(startTimer, 1000);
      firstClick = true;
    }

    //Compare with opened card
    if (openedCards.length === 2) {
      if (card === openedCards[0]) {
        deck.find('.open').addClass('match animated rubberBand');
        setTimeout(function () {
          deck.find('.match').removeClass('open show');
        }, 400);
        match++;
      } else {
        deck.find('.open').addClass('notmatch animated wobble');
        setTimeout(function () {
          deck.find('.open').removeClass('open show notmatch animated wobble');
        }, 400);
      }
      openedCards = [];
      movesCount++;
      starRating(movesCount);
      moves.html(movesCount);
    }

    //End Game if all cards match
    if (cardCount === match) {
      starRating(movesCount);
      let score = starRating(movesCount).score;
      setTimeout(function () {
        endGame(movesCount, score);
      }, 500);
    }
  });
};

/*-------------------------------------
    Events
--------------------------------------*/
//Click Event - Restart game
restart.bind('click', function () {
  swal({
    closeOnEsc: false,
    closeOnClickOutside: false,
    title: 'Are you sure you  want to restart?',
    text: "Your progress will be lost!",
    icon: 'warning',
    dangerMode: true,
    buttons: true
  }).then(function (isConfirm) {
    if (isConfirm) {
      stopTimer(currentTimer);
      openedCards = [];
      firstClick = false;
      gamePlay();
    }
  })
});

/*-------------------------------------
    JS Call
--------------------------------------*/
gamePlay();
