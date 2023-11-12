export type Character = {
  "id": number,
  "name": string,
  "status": "Alive" | 'Dead' | 'unknown',
  "species": string,
  "type": string,
  "gender": 'Female' | 'Male' | 'Genderless' | 'unknown',
  "origin": {
    "name": string,
    "url": string
  },
  "location": {
    "name": string,
    "url": string
  },
  "image": string,
  "episode": string[],
  "url": string,
  "created": Date
}

export const BasicCharacter: Character = {
  'id': 0,
  'name': '',
  'status': 'unknown',
  "species": '',
  "type": '',
  "gender": 'unknown',
  "origin": {
    "name": '',
    "url": ''
  },
  "location": {
    "name": '',
    "url": ''
  },
  "image": '',
  "episode": [],
  "url": '',
  "created": new Date()
}