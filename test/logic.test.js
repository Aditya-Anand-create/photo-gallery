import { test } from 'node:test'
import assert from 'node:assert/strict'
import { favouritesReducer } from '../src/hooks/useFavourites.js'
import { filterPhotosByAuthor } from '../src/utils/filterPhotos.js'

const photos = [
  { id: '1', author: 'Alejandro Escamilla' },
  { id: '2', author: 'Paul Jarvis' },
  { id: '3', author: 'Tina Rataj' },
]

test('toggle adds a photo id when it is not a favourite yet', () => {
  assert.deepEqual(favouritesReducer([], { type: 'toggle', id: '1' }), ['1'])
})

test('toggle removes a photo id when it is already a favourite', () => {
  assert.deepEqual(favouritesReducer(['1', '2'], { type: 'toggle', id: '1' }), ['2'])
})

test('toggle does not mutate the previous state array', () => {
  const before = ['1']
  const after = favouritesReducer(before, { type: 'toggle', id: '2' })
  assert.deepEqual(before, ['1'])
  assert.deepEqual(after, ['1', '2'])
})

test('unknown action returns state unchanged', () => {
  assert.deepEqual(favouritesReducer(['1'], { type: 'mystery' }), ['1'])
})

test('empty query returns every photo', () => {
  assert.equal(filterPhotosByAuthor(photos, '').length, 3)
  assert.equal(filterPhotosByAuthor(photos, '   ').length, 3)
})

test('filters by author name, case-insensitive and partial', () => {
  const result = filterPhotosByAuthor(photos, 'PAUL')
  assert.equal(result.length, 1)
  assert.equal(result[0].author, 'Paul Jarvis')
  assert.equal(filterPhotosByAuthor(photos, 'a').length, 3)
  assert.equal(filterPhotosByAuthor(photos, 'zzz').length, 0)
})
