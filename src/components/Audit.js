import Card from "./Card"

const actionsToText = {
  created: "Card Added to Collection",
  updated: "Card Updated",
  deleted: "Card Removed from Collection"
}

export default function Audit({ audit }) {
  const { action, cardImg, cardName, foil, changes, timestamp} = audit

  const formattedChanges = Object.keys(changes).map(key => {
    const {old, new: newValue} = changes[key]
    const formattedKey = key.split("_").map((word) => word[0].toUpperCase() + word.slice(1)).join(" ")
    
    if(typeof old !== "undefined") {
      return `${formattedKey}: ${old === "" ? "None." : old} ---> ${newValue === "" ? "None." : newValue}`
    } else {
      return `${formattedKey}: ${newValue === "" ? "None." : newValue}`
    }
  })
  
  return (
    <div className={`auditDiv auditDiv--${action}`}>
      <div>
        <Card image={cardImg} isFoil={foil}/>
        <p>{cardName}</p>
      </div>
      <div>
        <p>{actionsToText[action]}</p>
        <p>{timestamp}</p>
        {changes ? (
          <div className="auditChanges">
            {formattedChanges.map(change => <p key={change}>{change}</p>)}
          </div>
        ) : null}
      </div>
    </div>
  )
}