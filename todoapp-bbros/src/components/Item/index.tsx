import React, { FC, memo } from "react";
import { isEqual } from "lodash";
import { Grid, Typography, IconButton, Checkbox } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import { Todo } from "../../models";
import { useItemStyles } from "./index.styles";

type ItemProps = {
  item: Todo;
  onUpdate: (todo: Todo) => void;
  onDelete: (id: number) => void;
  onEditModal: (todo: Todo) => void;
};

const areEqual = (prevProps: ItemProps, nextProps: ItemProps): boolean => {
  return isEqual(prevProps, nextProps);
};

const ItemBase: FC<ItemProps> = ({
  item,
  onUpdate,
  onDelete,
  onEditModal,
}: ItemProps) => {
  const classes = useItemStyles();

  const handleUpdate = () => onUpdate({ ...item, completed: !item.completed, status: "done" });

  const handleDelete = () => {
    if (item.id) {
      onDelete(item.id);
    }
  };

  const handleEditModal = () => onEditModal(item);

  return (
    <Grid
      container={true}
      direction="row"
      justify="flex-start"
      alignItems="center"
      classes={{ root: classes.item }}
    >
      <Grid item={true} xs={1}>
        <Checkbox
          checked={item.completed}
          onChange={handleUpdate}
          name="checkedBox"
          color="primary"
        />
      </Grid>
      <Grid item={true} xs={9}>
        <Typography className={item.completed ? classes.done : ""}>
          {item.title}
        </Typography>
      </Grid>
      <Grid item={true} xs={2}>
        <IconButton onClick={handleEditModal}>
          <EditIcon />
        </IconButton>
        <IconButton onClick={handleDelete}>
          <DeleteIcon />
        </IconButton>
      </Grid>
    </Grid>
  );
};

export const Item = memo(ItemBase, areEqual);