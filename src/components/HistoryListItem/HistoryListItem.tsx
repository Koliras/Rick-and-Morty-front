import { FormInput } from "../../utils/types/FormInput"
import { HistoryElement, HistoryElementType } from "../../utils/types/History"
import { ListItem, ListItemText } from "@mui/material"
import { HistoryListFilterItem } from "../HistoryListFilterItem/HistoryListFilterItem"

type Props = {
  item: HistoryElement,
}

export function HistoryListItem({ item }: Props) {
  return item.type === HistoryElementType.FILTER
    ? (<HistoryListFilterItem content={item.content as FormInput} />)
    : (
      <ListItem
        sx={{
          pl: 0,
          pt: 0,
          ":hover": {
            bgcolor: '#F5F5F5',
            cursor: 'default'
          }
        }}
      >
        <ListItemText>
          {`Checked info about ${item.content}`}
        </ListItemText>
      </ListItem>
    )
}