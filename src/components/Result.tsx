import Card from "./Card"

interface CardData {
  id: string
  img: string
  backImg?: string
  name: string
  flavor_name?: string
  type: string
  artist: string
  set?: string
  description?: string
  flavor_text?: string
  comment?: string
  condition: string
  foil: boolean
  full_art: boolean
}

interface ScryfallImageUris {
  normal: string
}

interface ScryfallCardFace {
  type_line?: string
  artist?: string
  oracle_text?: string
  flavor_text?: string
  image_uris?: ScryfallImageUris
}

interface ScryfallCard {
  img?: string
  backImg?: string
  name: string
  flavor_name?: string
  type: string
  artist: string
  set?: string
  description?: string
  flavor_text?: string
  comment?: string
  condition: string
  full_art: boolean
  id: string
  card_faces?: ScryfallCardFace[]
  oracle_text?: string
  image_uris?: ScryfallImageUris
  set_name?: string
  [key: string]: unknown
}

interface ResultProps {
  card: ScryfallCard
  isFoil: boolean
  foilForSelection?: boolean
  onSetSelected: (clickedCard: CardData) => void
}

export default function Result({ card, isFoil, foilForSelection, onSetSelected }: ResultProps) {
  const foilToAssign = foilForSelection ?? isFoil

  const clickedCard: CardData = (() => {
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
        foil: foilToAssign,
        full_art: card.full_art,
        comment: card.comment,
        condition: card.condition,
        id: card.id,
      }
    } else {
      const front = card.card_faces?.[0] ?? {}
      const back = card.card_faces?.[1] ?? {}

      const pick = (key: keyof ScryfallCardFace) => card[key] ?? front[key]

      const rawOracle =
        card.oracle_text ??
        [front.oracle_text, back.oracle_text].filter(Boolean).join("\n// ")

      const oracleText = (rawOracle ?? "")
        .replace(/\n/g, ", ")
        .replace(/\.,/g, ".")

      return {
        img: (card.image_uris ?? front.image_uris)?.normal ?? "",
        backImg: back.image_uris?.normal ?? "",
        name: card.name,
        flavor_name: card.flavor_name,
        type: (pick("type_line") as string) ?? "",
        artist: (pick("artist") as string) ?? "",
        set: card.set_name,
        description: oracleText,
        flavor_text: (pick("flavor_text") as string) ?? "",
        foil: foilToAssign,
        full_art: card.full_art,
        comment: card.comment,
        condition: card.condition,
        id: card.id,
      }
    }
  })()

  function handleClick() {
    onSetSelected(clickedCard)
  }

  return (
    <li onClick={handleClick} className="resultLi">
      <Card image={clickedCard.img} isFoil={isFoil} />
      <div>
        {clickedCard.flavor_name && clickedCard.flavor_name !== clickedCard.name
          ? clickedCard.flavor_name
          : clickedCard.name}
      </div>
    </li>
  )
}