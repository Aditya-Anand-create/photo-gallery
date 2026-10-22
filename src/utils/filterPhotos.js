// Pure helper: given the fetched photos and the search text,
// return only the photos whose author name contains the text.
// Keeping it pure makes it trivial to test and to explain.
export function filterPhotosByAuthor(photos, query) {
  const text = query.trim().toLowerCase()
  if (text === '') return photos
  return photos.filter((photo) => photo.author.toLowerCase().includes(text))
}
