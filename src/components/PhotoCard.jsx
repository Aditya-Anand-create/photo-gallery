// One photo card: the image, the author name, and the heart button.
function PhotoCard({ photo, isFavourite, onToggleFavourite }) {
  return (
    <div className="rounded-lg bg-white shadow-md overflow-hidden">
      <img
        src={`https://picsum.photos/id/${photo.id}/400/300`}
        alt={`Taken by ${photo.author}`}
        className="h-48 w-full object-cover"
        loading="lazy"
      />
      <div className="flex items-center justify-between p-3">
        <p className="text-sm font-medium text-gray-800 truncate">
          {photo.author}
        </p>
        <button
          onClick={() => onToggleFavourite(photo.id)}
          aria-label={isFavourite ? 'Remove from favourites' : 'Mark as favourite'}
          className="text-2xl leading-none"
        >
          {isFavourite ? '❤️' : '🤍'}
        </button>
      </div>
    </div>
  )
}

export default PhotoCard
