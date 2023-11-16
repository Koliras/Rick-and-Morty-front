import { FilterKey } from '@/utils/types/FilterKey';
import { DEFAULT_FORM_VALUES, FILTER_TEXT_FIELDS } from '../../utils/constants';
import { Box, Button, Checkbox, FormControl, TextField, FormControlLabel, FormGroup, MenuItem, Select } from '@mui/material';
import { useState } from 'react';
import styles from './Filter.module.css';
import { useForm, SubmitHandler } from "react-hook-form";
import { fetchCharacters, setFilters } from '../../features/characters/charactersSlice';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { FormInput } from '../../utils/types/FormInput';
import { useSearchParams } from 'react-router-dom';

export default function Filter() {
  const { currentFilters } = useAppSelector(state => state.characters);
  const [isFilterVisible, setIsFilterVisible] = useState(currentFilters.character || currentFilters.location || currentFilters.episodes);
  const [isItemOpen, setIsItemOpen] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const [isBackDark, setIsBackDark] = useState(false);
  const [isFilterChecked, setIsFilterChecked] = useState({
    character: false,
    location: false,
    episodes: false,
  });
  const noFilter = !isFilterChecked.character && !isFilterChecked.location && !isFilterChecked.episodes;
  const { register, handleSubmit } = useForm({
    defaultValues: DEFAULT_FORM_VALUES,
  });
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
      dispatch(fetchCharacters({}))
      setSearchParams((searchParams: URLSearchParams) => {
        return {
          ...searchParams,
          page: 1,
        }
      })
    }
    setIsFilterVisible(!isFilterVisible);
  }

  const handleItemOpen = () => {
    setIsItemOpen(true);
    setIsBackDark(true);
  }

  const onSubmit: SubmitHandler<FormInput> = (filters) => {
    dispatch(fetchCharacters({ page: 1, filters }));
    handleClose();
    dispatch(setFilters(filters));
    setIsBackDark(false);
    setSearchParams((searchParams: URLSearchParams) => {
      return {
        ...searchParams,
        page: 1,
      }
    });
    setIsFilterChecked({
      character: false,
      location: false,
      episodes: false,
    })
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

      {isBackDark && (
        <Box
          onClick={() => setIsItemOpen(false)}
          sx={{
            position: 'fixed',
            bgcolor: 'rgba(0, 0, 0, 0.8)',
            width: '100%',
            height: '100%',
            top: 0,
            left: 0,
            zIndex: 1300
          }}
        />
      )}

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
                zIndex: 1300,
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
            onClick={handleClose}
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
              {Object.keys(FILTER_TEXT_FIELDS).map(filter => (
                <>
                  {isFilterChecked[filter] && FILTER_TEXT_FIELDS[filter].map(field => (
                    <TextField
                      key={field.id}
                      {...register(field.value)}
                      label={`Add ${filter} ${field.text}`}
                      variant='filled'
                      sx={{
                        zIndex: 1300,
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
                </>
              ))}
            </FormGroup>
          </FormControl>

          <Button
            type='submit'
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