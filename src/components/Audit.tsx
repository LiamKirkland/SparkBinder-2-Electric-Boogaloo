import Card from "./Card"

const actionsToText = {
  created: "Card Added to Collection",
  updated: "Card Updated",
  deleted: "Card Removed from Collection"
}

type AuditAction = "created" | "updated" | "deleted"

interface ChangeEntry {
  old?: string
  new: string
}

interface AuditProps {
  audit: {
    action: AuditAction
    cardImg: string
    cardName: string
    foil: boolean
    changes: Record<string, ChangeEntry> | null
    timestamp: string
  }
}

export default function Audit({ audit }: AuditProps) {
  const { action, cardImg, cardName, foil, changes, timestamp} = audit

  const formattedChanges = changes ?
    Object.keys(changes).map(key => {
      const {old, new: newValue} = changes[key]
      const formattedKey = key.split("_").map((word) => word[0].toUpperCase() + word.slice(1)).join(" ")
      
      if(typeof old !== "undefined") {
        return `${formattedKey}: ${old === "" ? "None." : old} ---> ${newValue === "" ? "None." : newValue}`
      } else {
        return `${formattedKey}: ${newValue === "" ? "None." : newValue}`
      }
    })
    : []
  
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