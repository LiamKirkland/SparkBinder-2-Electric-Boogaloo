export default function Audit({ audit }) {
  const { action, card, id, new_state, timestamp} = audit

  const actionClass = action.toLowerCase().includes("added") ? "add"
    : action.toLowerCase().includes("updated") ? "update"
    : action.toLowerCase().includes("removed") ? "delete"
    : ""

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
        <img src={card.img}/>
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