export const statusColors = {
  unknown: '#9E9E9E',
  Alive: '#55CC44',
  Dead: '#D63D2E',
};

export const FILTER_TEXT_FIELDS = {
  character: [
    { id: 1, value: 'char_name', text: 'name' },
    { id: 2, value: 'char_status', text: 'status' },
    { id: 3, value: 'char_species', text: 'species' },
    { id: 4, value: 'char_type', text: 'type' },
    { id: 5, value: 'char_gender', text: 'gender' },
  ],
  location: [
    { id: 1, value: 'loc_name', text: 'name' },
    { id: 2, value: 'loc_type', text: 'type' },
    { id: 3, value: 'loc_dimension', text: 'dimension' },
  ],
  episodes: [
    { id: 1, value: 'ep_name', text: 'name' },
    { id: 2, value: 'ep_code', text: 'codes' },
  ],
};

export const DEFAULT_FORM_VALUES = {
  character: false,
  location: false,
  episodes: false,
  char_name: '',
  char_status: '',
  char_species: '',
  char_type: '',
  char_gender: '',
  loc_name: '',
  loc_type: '',
  loc_dimension: '',
  ep_name: '',
  ep_code: '',
};
