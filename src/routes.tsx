import { Routes, Route } from "react-router-dom"
import PlaylistGrid from "./components/PlaylistGrid"
import PlaylistDetails from "./pages/PlaylistDetails"

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<PlaylistGrid />} />
      <Route path="/playlist/:name" element={<PlaylistDetails />} />
    </Routes>
  )
}
