import { useAppSelector } from "../../app/hooks";
import { List } from "@mui/material";
import { HistoryListItem } from "../HistoryListItem/HistoryListItem";

export function HistoryList() {
  const { history } = useAppSelector(state => state.history);
  return (
    <List
      sx={{
        pt: 0,
        overflowY: 'auto',
        overflowX: 'hidden',
        maxHeight: '500px',
      }}
    >
      {history.map(element => (
        <HistoryListItem
          key={element.id}
          item={element}
        />
      ))}
    </List>
  )
}