import { Link } from "react-router-dom"

interface Props {
  playlist: {
    name: string
    songs: string[]
  }
}

export default function PlaylistCard({ playlist }: Props) {
  return (
    <div
      className="card h-100 shadow-sm border-0 rounded-4 text-center text-white"
      style={{
        background: "linear-gradient(135deg, #667eea, #764ba2)",
      }}
    >
      <div className="card-body d-flex flex-column justify-content-between">
        <div>
          <h5 className="card-title text-capitalize">{playlist.name}</h5>
          <p className="card-text">{playlist.songs.length} músicas</p>
        </div>
        <Link
          to={`/playlist/${encodeURIComponent(playlist.name)}`}
          className="btn btn-light mt-3"
        >
          Ver músicas
        </Link>
      </div>
    </div>
  )
}
