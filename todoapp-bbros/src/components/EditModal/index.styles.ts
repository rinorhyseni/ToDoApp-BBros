import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";

export const useEditModalStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      minWidth: 400,
    },
    input: {
      width: "100%",
    },
    actionContainer: {
      padding: theme.spacing(3),
    },
  })
);