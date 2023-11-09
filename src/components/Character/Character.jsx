import { Card, CardContent, CardMedia, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getCharacter, getEpisode } from 'rickmortyapi';
import Status from "../Status/Status.tsx";
import { getFirstSeenEpisodeId } from "../../utils/getFirstSeenEpisodeId.js";
import styles from './Character.module.scss';

function Character() {
  const params = useParams();
  const [character, setCharacter] = useState({});
  const [firstSeen, setFirstSeen] = useState('');

  useEffect(() => {
    getCharacter(+params.characterId).then(({ data }) => {
      setCharacter(data);
      let episodeId = getFirstSeenEpisodeId(data);
      getEpisode(episodeId).then(({ data }) => setFirstSeen(data.name));
    });
  }, [params]);

  return (
    <Card
      sx={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        columnGap: '28px',
        maxWidth: 1220,
        bgcolor: '#3C3E44',
        color: '#F5F5F5'
      }}
    >
      <CardMedia
        component='img'
        image={`${character.image}`}
        alt={`Image of ${character.name}`}
        width='595px'
        height={572}
      />

      <CardContent>
        <div className={styles.character__mainInfo}>
          <div className="character__head">
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
          </div>

          <div className="character__location">
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
          </div>

          <div className="character__firstSeen">
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
          </div>
        </div>

        <div className="character__otherInfo">
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
        </div>
      </CardContent>
    </Card>
  );
}

export default Character;