import '../styles/card.css'

function Card({id, name, image, onClick}) {
    const handleClick = () => {
       onClick(id);
    }

    return (
        <div className='card'
            onClick={handleClick}
            key={image}
        >
            <img src={image} alt={id} className='card-image'/>
            <span className='pokemon-name'>{name}</span> 
        </div>
    )
}

export default Card;