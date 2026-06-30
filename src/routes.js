import Collection from "./Pages/Collection";
import Search from "./Pages/Search";
import Audits from "./Pages/Audits";

export const routes = [
  {
    path: '/',
    element: <Search />
  },
  {
    path: '/collection',
    element: <Collection />
  },
  {
    path: '/audits',
    element: <Audits />
  }
]