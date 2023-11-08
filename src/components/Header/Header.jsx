import { AppBar, IconButton, Toolbar } from "@mui/material";

function Header() {
  return (
    <AppBar
      position="static"
      sx={{
        backgroundColor: "white",
        boxShadow: 0
      }}
    >
      <Toolbar variant="dense">
        <IconButton edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
          <img src="./logo.svg" alt="logo" />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
}

export default Header;