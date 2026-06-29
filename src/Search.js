import { useState } from "react";
import { scryURL } from "./constraints";
import Result from "./components/Result";
import Display from "./components/Display";
import NavBar from "./components/NavBar";

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

export default function Search() {
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
    <>
    <header>
      <NavBar />
    </header>
    <div>
      <form onSubmit={handleSubmit}>
        <input name="searchTerm" type="text" onChange={e => setSearchTerm(e.target.value)} value={searchTerm} required></input>
        <input type="submit" value="Search"></input>
      </form>
      <ul>
        {cardResults.map(card => <Result card={card} key={card.id} onSetSelected={setSelectedCard}/>)}
      </ul>
      <hr></hr>
      <Display card={selectedCard}/>
      <form onSubmit={handleSubmit}>
          <textarea placeholder="Add a comment..." name="comment" autocomplete="off"></textarea>
          <div id="addFormOptions">
            <div>
              <label>Foil</label>
              <input type="checkbox"></input>
            </div>
            <div>
              <label>Full Art</label>
              <input type="checkbox"></input>
            </div>
            <div>
              <label>Condition</label>
              <select required>
                <option value="">Select a Condition</option>
                <option value="Near Mint">Near Mint</option>
                <option value="Lightly Played">Lightly Played</option>
                <option value="Moderately Played">Moderately Played</option>
                <option value="Heavily Played">Heavily Played</option>
                <option value="Damaged">Damaged</option>
              </select>
            </div>
          </div>
          <input type="submit" value="Add Card"></input>
        </form>
    </div>
    </>
  );
}