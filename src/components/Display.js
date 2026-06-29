import { useEffect, useState } from "react";

export default function Display({card}) {
  const {img, backImg, name, flavor_name, type, artist, set, description, flavor_text} = card
  const [showBack, setShowBack] = useState(false)

  useEffect(() => {
    setShowBack(false)
  }, [card])

  const displayImg = showBack ? backImg : img

  function handleSubmit(e) {
    e.preventDefault()
  }
  return (
    <div id="displayDiv">
      <div>
        <img src={displayImg}/>
        {backImg ? <button onClick={() => setShowBack(prev => !prev)}>Flip Card</button> : null}
      </div>
      <div>
        <div><b>{flavor_name && flavor_name !== name ? `${flavor_name} (${name})` : name}</b></div>
        <hr></hr>
        <div><b>Type: </b>{type}</div>
        <div><b>Artist: </b>{artist}</div>
        <div><b>Set: </b>{set ? set : "None."}</div>
        <div><b>Description: </b>{description ? description : "None."}</div>
        <div><b>Flavor Text: </b>{flavor_text ? flavor_text : "None."}</div>
        <hr></hr>
      </div>
    </div>
  )
}