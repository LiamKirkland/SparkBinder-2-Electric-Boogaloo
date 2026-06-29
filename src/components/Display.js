import { useState } from "react";
import { collURL } from "../constraints";

export default function Display({card}) {
  const {img, backImg, name, type, artist, set, description, flavor_text} = card
  let displayImg = img

  function handleSubmit(e) {
    e.preventDefault()
  }
  return (
    <div id="displayDiv">
      <div>
        <img src={displayImg}/>
        {backImg ? <button onClick={() => {displayImg === img ? displayImg = (backImg) : displayImg = (img)}}>Flip Card</button> : null}
      </div>
      <div>
        <div><b>{name}</b></div>
        <hr></hr>
        <div><b>Type: </b>{type}</div>
        <div><b>Artist: </b>{artist}</div>
        <div><b>Set: </b>{set ? set : "None."}</div>
        <div><b>Description: </b>{description ? description : "None."}</div>
        <div><b>Flavor Text: </b>{flavor_text ? flavor_text : "None."}</div>
        <hr></hr>
        <form onSubmit={handleSubmit}>
          <textarea placeholder="Add a comment..." name="comment" autocomplete="off"></textarea>
          <div id="addFormOptions">
            <div>
              <label>Foil</label>
              <input type="checkbox"></input>
            </div>
            <div>
              <label>Full Art</label>
              <input type="checkbox"></input>
            </div>
            <div>
              <label>Condition</label>
              <select required>
                <option value="">Select a Condition</option>
                <option value="Near Mint">Near Mint</option>
                <option value="Lightly Played">Lightly Played</option>
                <option value="Moderately Played">Moderately Played</option>
                <option value="Heavily Played">Heavily Played</option>
                <option value="Damaged">Damaged</option>
              </select>
            </div>
          </div>
          <input type="submit" value="Add Card"></input>
        </form>
      </div>
    </div>
  )
}