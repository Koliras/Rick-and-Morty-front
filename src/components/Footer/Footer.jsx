import { Box, Typography } from "@mui/material";
import styles from './Footer.module.css'
// import Image from 'mui-image'

function Footer() {
  return (
    <Box
      sx={{
        backgroundColor: '#202329',
        height: 393,
        boxSizing: 'border-box',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
      component="footer"
      pt={6}
      pb={10}
    >
      <Typography
        color="#9E9E9E"
        align="center"
        sx={{
          textTransform: 'uppercase',
          fontWeight: 700,
          fontSize: 13,
          lineHeight: '22px',
          width: 212,
          mb: '18px',
        }}
      >
        performed as part of a test case for the company
      </Typography>

      <span className={styles.companyLogo__container}>
        <img
          src="./companyLogo.png"
          alt="Company Logo"
          className={styles.companyLogo__image}
        />
      </span>

      <div className={styles.links}>
        <a
          href="#"
          className={styles.links__item}
        >
          <img
            src="./icons/GitHub_icon.svg"
            alt="GitHub"
          />
        </a>

        <a
          href="#"
          className={styles.links__item}
        >
          <img
            src="./icons/Twitter_icon.svg"
            alt="Twitter"
          />
        </a>

        <a
          href="#"
          className={styles.links__item}
        >
          <img
            src="./icons/Support_Us_icon.svg"
            alt="Support us"
          />
        </a>
      </div>

      <div className={styles.year__wrapper}>
        <Typography
          color="#9E9E9E"
          variant="body2"
        >
          2023
        </Typography>
      </div>
    </Box>
  );
}

export default Footer;
