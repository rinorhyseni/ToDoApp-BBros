import React, { FC, useState, memo } from "react";
import { isEqual } from "lodash";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@material-ui/core";
import SaveIcon from "@material-ui/icons/Save";
import { Todo } from "../../models";
import { useEditModalStyles } from "./index.styles";

type Props = {
  open: boolean;
  item?: Todo;
  onClose: () => void;
  onSave: (todo: Todo) => void;
};

const areEqual = (prevProps: Props, nextProps: Props): boolean =>
  isEqual(prevProps, nextProps);

const EditModalBase: FC<Props> = ({ open, onClose, onSave, item }: Props) => {
  const [title, setTitle] = useState("");
  const [error, setError] = useState(false);
  const classes = useEditModalStyles();

  const handleSave = () => {
    if (item && title) {
      onSave({ ...item, title });
      onClose();
    } else {
      setError(true);
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    setTitle(event.currentTarget.value);

  const handleInputFocus = () => setError(false);

  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby="edit-dialog-title"
      aria-describedby="edit-dialog-description"
      classes={{
        paper: classes.container,
      }}
    >
      <DialogTitle id="edit-dialog-title">Edit todo</DialogTitle>
      <DialogContent>
        <TextField
          error={error}
          defaultValue={item?.title || ""}
          classes={{ root: classes.input }}
          onChange={handleInputChange}
          onFocus={handleInputFocus}
        />
      </DialogContent>
      <DialogActions classes={{ root: classes.actionContainer }}>
        <Button variant="outlined" onClick={onClose}>
          Cancel
        </Button>
        <Button
          color="primary"
          startIcon={<SaveIcon />}
          variant="outlined"
          onClick={handleSave}
        >
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export const EditModal = memo(EditModalBase, areEqual);