import { Box, Card, CardContent, CardMedia, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getCharacter, getEpisode } from 'rickmortyapi';
import Status from "../Status/Status.tsx";
import { getFirstSeenEpisodeId } from "../../utils/getFirstSeenEpisodeId.js";
import { BasicCharacter, Character } from "../../utils/types/Character.ts";

function CharacterPage() {
  const params = useParams();
  const characterId = +(useParams().characterId as string);
  const [character, setCharacter] = useState<Character>(BasicCharacter);
  const [firstSeen, setFirstSeen] = useState('');
  const [noSuchCharater, setNoSuchCharacter] = useState(false);

  useEffect(() => {
    getCharacter(characterId)
      .then(({ data }) => {
        setNoSuchCharacter(false)
        setCharacter(data);
        const episodeId = getFirstSeenEpisodeId(data);
        getEpisode(episodeId).then(({ data }) => setFirstSeen(data.name));
      })
      .catch(() => setNoSuchCharacter(true));

    window.scrollTo({top: 0, left: 0, behavior: 'smooth'});
  }, [params]);

  return noSuchCharater
    ? (
      <Typography
        variant="h2"
        color='#F5F5F5'
        sx={{
          fontWeight: 600,
          mt: 5,
        }}
      >
        Sorry, there is no such character
      </Typography>
      )
    : (
      <Card
        sx={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          columnGap: '28px',
          maxWidth: 1220,
          bgcolor: '#3C3E44',
          color: '#F5F5F5',
          mt: 10,
        }}
      >
        <CardMedia
          component='img'
          image={`${character.image}`}
          alt={`Image of ${character.name}`}
          width={595}
          height={572}
        />

        <CardContent>
          <Box sx={{
            height: '220px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            pb: '14px',
            boxSizing: 'border-box',
            mb: '20px',
          }}>
            <Box>
              <Typography
                component='div'
                sx={{
                  fontWeight: 800,
                  fontSize: 27,
                  height: 31,
                  lineHeight: '100%'
                }}
                >
                {character.name}
              </Typography>

              <Status status={character.status} species={character.species}/>
            </Box>

            <Box>
              <Typography
                variant="body2"
                color='#9E9E9E'
                sx={{
                  fontWeight: 500,
                }}
              >
                Last known location:
              </Typography>

              <Typography variant="body1" >
                {character.location?.name}
              </Typography>
            </Box>

            <Box>
              <Typography
                variant="body2"
                color='#9E9E9E'
                sx={{
                  fontWeight: 500,
                }}
              >
                First seen in:
              </Typography>

              <Typography variant="body1" >
                {firstSeen}
              </Typography>
            </Box>
          </Box>

          <Box>
            <Typography
              variant="body2"
              color='#9E9E9E'
              sx={{
                fontWeight: 500,
              }}
            >
              Other Info
            </Typography>

            <Typography variant="body1">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima illum libero at quisquam eaque officiis amet rem vero voluptatem itaque a nihil placeat nam, dolor est consequatur suscipit dicta quis.
              Illo esse, hic veritatis blanditiis vero corrupti rerum quia officia libero perferendis provident consequuntur minus culpa dolor neque error consectetur adipisci quod autem accusamus doloremque unde eos distinctio. Alias, cum.
            </Typography>
          </Box>
        </CardContent>
      </Card>
    );
}

export default CharacterPage;