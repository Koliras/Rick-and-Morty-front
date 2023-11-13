import { FilterKey } from '@/utils/types/FilterKey';
import { FILTER_TEXT_FIELDS } from '../../utils/constants';
import { Box, Button, Checkbox, FormControl, FormControlLabel, FormGroup, MenuItem, Select, TextField } from '@mui/material';
import { useState } from 'react';

export default function Filter() {
  const [isFilterVisible, setIsFilterVisible] = useState(false);
  const [isItemOpen, setIsItemOpen] = useState(false);
  const [isFilterChecked, setIsFilterChecked] = useState({
    character: false,
    location: false,
    episodes: false,
  });

  const handleCheck = (key: FilterKey) => {
    setIsFilterChecked(prev => {
      return {
        ...prev,
        [key]: !prev[key],
      }
    })
  }

  const handleFilterClick = () => {
    setIsFilterVisible(!isFilterVisible);
  }

  const handleItemOpen = () => {
    setIsItemOpen(true);
  }
  return (
    <Box
      sx={{
        color: '#272B33',
        display: 'flex',
        justifyContent: 'flex-start',
        width: 'clamp(600px, 100%, 1228px)',
        py: '22px',
        height: '56px',
      }}
    >
      <Button
        onClick={handleFilterClick}
        sx={{
          color: 'inherit',
          bgcolor: '#F5F5F5',
          textTransform: 'uppercase',
          width: '143px',
          height: '57px',
          ":hover": {
            bgcolor: '#D5D5D5'
          }
        }}
      >
        {isFilterVisible
          ? 'Remove filter'
          : 'Filter'}
      </Button>

      {isFilterVisible && (
        <form>
          <FormControl
            sx={{
              minWidth: '213px',
              height: '100%',
            }}
          >
            <Select
              value='Select'
              labelId="demo-controlled-open-select-label"
              id="demo-controlled-open-select"
              placeholder='Select Item'
              open={isItemOpen}
              onClick={handleItemOpen}
              sx={{
                bgcolor: '#F5F5F5',
              }}
            >
              <MenuItem
                value="Select"
                sx={{
                  display: 'none'
                }}
              >
                Select Item
              </MenuItem>

              <FormGroup>
                {Object.keys(FILTER_TEXT_FIELDS).map((key) => (
                  <FormControlLabel
                    key={key}
                    value={key}
                    control={<Checkbox />}
                    label={key}
                    checked={isFilterChecked[key as FilterKey]}
                    onChange={() => handleCheck(key as FilterKey)}
                    labelPlacement="start"
                    sx={{
                      display: 'flex',
                      pr: 2,
                      justifyContent: 'space-between',
                      textTransform: 'capitalize',
                    }}
                  />
                ))}
              </FormGroup>
            </Select>
          </FormControl>

          <FormControl
            sx={{
              minWidth: '260px',
              height: '100%',
              bgcolor: '#F5F5F5',
              borderRadius: 2
            }}
          >
            <FormGroup
              sx={{
                borderRadius: 2,
                bgcolor: '#F5F5F5'
              }}
            >
              {isFilterChecked.character && FILTER_TEXT_FIELDS.character.map(field => (
                <TextField
                  key={field.id}
                  label={`Add character ${field.text}`}
                  variant='filled'
                  sx={{
                    zIndex: 19301,
                    "& .MuiFilledInput-root": {
                      background: "#F5F5F5",
                      borderRadius: 1,
                    }
                  }}
                  InputProps={{
                    disableUnderline: true,
                  }}
                />
              ))}
            </FormGroup>
          </FormControl>

          <Button
            onClick={() => setIsItemOpen(false)}
            sx={{
              color: 'inherit',
              bgcolor: '#F5F5F5',
              textTransform: 'uppercase',
              width: '143px',
              height: '57px',
              zIndex: 1301,
              ":hover": {
                bgcolor: '#D5D5D5',
              }
            }}
          >
            Find
          </Button>
        </form>
      )}
    </Box>
  )
}