import NavBar from "../components/NavBar"
import { auditURL } from "../constraints"
import Audit from "../components/Audit"
import { useEffect, useState } from "react"

export default function Audits() {
  const [auditList, setAuditList] = useState([])
  
  useEffect(() => {
    fetch(auditURL)
      .then((res) => res.json())
      .then(setAuditList)
  }, [])

  return (
    <>
      <header>
        <NavBar />
      </header>
      <hr></hr>
      <div id="auditsPage">
        <h1>This is the Audits Page</h1>
        {auditList.map(audit => <Audit audit={audit} key={audit.id}/>)}
      </div>
    </>
  )
}