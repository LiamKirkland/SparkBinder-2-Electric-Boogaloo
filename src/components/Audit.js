import Card from "./Card"

export default function Audit({ audit }) {
  const { action, card, id, new_state, timestamp} = audit
  
  const actionClass = (() => {
    if(action.toLowerCase().includes("added")) {
      return "add"
    } else if(action.toLowerCase().includes("updated")) {
      return "update"
    } else if(action.toLowerCase().includes("removed")) {
      return "delete"
    } else {
      return ""
    }
  })()

  const changes = (() => {
    if(actionClass === "update") {
      const updatedKeys = Object.keys(new_state).filter(key => new_state[key] !== card[key])
      
      return updatedKeys.map((key) => {
        return {
          att: key.split("_").map((word) => word[0].toUpperCase() + word.slice(1)).join(" "),
          update: `${card[key]} ---> ${new_state[key] !== "" ? new_state[key] : "None."}`,
        }
      })
    } else {
      return Object.keys(new_state).map((key) => {
        return {
          att: key.split("_").map((word) => word[0].toUpperCase() + word.slice(1)).join(" "),
          update: `${new_state[key] !== "" ? new_state[key] : "None."}`,
        }
      })
    }
  })()
  
  return (
    <div className={`auditDiv auditDiv--${actionClass}`}>
      <div>
        <Card image={card.img} isFoil={new_state.foil}/>
        <p>{card.flavor_name ?? card.name}</p>
      </div>
      <div>
        <p>{action}</p>
        <p>{timestamp}</p>
        {changes ? (
          <div className="auditChanges">
            {changes.map(change => (
              <p key={change.att}>{change.att}: {change.update}</p>
            ))}
          </div>
        ) : null}
      </div>
    </div>
  )
}