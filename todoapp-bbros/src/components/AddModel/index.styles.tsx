import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";

export const useAddModalStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      minWidth: 400,
    },
    input: {
      width: "100%",
    },
    actionContainer: {
      padding: theme.spacing(3),
    }, root: {
        marginBottom: 20,
      },
      rootInput: {
        width: "80%",
      },
      rootButton: {
        width: "20%",
      },
  })
);