import { useEffect, useState } from "react";
import NavBar from "./components/NavBar";
import { collURL } from "./constraints";
import CollectionCard from "./components/CollectionCard";

export default function Collection() {
  const [collectionCards, setCollectionCards] = useState([])

  useEffect(() => {
    fetch(collURL)
    .then(res => res.json())
    .then(setCollectionCards)
  }, [])

  return (
    <>
    <header>
      <NavBar />
    </header>
    <div>
      {collectionCards.length > 0 ? 
      <ul>
        {collectionCards.map(card => <CollectionCard card={card} key={card.id} />) }
      </ul>
      : <h1>Add cards to your collection to view them here!</h1>}
    </div>
    </>
  )
}