import { NavLink } from "react-router-dom";

export default function NavBar() {
  return (
    <>
      <h1>SparkBinder 2: Electric Boogaloo</h1>
      <nav>
        <NavLink to="/">Search</NavLink>
        <NavLink to="/collection">Collection</NavLink>
      </nav>
    </>
  )
}