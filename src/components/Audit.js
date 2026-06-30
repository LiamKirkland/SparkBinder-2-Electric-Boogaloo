export default function Audit({ audit }) {
  const { action, card, id, prior_state, timestamp} = audit
  return (
    <div>
      <div>
        <img src={card.img}/>
        <p>{card.flavor_name ?? card.name}</p>
      </div>
      <div>
        <p>Action</p>
        <p>Date-Time</p>
        <p>Attributes Changed</p>
      </div>
    </div>
  )
}