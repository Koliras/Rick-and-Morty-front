import { useForm } from 'react-hook-form';
import { FILTER_TEXT_FIELDS } from '../../utils/constants';
import { FilterKey } from '../../utils/types/FilterKey';
import { TextField } from '@mui/material';

type Props = {
  handleClose: () => void;
  filterKey: FilterKey;
  checkedFilters: {
    character: boolean;
    location: boolean;
    episodes: boolean;
  };
};

export default function FilterFields({
  handleClose,
  filterKey,
  checkedFilters,
}: Props) {
  const { register } = useForm();
  return (
    <>
      {checkedFilters[filterKey] &&
        FILTER_TEXT_FIELDS[filterKey].map((field) => (
          <TextField
            key={field.id}
            onClick={handleClose}
            {...register(field.value)}
            label={`Add ${filterKey} ${field.text}`}
            variant='filled'
            sx={{
              zIndex: 13000,
              '& .MuiFilledInput-root': {
                background: '#F5F5F5',
                borderRadius: 1,
              },
            }}
            InputProps={{
              disableUnderline: true,
            }}
          />
        ))}
    </>
  );
}
