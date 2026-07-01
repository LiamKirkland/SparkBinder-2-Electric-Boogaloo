import { useRef } from "react"

const tiltSettings = {
  max: 20,
  perspective: 1000,
  scale: 1.03,
  foilShift: 40,
}

export default function Card({ image, isFoil }) {
  const cardRef = useRef(null)
  const foilRef = useRef(null)

  function cardMouseEnter(event) {
    setTransition(event.currentTarget)
    if (isFoil) setTransition(foilRef.current)
  }

  function cardMouseMove(event) {
    const card = event.currentTarget
    const rect = card.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    const mouseX = event.clientX - centerX
    const mouseY = event.clientY - centerY
    const rotateX = mouseY / (rect.height / 2).toFixed(2)
    const rotateY = mouseX / (rect.width / 2).toFixed(2)

    card.style.transform = `perspective(${tiltSettings.perspective}px) rotateX(${tiltSettings.max * rotateX}deg) rotateY(${-tiltSettings.max * rotateY}deg) scale3d(${tiltSettings.scale}, ${tiltSettings.scale}, ${tiltSettings.scale})`

    if (isFoil && foilRef.current) {
      const foilX = 20 - rotateX * (tiltSettings.foilShift / 2)
      const foilY = 20 - rotateY * (tiltSettings.foilShift / 2)
      foilRef.current.style.backgroundPosition = `${foilX}% ${foilY}%`
    }
  }

  function cardMouseLeave(event) {
    setTransition(event.currentTarget)
    event.currentTarget.style.transform = `perspective(${tiltSettings.perspective}px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`

    if (isFoil && foilRef.current) {
      setTransition(foilRef.current)
      foilRef.current.style.transform = `translate3d(0, 0, 1px)`
      foilRef.current.style.backgroundPosition = "20% 20%"
    }
  }

  function setTransition(card) {
    card.style.transition =
      "transform 300ms cubic-bezier(0.03, 0.98, 0.52, 0.99)," +
      "object-position 300ms cubic-bezier(0.03, 0.98, 0.52, 0.99)"
    setTimeout(() => {
      card.style.transition = ""
    }, 300)
  }

  return (
    <div
      className="card-wrapper"
      ref={cardRef}
      onMouseEnter={cardMouseEnter}
      onMouseMove={cardMouseMove}
      onMouseLeave={cardMouseLeave} >
      {isFoil && <div className="foilOverlay" ref={foilRef} />}
      <img className="cardImage" src={image} />
    </div>
  )
}
