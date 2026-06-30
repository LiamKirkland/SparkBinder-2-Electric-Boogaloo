export default function Card({image}) {
  return (
    <div>
      <img className="foilOverlay" src="/foilOverlay.png"/>
      <img className="cardImage" src={image}/>
    </div>
  )
}