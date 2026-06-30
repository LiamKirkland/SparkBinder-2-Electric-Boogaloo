import { useState } from "react";
import { scryURL, collURL, auditURL } from "../constraints";
import Result from "../components/Result";
import Display from "../components/Display";
import NavBar from "../components/NavBar";

const placeholderCard = {
  img : "/placeholder.jpg",
  backImg : "",
  name : "Search for a card!",
  flavor_name: "",
  type : "Card - Placeholder",
  artist : "Xiaojie Cat",
  set : "",
  description : "",
  flavor_text : "This card is very powerful, as you can tell from the image..."
}

const blankFormState = {
  comment: "",
  foil: false,
  full_art: false,
  condition: ""
}

export default function Search() {
  const [searchTerm, setSearchTerm] = useState("")
  const [cardResults, setCardResults] = useState([])
  const [formData, setFormData] = useState(blankFormState)
  const [selectedCard, setSelectedCard] = useState(placeholderCard)

  function handleChange(e) {
    const {name, value, checked} = e.target

    setFormData(prevData => {
      return {
        ...prevData,
        [name]: checked ?? value
      }
    })
  }

  function handleClick(clickedCard) {
    setFormData(blankFormState)
    setSelectedCard(clickedCard)
  }

  function handleSearch(e) {
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

  function handleAddCard(e) {
    e.preventDefault()
    const postedCard = {
      ...selectedCard,
      ...formData,
    }
    
    if (selectedCard.img === "/placeholder.jpg") {
      setFormData(blankFormState)
      alert("Search for and select a card to add it to your collection!")
    } else {
      const request1 = fetch(collURL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(postedCard),
      })
      
      const request2 = fetch(auditURL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        timestamp: new Date().toLocaleString("en-US", { timeZone: "America/New_York" }),
        card: postedCard,
        action: "added",
        prior_state: null
      })
      })
      
      Promise.all([request1, request2])
      .then(async ([res1, res2]) => {
        const data1 = await res1.json()
        const data2 = await res2.json()

        console.log(data1, data2)
        setFormData(blankFormState)
      })
    }
  }
  
  return (
    <>
    <header>
      <NavBar />
    </header>
    <div>
      <form id="searchForm" onSubmit={handleSearch}>
        <input name="searchTerm" type="text" onChange={e => setSearchTerm(e.target.value)} value={searchTerm} required></input>
        <input type="submit" value="Search"></input>
      </form>
      <ul id="searchResults">
        {cardResults.map(card => <Result card={card} key={card.id} onSetSelected={handleClick}/>)}
      </ul>
      <hr></hr>
      <Display card={selectedCard}>
        <form id="addForm" onSubmit={handleAddCard}>
            <textarea placeholder="Add a comment..." name="comment" autoComplete="off" value={formData.comment} onChange={handleChange}></textarea>
            <div id="addFormOptions">
              <div>
                <label>Foil</label>
                <input type="checkbox" name="foil" checked={formData.foil} onChange={handleChange}></input>
              </div>
              <div>
                <label>Full Art</label>
                <input type="checkbox" name="full_art" checked={formData.full_art} onChange={handleChange}></input>
              </div>
              <div>
                <label>Condition</label>
                <select name="condition" value={formData.condition} onChange={handleChange} required>
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
        </Display>
    </div>
    </>
  );
}