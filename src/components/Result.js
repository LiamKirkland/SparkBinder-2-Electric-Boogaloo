export default function Result({card, onSetSelected}) {
  const front = card.card_faces?.[0] ?? {}
  const back = card.card_faces?.[1] ?? {}

  const pick = (key) => card[key] ?? front[key]

  const rawOracle =
    card.oracle_text ??
    [front.oracle_text, back.oracle_text].filter(Boolean).join("\n// ")

  let oracleText = (rawOracle ?? "").replace(/\n/g, ", ").replace(/\.,/g, ".")

  function handleClick() {
    const clickedCard = {
      img: (card.image_uris ?? front.image_uris).normal ?? "",
      backImg: (card.image_uris ?? back.image_uris).normal ?? "",
      name: card.flavor_name && card.flavor_name !== card.name ? `${card.flavor_name} (${card.name})` : card.name,
      type: pick("type_line"),
      artist: "",
      set: "",
      description: oracleText,
      flavor_text: pick("flavor_text") ?? ""
    }

    onSetSelected(clickedCard)
  }

  return (
    <li onClick={handleClick}>
      <img src={(card.image_uris ?? front.image_uris).normal ?? ""} />
      <div>{card.flavor_name && card.flavor_name !== card.name ? card.flavor_name : card.name}</div>
    </li>
  )
}