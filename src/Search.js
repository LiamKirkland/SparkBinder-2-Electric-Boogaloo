import { useState } from "react";
import { scryURL } from "./constraints";
import Result from "./components/Result";
import Display from "./components/Display";

const placeholderCard = {
  img : "/placeholder.jpg",
  backImg : "",
  name : "Search for a card!",
  type : "Card - Placeholder",
  artist : "Xiaojie Cat",
  set : "",
  description : "",
  flavor_text : "This card is very powerful, as you can tell from the image..."
}

function Search() {
  const [searchTerm, setSearchTerm] = useState("")
  const [cardResults, setCardResults] = useState([])
  const [selectedCard, setSelectedCard] = useState(placeholderCard)

  function handleSubmit(e) {
    e.preventDefault()

    fetch(`${scryURL}/search?q=${searchTerm.replace(/ /g, "+")}`)
    .then(res => res.json())
    .then(queryRes => {
      if (queryRes.status === 404) {
        alert(queryRes.details)
      } else {
        const cards = queryRes.data
        setCardResults([...cards.slice(0, 10)])
        setSelectedCard(placeholderCard)
      }
    })
  }
  console.log(cardResults)
  return (
    <div>
      <h1>SparkBinder 2: Electric Boogaloo</h1>
      <form onSubmit={handleSubmit}>
        <input name="searchTerm" type="text" onChange={e => setSearchTerm(e.target.value)} value={searchTerm} required></input>
        <input type="submit" value="Search"></input>
      </form>
      <ul>
        {cardResults.map(card => <Result card={card} key={card.id} onSetSelected={setSelectedCard}/>)}
      </ul>
      <hr></hr>
      <Display card={selectedCard}/>
    </div>
  );
}

export default Search;