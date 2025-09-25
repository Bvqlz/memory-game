import {useState, useEffect} from 'react'
import Card from './card'
import '../styles/cardGrid.css'

function CardGrid({onScoreUpdate, onScoreReset, currentScore}) {
    const [cards, setCards] = useState([]); //state to hold the cards

    //fetch only 12 pokemon from the pokeapi
    const API_KEY = 'https://pokeapi.co/api/v2/pokemon?limit=12';

    useEffect(() => {
        async function fetchPokemons() {
            const response = await fetch(API_KEY);
            const data = await response.json();
            //map the data to get an info about each pokemon
            const fetchedCards = data.results.map((pokemon, index) => {
                return {
                    id: index + 1,
                    name: pokemon.name,
                    image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${index + 1}.png`
                }
            })
            //pass this array to cards state
            setCards(fetchedCards);
        }
        //that was our definition above, now we call it in our useEffect
        fetchPokemons();
    }, []) //empty dependency array means this useEffect runs only once when the component mounts. This component mounts only once.

    const shuffleArray = (array) => {
        let shuffledArray = array.slice(); //slice creates a copy of the array to avoid mutating the original array. 
        for(let i = shuffledArray.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * shuffledArray.length); //since Math.random() generates a number between 0 and 1, we multiply it by the length of the array to get a number between 0 and length - 1
            [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]]; //destructuring assignment to swap the elements at index i and j
        }
        return shuffledArray;
    }

    const handleCardClick = (cardId) => {
        //we want to find the card that was clicked
        const clickedCard = cards.find(card => card.id === cardId);

        if(clickedCard.clicked) {
            //if already clicked we reset
            endStage();
        } else {
            //we make the card clicked and increase the score
            setCards(prevCards => {
                return prevCards.map(card => 
                    card.id === cardId ? {...card, clicked: true} : card
                )
            })
            onScoreUpdate(currentScore + 1);
            setCards(prevCards => shuffleArray(prevCards)); //shuffle the cards after each click
        }
    }

    const endStage = () => {
        setCards(prevCards => {
            return prevCards.map(card => ({...card, clicked: false}));
        })

        onScoreReset();
    }

    return ( 
        <div className='cardGrid-container'>
            {cards.map(card => {
                return <Card 
                    key={card.id}
                    id={card.id}
                    name={card.name}
                    image={card.image}
                    clicked={card.clicked}
                    onClick={handleCardClick}       
                />
            })}
        </div>
    )
}

export default CardGrid;