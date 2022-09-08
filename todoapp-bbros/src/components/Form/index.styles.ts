import { createStyles, makeStyles } from "@material-ui/core/styles";
export const useFormStyles = makeStyles(() =>
  createStyles({
    root: {
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