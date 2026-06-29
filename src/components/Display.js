import { useEffect, useState } from "react";

export default function Display({card}) {
  const {img, backImg, name, flavor_name, type, artist, set, description, flavor_text, comment, condition, foil, full_art} = card
  const [showBack, setShowBack] = useState(false)

  useEffect(() => {
    setShowBack(false)
  }, [card])

  const displayImg = showBack ? backImg : img

  function handleSubmit(e) {
    e.preventDefault()
  }

  const MANA_CLASS_OVERRIDES = {
  T: "tap",
  Q: "untap",
  CHAOS: "chaos",
  E: "e",
  PW: "pw",
  TK: "tk",
}

function symbolToClass(sym) {
  if (MANA_CLASS_OVERRIDES[sym]) return MANA_CLASS_OVERRIDES[sym]
  return sym.toLowerCase().replace(/\//g, "")
}

function manaify(text) {
  if (!text) return ""

  const escaped = text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")

  return escaped.replace(/\{([A-Z0-9/]+)\}/g, (_, sym) => {
    const cls = symbolToClass(sym)
    return `<i class="ms ms-${cls} ms-cost ms-shadow"></i>`
  })
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
        {condition ? 
        <>
          <div><b>Condition: </b>{condition}</div>
          <div><b>Foil: </b>{foil ? "Yes" : "No"}</div>
          <div><b>Full Art: </b>{full_art ? "Yes" : "No"}</div>
          <div><b>Comment: </b>{comment ? comment : "None."}</div>
        </>
        : null}
        <hr></hr>
      </div>
    </div>
  )
}