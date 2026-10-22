import { useReducer, useEffect } from 'react'

// The reducer decides how the favourites list changes for each action.
// It is a pure function: same (state, action) in, same new state out.
export function favouritesReducer(state, action) {
  switch (action.type) {
    case 'toggle':
      // already a favourite -> remove it, otherwise add it
      return state.includes(action.id)
        ? state.filter((favId) => favId !== action.id)
        : [...state, action.id]
    default:
      return state
  }
}

// Lazy initial value: read saved favourites from localStorage once,
// on the very first render, instead of on every render.
function readSavedFavourites() {
  try {
    const saved = localStorage.getItem('favourite-photos')
    return saved ? JSON.parse(saved) : []
  } catch {
    return []
  }
}

export function useFavourites() {
  const [favourites, dispatch] = useReducer(
    favouritesReducer,
    [],
    readSavedFavourites
  )

  // Every time the favourites list changes, save it so it survives a refresh.
  useEffect(() => {
    localStorage.setItem('favourite-photos', JSON.stringify(favourites))
  }, [favourites])

  const toggleFavourite = (id) => dispatch({ type: 'toggle', id })

  return { favourites, toggleFavourite }
}
