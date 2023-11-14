import { Fab } from "@mui/material";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import CloseIcon from '@mui/icons-material/Close';
import ErrorOutlineRoundedIcon from '@mui/icons-material/ErrorOutlineRounded';
import DownloadRoundedIcon from '@mui/icons-material/DownloadRounded';
import { useState } from "react";
import { useLocation, useSearchParams } from "react-router-dom";
import { useAppSelector } from "../../app/hooks";
import { selectCharacters } from "../../features/characters/charactersSlice";
import { CSVLink } from "react-csv";

export default function FAB() {
  const [isButtonsVisible, setIsButtonsVisible] = useState(false);
  const location = useLocation();
  const characters = useAppSelector(selectCharacters);
  const [searchParams] = useSearchParams();
  const page = searchParams.get('page');

  const handleClick = () => {
    setIsButtonsVisible(!isButtonsVisible);
  }

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
    </Fab>
  )
}