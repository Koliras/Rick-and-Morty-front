import { AppBar, IconButton, Toolbar } from '@mui/material';
import { Link } from 'react-router-dom';

function Header() {
  return (
    <AppBar
      position='static'
      sx={{
        backgroundColor: 'white',
        boxShadow: 0,
      }}
    >
      <Toolbar variant='dense'>
        <IconButton
          edge='start'
          color='inherit'
          aria-label='menu'
          sx={{ mr: 2 }}
        >
          <Link to={`/`}>
            <img src='./logo.svg' alt='logo' />
          </Link>
        </IconButton>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
