import { Box, Typography } from '@mui/material';
import styles from './Footer.module.css';
import { Link } from 'react-router-dom';

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
      component='footer'
      pt={6}
      pb={10}
    >
      <Typography
        color='#9E9E9E'
        align='center'
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

      <Box
        component='span'
        sx={{
          width: '50px',
          height: '50px',
          m: 2,
          mb: '66px',
          boxShadow:'0px 0px 200px 20px rgba(255, 255, 255, 0.14) inset,0px 0px 200px 20px rgba(255, 255, 255, 0.4)',
          WebkitBoxShadow: '0px 0px 200px 200px rgba(255, 255, 255, 0.14) inset, 0px 0px 100px 20px rgba(255, 255, 255, 0.4)',
          MozBoxShadow: '0px 0px 200px 200px rgba(255, 255, 255, 0.14) inset, 0px 0px 100px 20px rgba(255, 255, 255, 0.4)',
        }}
      >
        <Link to={`https://www.incode-group.com/`}>
          <img
            src='./companyLogo.png'
            alt='Company Logo'
            className={styles.companyLogo__image}
          />
        </Link>
      </Box>

      <Box
        sx={{
          display: 'flex',
          gap: '27px',
          mb: '23px'
        }}
      >
        <Link
          to='https://github.com/Koliras/Rick-and-Morty-front'
          className={styles.links__item}
        >
          <img src='./icons/GitHub_icon.svg' alt='GitHub' />
        </Link>

        <Link to='https://twitter.com/rickandmortyapi' className={styles.links__item}>
          <img src='./icons/Twitter_icon.svg' alt='Twitter' />
        </Link>

        <Link
          to='https://rickandmortyapi.com/support-us/'
          className={styles.links__item}
        >
          <img src='./icons/Support_Us_icon.svg' alt='Support us' />
        </Link>
      </Box>

      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          height: '29px',
        }}
      >
        <Typography color='#9E9E9E' variant='body2'>
          2023
        </Typography>
      </Box>
    </Box>
  );
}

export default Footer;
