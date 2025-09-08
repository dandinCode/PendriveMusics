import { useEffect, useRef, useState } from "react"
import { useParams } from "react-router-dom"

interface Playlist {
  name: string
  songs: string[]
}

export default function PlaylistDetails() {
  const { name } = useParams<{ name: string }>()
  const [playlist, setPlaylist] = useState<Playlist | null>(null)
  const [currentSong, setCurrentSong] = useState<string | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isShuffle, setIsShuffle] = useState(false)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  useEffect(() => {
    fetch("/playlists.json")
      .then((res) => res.json())
      .then((data: Playlist[]) => {
        const found = data.find((pl) => pl.name === name)
        setPlaylist(found || null)
      })
      .catch(() => setPlaylist(null))
  }, [name])

  useEffect(() => {
    if (audioRef.current && isPlaying) {
      audioRef.current.play()
    } else if (audioRef.current) {
      audioRef.current.pause()
    }
  }, [isPlaying, currentSong])

  const handlePlaySong = (song: string) => {
    setCurrentSong(song)
    setIsPlaying(true)
  }

  const handlePlayPlaylist = (shuffle: boolean) => {
    if (!playlist || playlist.songs.length === 0) return
    const index = shuffle ? Math.floor(Math.random() * playlist.songs.length) : 0
    setIsShuffle(shuffle)
    setCurrentSong(playlist.songs[index])
    setIsPlaying(true)
  }

  const handleNext = () => {
    if (!playlist || !currentSong || playlist.songs.length === 0) return
    const currentIndex = playlist.songs.indexOf(currentSong)
    const nextIndex = isShuffle
      ? Math.floor(Math.random() * playlist.songs.length)
      : (currentIndex + 1) % playlist.songs.length
    setCurrentSong(playlist.songs[nextIndex])
  }

  const handlePrev = () => {
    if (!playlist || !currentSong || playlist.songs.length === 0) return
    const currentIndex = playlist.songs.indexOf(currentSong)
    const prevIndex = isShuffle
      ? Math.floor(Math.random() * playlist.songs.length)
      : (currentIndex - 1 + playlist.songs.length) % playlist.songs.length
    setCurrentSong(playlist.songs[prevIndex])
  }

  if (!playlist) return <p className="text-muted">Carregando playlist...</p>

  return (
    <div className="container mt-4">
      <h2 className="mb-3 text-capitalize">{playlist.name}</h2>

      <div className="mb-3">
        <button
          onClick={() => handlePlayPlaylist(false)}
          className="btn btn-primary btn-sm me-2"
        >
          ▶️ Reproduzir em sequência
        </button>
        <button
          onClick={() => handlePlayPlaylist(true)}
          className="btn btn-outline-primary btn-sm"
        >
          🔀 Aleatório
        </button>
      </div>

      <ul className="list-group">
        {playlist.songs.map((song) => (
          <li
            key={song}
            className="list-group-item d-flex justify-content-between align-items-center"
          >
            <span>{song.replace(/\.[^/.]+$/, "")}</span>
            <button
              onClick={() => handlePlaySong(song)}
              className="btn btn-sm btn-success"
            >
              ▶️
            </button>
          </li>
        ))}
      </ul>

      {currentSong && (
        <div className="mt-4">
          <h6 className="fw-bold">
            Tocando agora: <em>{currentSong.replace(/\.[^/.]+$/, "")}</em>
          </h6>
          <div className="mb-2">
            {!isShuffle && <button onClick={handlePrev} className="btn btn-secondary btn-sm me-2">
              ⏮️ Anterior
            </button>}
            <button onClick={handleNext} className="btn btn-info btn-sm me-2">
              ⏭️ Próxima
            </button>
          </div>
          <audio
            ref={audioRef}
            src={`/playlists/${playlist.name}/${currentSong}`}
            onEnded={handleNext}
            controls
            className="w-100 mt-2"
          />
        </div>
      )}
    </div>
  )
}