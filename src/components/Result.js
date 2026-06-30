import Card from "./Card"

export default function Result({card, onSetSelected}) {
  const clickedCard = (() => {
    if (card.img) {
      return {
        img: card.img,
        backImg: card.backImg,
        name: card.name,
        flavor_name: card.flavor_name,
        type: card.type,
        artist: card.artist,
        set: card.set,
        description: card.description,
        flavor_text: card.flavor_text,
        foil: card.foil,
        full_art: card.full_art,
        comment: card.comment,
        condition: card.condition,
        id: card.id
      }
    } else {
      const front = card.card_faces?.[0] ?? {}
      const back = card.card_faces?.[1] ?? {}

      const pick = (key) => card[key] ?? front[key]

      const rawOracle =
        card.oracle_text ??
        [front.oracle_text, back.oracle_text].filter(Boolean).join("\n// ")

      let oracleText = (rawOracle ?? "")
        .replace(/\n/g, ", ")
        .replace(/\.,/g, ".")

      return {
        img: (card.image_uris ?? front.image_uris).normal ?? "",
        backImg: back.image_uris?.normal ?? "",
        name: card.name,
        flavor_name: card.flavor_name,
        type: pick("type_line"),
        artist: pick("artist"),
        set: card.set_name,
        description: oracleText,
        flavor_text: pick("flavor_text") ?? "",
      }
    }
  })()
  
  function handleClick() {
    onSetSelected(clickedCard)
  }

  return (
    <li onClick={handleClick}>
      <Card image={clickedCard.img} />
      <div>{clickedCard.flavor_name && clickedCard.flavor_name !== clickedCard.name ? clickedCard.flavor_name : clickedCard.name}</div>
    </li>
  )
}