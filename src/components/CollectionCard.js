export default function CollectionCard({card}) {
  return (
    <li>
      <img src={card.img} />
      <div>{card.flavor_name && card.flavor_name !== card.name ? card.flavor_name : card.name}</div>
    </li>
  )
}