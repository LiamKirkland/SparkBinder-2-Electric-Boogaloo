import { useEffect, useState } from "react";
import NavBar from "./components/NavBar";
import { collURL } from "./constraints";
import Result from "./components/Result";
import Display from "./components/Display";

export default function Collection() {
  const [collectionCards, setCollectionCards] = useState([])
  const [selectedCard, setSelectedCard] = useState()

  useEffect(() => {
    fetch(collURL)
    .then(res => res.json())
    .then(data => {
      setCollectionCards(data)
      setSelectedCard(data[0])
    })
  }, [])

  function handleClick(clickedCard) {
    setSelectedCard(clickedCard)
  }

  if(collectionCards.length === 0) {
    return <h1>Add cards to your collection to view them here!</h1>
  }
  
  return (
    <>
      <header>
        <NavBar />
      </header>
      <div>
        <Display card={selectedCard} />
        <ul>
          {collectionCards.map(card => <Result card={card} key={card.id} onSetSelected={handleClick} />)}
        </ul>
      </div>
    </>
  )
}