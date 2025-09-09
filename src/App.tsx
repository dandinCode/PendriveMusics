import AppRoutes from "./routes"

export default function App() {
  return (
    <div className="p-6">
      <div className="text-center mb-4">
        <h1 className="fw-bold">🎵 Músicas do Pendrive</h1>
      </div>
      <AppRoutes />
    </div>
  )
}