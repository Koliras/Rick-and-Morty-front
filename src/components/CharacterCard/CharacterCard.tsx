import { Box, Card, CardContent, CardMedia, Typography } from '@mui/material';
import Status from '../Status/Status';
import { Character } from '@/utils/types/Character';
import { Link } from 'react-router-dom';
import { HistoryElementType } from '../../utils/types/History.ts';
import { useAppDispatch, useAppSelector } from '../../app/hooks.ts';
import { update } from '../../features/history/historySlice.ts';

type Props = {
  character: Character;
};

function CharacterCard({ character }: Props) {
  const dispatch = useAppDispatch();
  const { history } = useAppSelector((state) => state.history);

  const handleLinkClick = () => {
    if (
      history.length === 0 ||
      history[0].type !== HistoryElementType.VISIT ||
      history[0].content !== character.name
    ) {
      dispatch(
        update({
          type: HistoryElementType.VISIT,
          content: character.name,
          id: Date.now(),
        }),
      );
    }
  };

  return (
    <Card
      sx={{
        display: 'grid',
        gridTemplateColumns: '230px 1fr',
        width: 600,
        height: 220,
        bgcolor: '#3C3E44',
        color: '#F5F5F5',
      }}
    >
      <CardMedia
        component='img'
        image={`${character.image}`}
        alt={`Image of ${character.name}`}
        height='100%'
      />

      <CardContent
        sx={{
          padding: '13px',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            height: '100%',
            boxSizing: 'border-box',
          }}
        >
          <Box>
            <Typography
              component='div'
              sx={{
                fontWeight: 800,
                fontSize: 27,
                minHeight: 31,
                lineHeight: '100%',
                color: 'white',
              }}
            >
              <Link
                to={`./${character.id}`}
                onClick={handleLinkClick}
                style={{
                  textDecoration: 'none',
                  color: 'inherit',
                }}
              >
                {character.name}
              </Link>
            </Typography>

            <Status status={character.status} species={character.species} />
          </Box>

          <Box>
            <Typography
              variant='body2'
              color='#9E9E9E'
              sx={{
                fontWeight: 500,
              }}
            >
              Last known location:
            </Typography>

            <Typography variant='body1'>{character.location?.name}</Typography>
          </Box>

          <Box>
            <Typography
              variant='body2'
              color='#9E9E9E'
              sx={{
                fontWeight: 500,
              }}
            >
              First seen in:
            </Typography>

            <Typography variant='body1'>{character.firstSeen}</Typography>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
}

export default CharacterCard;
