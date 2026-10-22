import Gallery from './components/Gallery'

function App() {
  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow-sm">
        <h1 className="mx-auto max-w-6xl px-4 py-4 text-2xl font-bold text-gray-900">
          Photo Gallery
        </h1>
      </header>
      <main className="mx-auto max-w-6xl px-4 py-6">
        <Gallery />
      </main>
    </div>
  )
}

export default App
