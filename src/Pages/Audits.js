import NavBar from "../components/NavBar"
import { auditURL } from "../constants"
import Audit from "../components/Audit"
import { useEffect, useState } from "react"

export default function Audits() {
  const [auditList, setAuditList] = useState([])
  const [sort, setSort] = useState("Newest")
  const [actionFilter, setFilter] = useState({
    added: true,
    updated: true,
    removed: true
  })
  
  useEffect(() => {
    fetch(auditURL)
      .then((res) => res.json())
      .then(setAuditList)
      .catch(console.error)
  }, [])

  function handleChange(e) {
    const {name, checked} = e.target
    setFilter(prev => {
      return {
        ...prev,
        [name]: checked
      }
    }) 
  }

  const auditsToDisplay = (() => {
    const activeFilters = Object.keys(actionFilter).filter(key => actionFilter[key] === true)
    const filteredAudits = auditList.filter(audit => activeFilters.some(key => audit.action.toLowerCase().includes(key)))

    return filteredAudits.toSorted((a, b) => {
      const dateA = new Date(a.timestamp)
      const dateB = new Date(b.timestamp)

      return sort === "Newest" ? dateB - dateA : dateA - dateB
    })
  })()

  return (
    <>
      <header>
        <NavBar />
      </header>
      <hr></hr>
      <div id="auditsPage">
        <h1>Collection History</h1>
        <div id="auditsFilter">
          <button onClick={() => sort === "Newest" ? setSort("Oldest") : setSort("Newest")}>Sorted by: {sort}</button>
          <div>
            <span><b>Audit Types: </b></span>
            <input type="checkbox" name="added" id="filterAdd" checked={actionFilter.added} onChange={handleChange}></input>
            <label htmlFor="filterAdd">Card Added</label>
            <input type="checkbox" name="updated" id="filterUpdate" checked={actionFilter.updated} onChange={handleChange}></input>
            <label htmlFor="filterUpdate">Card Updated</label>
            <input type="checkbox" name="removed" id="filterDelete" checked={actionFilter.removed} onChange={handleChange}></input>
            <label htmlFor="filterDelete">Card Removed</label>
          </div>
        </div>
        {auditsToDisplay.map(audit => <Audit audit={audit} key={audit.id}/>)}
      </div>
    </>
  )
}