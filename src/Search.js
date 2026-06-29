import { useState } from "react";
import { scryURL, collURL, auditURL } from "./constraints";
import Result from "./components/Result";

function Search() {
  const [searchTerm, setSearchTerm] = useState("")
  const [cardResults, setCardResults] = useState([])

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
        {cardResults.map(card => <Result card={card} key={card.id}/>)}
      </ul>
    </div>
  );
}

export default Search;