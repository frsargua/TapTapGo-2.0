import { List, ListItem, Typography } from "@mui/material";

type AddressDropdownProps = {
  predictions: string[];
  onPredictionClick: (prediction: string, index: number) => void;
};

const AddressDropdown: React.FC<AddressDropdownProps> = ({
  predictions,
  onPredictionClick,
}) => {
  return (
    <List component="ul" sx={{ mt: 2 }}>
      {predictions.map((prediction, index) => (
        <ListItem
          key={index}
          onClick={() => onPredictionClick(prediction, index)}
          style={{ cursor: "pointer" }}
          disablePadding
          divider
          button
        >
          <Typography variant="body1">{prediction}</Typography>
        </ListItem>
      ))}
    </List>
  );
};

export default AddressDropdown;
