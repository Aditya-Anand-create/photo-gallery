# Video Walkthrough Prep (5 minutes)

The assignment requires a 5-minute screen recording where YOU explain the code.
This code was written with AI assistance, which the assignment explicitly allows.
Their one rule: you must be able to explain every line. If they ask whether you
used AI tools, say yes - that is allowed and expected. What they are testing is
whether you understand the code you submitted.

Work through this document and the code until every explanation below is
something you can say in your own words. Do not read this like a script.
If a line still does not make sense after studying it, ask before recording.

## Segment 1 - Show the app working

- Open the app, point at the loading spinner: "While the photos load, a spinner shows."
- When the grid appears: "It fetched 30 photos from the Picsum API and shows them in a grid - 4 columns on desktop, 2 on tablet, 1 on mobile."
- Type in the search box: "As I type, the photos filter by author name in real time. There is no new API call - it filters data that is already loaded."
- Click a heart on any photo, then refresh the page: "I marked this photo as a favourite. After a refresh it is still red, because favourites are saved in localStorage."

## Segment 2 - Open src/hooks/useFetchPhotos.js

What is true about this code, in plain words:
"This is my custom hook for fetching. It returns three things: photos, loading, and error.
It uses useState for each of them, and one useEffect with an empty dependency array, so the fetch runs once when the component mounts.
Inside, it calls fetch on the Picsum API. If the response is not ok, it throws, the catch sets the error state, and the screen shows an error message instead of the gallery.
There is a cancelled flag - if the component unmounts while the fetch is still running, it will not try to update state after that. The cleanup function sets cancelled to true.
The Gallery component never calls fetch itself. It only reads photos, loading and error from this hook."

## Segment 3 - Open src/hooks/useFavourites.js

What is true about this code, in plain words:
"My reducer handles one action called toggle. If the photo id is already in the favourites list, toggle removes it. If it is not in the list, toggle adds it.
Why useReducer instead of useState? The favourites list is state with its own update logic. With a reducer, that logic lives in one pure function instead of inside event handlers. It is easy to test - I can call the reducer with a state and an action and check the result without rendering anything. If I later add more actions, like clear-all, I add one more case instead of more setter calls.
The third argument to useReducer is a lazy initializer. It reads the saved favourites from localStorage only once, on the first render. If I passed the read directly as the initial value, it would parse localStorage on every render for no reason.
Then a useEffect watches the favourites array and writes it back to localStorage as JSON every time it changes. That is how favourites survive a refresh."

## Segment 4 - Open src/components/Gallery.jsx - useCallback and useMemo

Be accurate here. Say what is actually true in THIS code:
"useCallback wraps the search change handler, so React reuses the same function object between renders instead of creating a new one each time. To be honest, in this app that gives no material speedup: the only thing receiving this handler is a plain input element, not a memoized child component, so nothing expensive re-renders either way. I included it because the exercise asks for it, and it demonstrates the pattern - keeping a stable function identity - which does matter when you pass handlers down to memoized children.
useMemo computes the filtered photo list. Without it, the filter would re-run on every render, including renders caused by clicking a heart, which have nothing to do with the search. With useMemo it re-computes only when photos or the query change. At 30 photos the saving is small, but the pattern matters on bigger lists.
The actual filter logic is in src/utils/filterPhotos.js - a pure function, which makes it easy to test. My tests in test/logic.test.js check the reducer toggle and the filter."

Saying "the benefit is small at this size, I used it to demonstrate the pattern" is
a STRONGER answer than overselling it. Interviewers ask exactly this follow-up.

## Segment 5 - One thing that was difficult

Do NOT invent a struggle story. Pick something YOU actually found hard while
working through this code, and describe that. One honest option, if it matches
your experience: understanding why the favourites restore logic is written the
way it is. The truthful explanation of that design:

"Reading favourites from localStorage happens in a lazy initializer - the third
argument to useReducer. useReducer only calls that function once, on the first
render, so the JSON.parse does not run on every render. The read is also wrapped
in try/catch: if whatever is stored in localStorage is corrupt or not valid
JSON, the app falls back to an empty list instead of crashing on startup."

If a different part was harder for you - the cancelled flag, the useMemo
dependency list, anything - use that instead. What matters is that it is the
part you genuinely had to stop and think about.
