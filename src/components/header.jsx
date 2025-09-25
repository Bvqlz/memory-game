import '../styles/header.css';

//this is pulling the state up from App.jsx
//we do pull the state up becase we want to display the score in the header
//we also want to reset the score when the user clicks on a card they have already clicked on
//so we need to have the state in App.jsx so we can pass it down to the Card component
//and we can also pass it down to the Header component to display the score
function Header({score, highScore}) {
    return (
        <header>
            <div className='headerLeft-container'>
                <div className='header-title'>
                    <h1>Pokemon Memory Game</h1>
                </div>
                <h2>Click on a card once to earn points, but don't click on the same card twice!</h2>
            </div>

            <div className='headerRight-container'>
                <h2>Score: {score}</h2>
                <h2>High Score: {highScore}</h2>
            </div>
        </header>
    )
}

export default Header;