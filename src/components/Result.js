export default function Result({card}) {
  const front = card.card_faces?.[0] ?? {}
  const back = card.card_faces?.[1] ?? {}

  return (
    <li>
      <img src={(card.image_uris ?? front.image_uris).normal ?? ""} />
      <div>{card.flavor_name && card.flavor_name !== card.name ? card.flavor_name : card.name}</div>
    </li>
  )
}