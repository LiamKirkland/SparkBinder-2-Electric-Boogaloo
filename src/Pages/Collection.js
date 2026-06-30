import { useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import { collURL } from "../constraints";
import Result from "../components/Result";
import Display from "../components/Display";

export default function Collection() {
  const [collectionCards, setCollectionCards] = useState([])
  const [selectedCardId, setSelectedCardId] = useState()
  const selectedCard = collectionCards.find(card => card.id === selectedCardId) ?? collectionCards[0]

  useEffect(() => {
    fetch(collURL)
    .then(res => res.json())
    .then(data => {
      setCollectionCards(data)
      setSelectedCardId(data[0]?.id)
    })
  }, [])

  function handleClick(clickedCard) {
    setSelectedCardId(clickedCard.id)
  }

  if (collectionCards.length === 0) {
    return (
      <>
        <header>
          <NavBar />
        </header>
        <h1>Add cards to your collection to view them here!</h1>
      </>
    )
  }
  return (
    <>
      <header>
        <NavBar />
      </header>
      <div id="collPage">
        <Display card={selectedCard} onSetCollection={setCollectionCards}/>
        <ul id="collResults">
          {collectionCards.map(card => <Result card={card} key={card.id} onSetSelected={handleClick} />)}
        </ul>
      </div>
    </>
  )
}