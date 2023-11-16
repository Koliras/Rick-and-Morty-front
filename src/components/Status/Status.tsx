import { statusColors } from '../../utils/constants';
import { Typography, Box } from '@mui/material';

type Props = {
  status: 'unknown' | 'Alive' | 'Dead';
  species: string;
};

function Status({ status, species }: Props) {
  return (
    <Typography
      variant='body2'
      sx={{
        lineHeight: '26px',
      }}
    >
      <Box
        component='span'
        sx={{
          width: '9px',
          height: '9px',
          borderRadius: '50%',
          display: 'inline-block',
          marginRight: '7px',
          backgroundColor: statusColors[status],
        }}
      />

      <Typography
        component='span'
        sx={{
          textTransform: 'capitalize',
        }}
      >
        {`${status} - ${species}`}
      </Typography>
    </Typography>
  );
}

export default Status;
