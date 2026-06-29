import Collection from "./Collection";
import Search from "./Search";

export const routes = [
  {
    path: '/',
    element: <Search />
  },
  {
    path: '/collection',
    element: <Collection />
  }
]