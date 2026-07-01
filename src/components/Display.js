import { Children, useEffect, useState } from "react";
import { auditURL, collURL } from "../constants";
import Card from "./Card";

//This is used to convert the mana costs/card actions from card descriptions into icons to improve readibility. 
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
// Manaify ^



export default function Display({ card, children, onSetCollection, isFoil }) {
  const {img, backImg, name, flavor_name, type, artist, set, description, flavor_text, comment, condition, foil, full_art, id} = card
  const [showBack, setShowBack] = useState(false)
  const [editMode, setEditMode] = useState(false)
  const [formData, setFormData] = useState({comment, foil, full_art, condition})
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setShowBack(false)
    setEditMode(false)
    setFormData({comment, foil, full_art, condition})
  }, [card])
  
  const displayImg = showBack ? backImg : img

  function handleSave(e) {
    e.preventDefault()
    
    if(!Object.keys(formData).every((key) => card[key] === formData[key])) {
      setLoading(true)

      const request1 = fetch(`${collURL}/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })

      const request2 = fetch(auditURL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          timestamp: new Date().toLocaleString("en-US", {
            timeZone: "America/New_York",
          }),
          card: card,
          action: "Card Updated",
          new_state: formData,
        }),
      })

      Promise.all([request1, request2])
        .then(async ([res1]) => {
          const updatedCard = await res1.json()

          onSetCollection((prevColl) =>
            prevColl.map((card) => card.id === id ? updatedCard : card ),
          )
          setEditMode(false)
        })
        .catch(console.error)
        .finally(() => setLoading(false))
    } else {
      setEditMode(false)
    }
  }

  function handleCancel(e) {
    e.preventDefault()
    setFormData({comment, foil, full_art, condition})
    setEditMode(false)
  }

  function handleDelete() {
    if (window.confirm("Are you sure you want to delete this card from your collection? This action cannot be undone.")) {
      setLoading(true)

      const request1 = fetch(`${collURL}/${id}`, {method: 'DELETE'})
      const request2 = fetch(auditURL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          timestamp: new Date().toLocaleString("en-US", { timeZone: "America/New_York" }),
          card: card,
          action: "Card Removed from Collection",
          new_state: formData,
        }),
      })

      Promise.all([request1, request2]).then(async () => {
        onSetCollection(prevColl => prevColl.filter(card => card.id !== id))
      })
      .catch(console.error)
      .finally(() => setLoading(false))
    }
  }

  function handleChange(e) {
    const {name, value, checked} = e.target

    setFormData(prevData => {
      return {
        ...prevData,
        [name]: checked ?? value
      }
    })
  }
  
  const custAttributes = (() => {
    if (editMode) {
      return (
        <form id="updateForm">
          <div>
            <label><b>Condition: </b></label>
            <select name="condition" value={formData.condition} onChange={handleChange} required>
              <option value="">Select a Condition</option>
              <option value="Near Mint">Near Mint</option>
              <option value="Lightly Played">Lightly Played</option>
              <option value="Moderately Played">Moderately Played</option>
              <option value="Heavily Played">Heavily Played</option>
              <option value="Damaged">Damaged</option>
            </select>
          </div>
          <div>
            <label><b>Foil: </b></label>
            <input type="checkbox" name="foil" checked={formData.foil} onChange={handleChange}></input>
          </div>
          <div>
            <label><b>Full Art: </b></label>
            <input type="checkbox" name="full_art" checked={formData.full_art} onChange={handleChange}></input>
          </div>
          <div>
            <label><b>Comment: </b></label>
            <textarea placeholder="Add a comment..." name="comment" autoComplete="off" value={formData.comment} onChange={handleChange}></textarea>
          </div>
          <div>
            <button onClick={handleSave} disabled={loading}>Save</button>
            <button onClick={handleCancel} disabled={loading}>Cancel</button>
          </div>
        </form>
      )
    } else {
      return (
        <>
          <div><b>Condition: </b>{formData.condition}</div>
          <div><b>Foil: </b>{formData.foil ? "Yes" : "No"}</div>
          <div><b>Full Art: </b>{formData.full_art ? "Yes" : "No"}</div>
          <div><b>Comment: </b>{formData.comment ? formData.comment : "None."}</div>
          <div>
            <button onClick={() => setEditMode(true)} disabled={loading}>Update</button>
            <button onClick={handleDelete} disabled={loading}>Delete</button>
          </div>
        </>
      )
    }
  })()

  return (
    <div id="displayDiv">
      <div className="displayLeft">
        <Card image={displayImg} isFoil={formData.foil ?? isFoil}/>
        {backImg ? <button className="flipBtn" onClick={() => setShowBack(prev => !prev)}>Flip Card</button> : null}
      </div>
      <div className="displayRight">
        <div><b>{flavor_name && flavor_name !== name ? `${flavor_name} (${name})` : name}</b></div>
        <div><b>Type: </b>{type}</div>
        <div><b>Artist: </b>{artist}</div>
        <div><b>Set: </b>{set ? set : "None."}</div>
        <div><b>Description: </b>{description ? <span dangerouslySetInnerHTML={{ __html: manaify(description) }} /> : "None."}</div>
        <div><b>Flavor Text: </b>{flavor_text ? flavor_text : "None."}</div>
        {condition ? 
          custAttributes
        : null}
        {children}
      </div>
    </div>
  )
}