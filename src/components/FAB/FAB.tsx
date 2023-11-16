import { Fab, Drawer, Button, Box, Typography } from "@mui/material";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import CloseIcon from '@mui/icons-material/Close';
import ErrorOutlineRoundedIcon from '@mui/icons-material/ErrorOutlineRounded';
import DownloadRoundedIcon from '@mui/icons-material/DownloadRounded';
import { useState } from "react";
import { useLocation, useSearchParams } from "react-router-dom";
import { useAppSelector } from "../../app/hooks";
import { selectCharacters } from "../../features/characters/charactersSlice";
import { CSVLink } from "react-csv";
import { HistoryList } from "../HistoryList/HistoryList";

export default function FAB() {
  const [isButtonsVisible, setIsButtonsVisible] = useState(false);
  const location = useLocation();
  const characters = useAppSelector(selectCharacters);
  const [searchParams] = useSearchParams();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const page = searchParams.get('page');

  const handleClick = () => {
    setIsButtonsVisible(!isButtonsVisible);
  }

  const toggleDrawer = (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event.type === 'keydown' &&
        ((event as React.KeyboardEvent).key === 'Tab' ||
          (event as React.KeyboardEvent).key === 'Shift')
      ) {
        return;
      }

      setIsDrawerOpen(open);
    };

  const headers = [
    { label: 'Name', key: 'name'},
    { label: 'Status', key: 'status'},
    { label: 'Species', key: 'species'},
    { label: 'Gender', key: 'gender'},
    { label: 'Origin', key: 'origin.name'},
    { label: 'LastLocation', key: 'location.name'},
    { label: 'FirstSeen', key: 'firstSeen'},
  ]

  return (
    <Fab
      onClick={handleClick}
      disableRipple
      sx={{
        position: 'fixed',
        right: '5%',
        bottom: '5%',
        bgcolor: '#F5F5F5',
        boxSizing: 'border-box'
      }}
    >
      {isButtonsVisible
        ? <CloseIcon />
        : <MoreVertIcon />}
      
      {isButtonsVisible && (
        <>
          <Fab
            size="small"
            onClick={toggleDrawer(true)}
            sx={{
              bgcolor: '#F5F5F5',
              position: 'absolute',
              top: '-108px',
            }}
          >
            <ErrorOutlineRoundedIcon />
          </Fab>

          
          <Fab
            size="small"
            disabled={location.pathname !== '/'}
            sx={{
              bgcolor: '#F5F5F5',
              position: 'absolute',
              top: '-52px',
              ":disabled": {
                bgcolor: '#CCC'
              }
            }}
          >
            <CSVLink
              data={characters}
              filename={`CharactersPage${page}`}
              headers={headers}
              style={{
                display: 'flex',
                color: 'inherit',
              }}
            >
              <DownloadRoundedIcon />
            </CSVLink>
          </Fab>
        </>
      )}

      <Drawer
        anchor="right"
        open={isDrawerOpen}
        sx={{
          zIndex: 1400,
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            p: 2,
            height: '100%',
            width: '420px',
            boxSizing: 'border-box',
          }}
        >
          <Box>
            <Typography
              variant="h6"
              sx={{
                fontWeight: 500,
                color: '#272B33'
              }}
            >
              History
            </Typography>
            <HistoryList />
          </Box>
          <Button
            onClick={toggleDrawer(false)}
            sx={{
              textAlign: "left",
              display: 'inline-block',
              width: 'fit-content',
              color: '#272B33',
              fontWeight: 500,
            }}
          >
            Close
          </Button>
        </Box>
      </Drawer>
    </Fab>
  )
}