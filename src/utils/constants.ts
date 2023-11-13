export const statusColors = {
  'unknown': '#9E9E9E',
  'Alive': '#55CC44',
  'Dead': '#D63D2E',
}

export const FILTER_TEXT_FIELDS = {
  character: [
    { id: 1, text: 'name'},
    { id: 2, text: 'status'},
    { id: 3, text: 'species'},
    { id: 4, text: 'type'},
    { id: 5, text: 'gender'},
  ],
  location: [
    { id: 1, text: 'name'},
    { id: 2, text: 'type'},
    { id: 3, text: 'dimension'},
  ],
  episodes: [
    { id: 1, text: 'name'},
    { id: 2, text: 'codes'},
  ]
}
