const game = document.getElementById('game');
const scoreDisplay = document.getElementById('score');
let score= 0;
const genres = [
    {
        name: 'Film',
        id: 10
    },
    {
        name: 'Books',
        id: 11
    },
    {
        name: 'Music',
        id: 12
    },
    {
        name: 'Video games',
        id: 15
    }
];
const levels = ['easy','medium','hard'];
function addGenre(genre){
    const column = document.createElement('div');
    column.classList.add('genre-column');
    column.innerHTML = genre.name;
    game.append(column);

    levels.forEach(level=>{
        const card = document.createElement('div');
        card.classList.add('card');
        column.append(card);

        if(level==='easy')
        {
            card.innerHTML = 100;
        }
        if(level==='medium')
        {
            card.innerHTML = 200;
        }
        if(level==='hard')
        {
            card.innerHTML = 300;
        }
        fetch(`https://opentdb.com/api.php?amount=1&category=${genre.id}&difficulty=${level}&type=boolean`)
            .then(reponse =>reponse.json())
            .then(data => {   
                //not enough data get 10 items per difficulty level and get random
                //question using math.random() and passing it through instead of 
                console.log(data);
                card.setAttribute('data-question',data.results[0].question);
                card.setAttribute('data-answer',data.results[0].correct_answer);
                card.setAttribute('data-value',card.getInnerHTML());
            })
            .then(done => card.addEventListener('click',flipCard));
    });
}
genres.forEach(genre=>addGenre(genre))

function flipCard(){
    this.innerHTML = '';
    this.style.fontSize = '20px'
    const textDisplay = document.createElement('div');
    const trueButton = document.createElement('button');
    const falseButton = document.createElement('button');

    trueButton.innerHTML = 'True';
    falseButton.innerHTML = 'False';
    trueButton.classList.add('true-button');
    falseButton.classList.add('false-button');
    falseButton.addEventListener('click',getResult);
    trueButton.addEventListener('click',getResult);
    textDisplay.innerHTML = this.getAttribute('data-question');
    this.append(textDisplay,trueButton,falseButton);
    const allCards = Array.from(document.querySelectorAll('.card'));
    allCards.forEach(card => card.removeEventListener('click',flipCard));
}
function getResult()
{
    const allCards = Array.from(document.querySelectorAll('.card'));
    allCards.forEach(card => card.addEventListener('click',flipCard));

    const cardofButton = this.parentElement;
    if(cardofButton.getAttribute('data-answer')===this.innerHTML){
        // console.log('its a match!');
        score = score + parseInt(cardofButton.getAttribute('data-value'))
        scoreDisplay.innerHTML = score;
        cardofButton.classList.add('correct-answer');
        setTimeout(()=>{
            while(cardofButton.firstChild)
            {
                carofButton.removeChild(cardofButton.lastChild);
            }
            cardofButton.innerHTML = cardofButton.getAttribute('data-value'); 
        },100);
    }
    else{
        cardofButton.classList.add('wrong-answer');
        setTimeout(()=>{
            while(cardofButton.firstChild)
            {
                cardofButton.removeChild(cardofButton.lastChild)
            }
            cardofButton.innerHTML = 0;
        },100);
    }
    cardofButton.removeEventListener('click',flipCard);
}