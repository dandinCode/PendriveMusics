import { useEffect, useState } from "react"
import PlaylistCard from "./PlaylistCard"

interface Playlist {
  name: string
  songs: string[]
}

export default function PlaylistGrid() {
  const [playlists, setPlaylists] = useState<Playlist[]>([])

  useEffect(() => {
    fetch("/playlists.json")
      .then((res) => res.json())
      .then((data) => setPlaylists(data))
      .catch(() => setPlaylists([]))
  }, [])

  if (playlists.length === 0) return <p>Carregando playlists...</p>

  return (
    <div className="container">
      <div className="row g-4">
        {playlists.map((playlist) => (
          <div key={playlist.name} className="col-12 col-sm-6 col-md-3">
            <PlaylistCard playlist={playlist} />
          </div>
        ))}
      </div>
    </div>
  )
}