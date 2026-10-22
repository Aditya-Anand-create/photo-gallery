# Photo Gallery

A responsive photo gallery built with React (Vite) and Tailwind CSS.

## Features

- Fetches 30 photos from the [Picsum API](https://picsum.photos/v2/list?limit=30)
- Responsive grid: 4 columns on desktop, 2 on tablet, 1 on mobile
- Real-time search filter by author name
- Favourite any photo with the heart button - favourites are stored in localStorage and survive a page reload
- Loading spinner and error state while fetching

## Tech

- React 19 + Vite
- Tailwind CSS 3
- Custom hooks: `useFetchPhotos`, `useFavourites`
- `useReducer` for favourites state, `useCallback` + `useMemo` for performance
- Pure helper `filterPhotosByAuthor` (tested with `node --test`)

## Run it

```bash
npm install
npm run dev      # start the dev server
npm test         # run the logic tests
npm run build    # production build
```
