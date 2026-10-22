import { useState, useMemo, useCallback } from 'react'
import { useFetchPhotos } from '../hooks/useFetchPhotos'
import { useFavourites } from '../hooks/useFavourites'
import PhotoCard from './PhotoCard'
import { filterPhotosByAuthor } from '../utils/filterPhotos'

function Gallery() {
  // data fetching lives in the custom hook, favourites in the reducer hook
  const { photos, loading, error } = useFetchPhotos()
  const { favourites, toggleFavourite } = useFavourites()

  const [query, setQuery] = useState('')

  // useCallback: the same handler object is reused between renders,
  // so React does not create a new function on every keystroke re-render.
  const handleSearchChange = useCallback((event) => {
    setQuery(event.target.value)
  }, [])

  // useMemo: the filtered list is only re-computed when photos or query
  // actually change - not on every unrelated re-render (like a favourite
  // toggle). Filtering happens on data already fetched, no new API call.
  const filteredPhotos = useMemo(
    () => filterPhotosByAuthor(photos, query),
    [photos, query]
  )

  if (loading) {
    return (
      <div className="flex justify-center py-20">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-gray-300 border-t-blue-600"></div>
      </div>
    )
  }

  if (error) {
    return (
      <p className="py-20 text-center text-red-600">
        Could not load photos: {error}
      </p>
    )
  }

  return (
    <div>
      <input
        type="text"
        value={query}
        onChange={handleSearchChange}
        placeholder="Search by author name..."
        className="mb-6 w-full rounded-lg border border-gray-300 p-3 shadow-sm focus:border-blue-500 focus:outline-none"
      />

      {filteredPhotos.length === 0 ? (
        <p className="py-20 text-center text-gray-500">
          No photos match that author.
        </p>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {filteredPhotos.map((photo) => (
            <PhotoCard
              key={photo.id}
              photo={photo}
              isFavourite={favourites.includes(photo.id)}
              onToggleFavourite={toggleFavourite}
            />
          ))}
        </div>
      )}
    </div>
  )
}

export default Gallery
