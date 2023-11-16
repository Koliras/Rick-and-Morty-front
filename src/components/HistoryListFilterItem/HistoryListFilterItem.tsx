import { FormInput } from "@/utils/types/FormInput";
import { ListItem, ListItemText, Typography } from "@mui/material";

type Props = {
  content: FormInput
}

export function HistoryListFilterItem({ content }: Props) {
  const fieldsByFilter = {
    character: { 
      name: content.char_name, 
      gender: content.char_gender,
      species: content.char_species,
      type: content.char_type,
      status: content.char_status,
    },
    location: {
      name: content.loc_name,
      type: content.loc_type,
      dimension: content.loc_dimension
    },
    episodes: {
      name: content.ep_name,
      code: content.ep_code,
    }
  }
  return (
    <ListItem
      sx={{
        pl: 0,
        pt: 0,
        display: 'block',
        ":hover": {
          bgcolor: '#F5F5F5',
          cursor: 'default'
        }
      }}
    >
      {Object.keys(fieldsByFilter).map(fieldsGroup => (
        <>
          {Object.keys(fieldsByFilter[fieldsGroup]).some(key => fieldsByFilter[fieldsGroup][key]) && (
            <>
              <ListItemText 
                sx={{ 
                  color: '#00000099',
                  textTransform: 'capitalize',
                  display: 'block'
                }}
              >
                <Typography>
                  {fieldsGroup}:
                </Typography>
              </ListItemText>

              {Object.keys(fieldsByFilter[fieldsGroup]).map(key => (
                <>
                {fieldsByFilter[fieldsGroup][key]
                  ? (
                    <Typography
                      key={key}
                      sx={{
                        textTransform: 'capitalize',
                        display: 'block',
                      }}
                    >
                      {`${key}: ${fieldsByFilter[fieldsGroup][key]}`}
                    </Typography>
                  ) 
                  : null}
                </>
              ))}
            </>
          )}
        </>
      ))}
    </ListItem>
  )
}