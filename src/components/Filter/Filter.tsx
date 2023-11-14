import { FilterKey } from '@/utils/types/FilterKey';
import { FILTER_TEXT_FIELDS } from '../../utils/constants';
import { Box, Button, Checkbox, FormControl, FormControlLabel, FormGroup, MenuItem, Select } from '@mui/material';
import { useState } from 'react';
import FilterFields from '../FilterField/FilterFields';
import styles from './Filter.module.css';
import { useForm } from "react-hook-form";
import { resetFilters } from '../../features/characters/charactersSlice';
import { useAppDispatch } from '../../app/hooks';

export default function Filter() {
  const [isFilterVisible, setIsFilterVisible] = useState(false);
  const [isItemOpen, setIsItemOpen] = useState(false);
  const [isFilterChecked, setIsFilterChecked] = useState({
    character: false,
    location: false,
    episodes: false,
  });
  const noFilter = !isFilterChecked.character && !isFilterChecked.location && !isFilterChecked.episodes;
  const { register, handleSubmit } = useForm();
  const dispatch = useAppDispatch();

  const handleCheck = (key: FilterKey) => {
    setIsFilterChecked(prev => {
      return {
        ...prev,
        [key]: !prev[key],
      }
    })
  }

  const handleClose = () => {
    setIsItemOpen(false);
  }

  const handleFilterClick = () => {
    if (isFilterVisible) {
      dispatch(resetFilters())
    }
    setIsFilterVisible(!isFilterVisible);
  }

  const handleItemOpen = () => {
    setIsItemOpen(true);
  }

  const onSubmit = () => {
    return;
  }

  return (
    <Box
      sx={{
        color: '#272B33',
        display: 'flex',
        justifyContent: 'flex-start',
        gap: 20,
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
        <form
          className={styles.form}
          onSubmit={handleSubmit(onSubmit)}
        >
          <FormControl
            focused={false}
            sx={{
              minWidth: '213px',
              height: '100%',
            }}
          >
            <Select
              value='Select'
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
                    labelPlacement="start"
                    sx={{
                      display: 'flex',
                      pr: 2,
                      justifyContent: 'space-between',
                      textTransform: 'capitalize',
                    }}
                    {...register(`${key}`, {
                      onChange: () => handleCheck(key as FilterKey)
                    })}
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
              borderRadius: 1,
              zIndex: 1301
            }}
          >
            {noFilter && (
              <MenuItem
                focusRipple={false}
                disableRipple={true}
                sx={{
                  height: '100%',
                  ":hover": {
                    bgcolor: 'inherit',
                    cursor: 'initial',
                    borderRadius: 1,
                  }
                }}
              >
                Add key words to find
              </MenuItem>
            )}
            <FormGroup
              sx={{
                borderRadius: 1,
                bgcolor: '#F5F5F5'
              }}
            >
              {Object.keys(FILTER_TEXT_FIELDS).map((key) => (
                <FilterFields
                  key={key}
                  handleClose={handleClose}
                  filterKey={key as FilterKey}
                  checkedFilters={isFilterChecked}
                />
              ))}
            </FormGroup>
          </FormControl>

          <Button
            onClick={handleClose}
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