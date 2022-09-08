import { createStyles, makeStyles } from "@material-ui/core/styles";

export const useItemStyles = makeStyles(() =>
  createStyles({
    item: {
      borderBottom: "1px solid #0000003b",
    },
    done: {
      textDecoration: "line-through",
    },
  })
);