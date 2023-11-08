import { Typography } from "@mui/material";

function Heading() {
  return (
    <Typography
      variant='h1'
      sx={{
        fontWeight: 900,
        height: 345,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundImage: `url(./background.svg)`,
        backgroundPosition: "center",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat"
      }}
    >
      The Rick and Morty API
    </Typography>
  );
}

export default Heading;
