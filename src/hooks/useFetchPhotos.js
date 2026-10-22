import { useState, useEffect } from 'react'

// Custom hook that owns everything about fetching the photo list.
// The Gallery component never calls fetch itself - it only reads
// the three values this hook returns.
export function useFetchPhotos() {
  const [photos, setPhotos] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    // cancelled stops a state update if the component unmounts mid-fetch
    let cancelled = false

    async function loadPhotos() {
      try {
        const response = await fetch('https://picsum.photos/v2/list?limit=30')
        if (!response.ok) {
          throw new Error('Request failed with status ' + response.status)
        }
        const data = await response.json()
        if (!cancelled) {
          setPhotos(data)
          setLoading(false)
        }
      } catch (err) {
        if (!cancelled) {
          setError(err.message)
          setLoading(false)
        }
      }
    }

    loadPhotos()

    return () => {
      cancelled = true
    }
  }, []) // empty array = run once when the component first mounts

  return { photos, loading, error }
}
