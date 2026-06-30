export default function Audit({ audit }) {
  const { action, card, id, new_state, timestamp} = audit

  const changes = (() => {
    if (new_state) {
      const updatedKeys = Object.keys(new_state).filter(key => new_state[key] !== card[key])
      
      return updatedKeys.map((key) => {
        return {
          att: key[0].toUpperCase() + key.slice(1),
          update: `${card[key]} ---> ${new_state[key]}`,
        }
      })
    }
  })()

  console.log(changes)
  return (
    <div className="auditDiv">
      <div>
        <img src={card.img}/>
        <p>{card.flavor_name ?? card.name}</p>
      </div>
      <div>
        <p>{action}</p>
        <p>{timestamp}</p>
        {changes ? changes.map(change => {
          return (
            <p>{change.att}: {change.update}</p>
          )
        }) : null}
      </div>
    </div>
  )
}