import styles from './Status.module.scss';
import { statusColors } from "../../utils/constants";
import { Typography } from "@mui/material";

type Props = {
  status: 'unknown' | 'Alive' | 'Dead',
  species: string,
}

function Status({ status, species }: Props) {
  return (
    <Typography
      variant="body2"
      sx={{
        lineHeight: '26px'
      }}
    >
      <span
        className={styles.status__dot}
        style={{
          backgroundColor: statusColors[status],
        }}
      />

      <span className={styles.status}>
        {`${status} - ${species}`}
      </span>
    </Typography>
  )
}

export default Status;