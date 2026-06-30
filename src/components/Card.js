export default function Card({ image }) {
  const tiltSettings = {
    max: 25,
    perspective: 1000,
    scale: 1.05,
    foilShift: 35,
  }

  function cardMouseEnter(event) {
    setTransition(event.currentTarget)
    if (event.currentTarget === collWrapper) setTransition(foilOverlay)
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

    if (card === collWrapper) {
      const foilX = 20 - rotateX * (tiltSettings.foilShift / 2)
      const foilY = 20 - rotateY * (tiltSettings.foilShift / 2)
      foilOverlay.style.objectPosition = `${foilX}% ${foilY}%`
    }
  }

  function cardMouseLeave(event) {
    setTransition(event.currentTarget)
    event.currentTarget.style.transform = `perspective(${tiltSettings.perspective}px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`

    if (event.currentTarget === collWrapper) {
      setTransition(foilOverlay)
      foilOverlay.style.transform = `translate3d(0, 0, 1px)`
      foilOverlay.style.objectPosition = "20% 20%"
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
    <div className="card-wrapper">
      <img className="foilOverlay" src="/foilOverlay.png" onMouseEnter={cardMouseEnter} onMouseMove={cardMouseMove} onMouseLeave={cardMouseLeave}/>
      <img className="cardImage" src={image} />
    </div>
  )
}
