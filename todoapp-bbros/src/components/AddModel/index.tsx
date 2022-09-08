import React, { FC, useState, memo, useRef } from "react";
import { isEqual } from "lodash";
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Grid,
    MenuItem,
    TextField,
} from "@material-ui/core";
import SaveIcon from "@material-ui/icons/Save";
import { Todo } from "../../models";
import { useAddModalStyles } from "./index.styles";
import Select, { SelectChangeEvent } from '@mui/material/Select';

type FormProps = {
    onSave: (todo: Todo) => void;
    users: any;
    open: boolean;
    onClose: () => void;
};

const areEqual = (prevProps: FormProps, nextProps: FormProps): boolean => {
    return isEqual(prevProps, nextProps);
};

const AddModelBase: FC<FormProps> = ({ open, onSave, users, onClose }: FormProps) => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [user, setUser] = useState("");
    const [status, setStatus] = useState("");

    const [error, setError] = useState(false);
    const classes = useAddModalStyles();
    const inputRef = useRef<HTMLInputElement>(null);

    const handleAddNew = () => {
        if (title) {
            const todo = new Todo({
                title,
                description,
                user,
                status,
                completed: false,
            });

            onSave(todo);
            onClose();
            handleResetInput();
        } else {
            setError(true);
        }
    };

    const handleResetInput = () => {
        if (inputRef?.current) {
            inputRef.current.blur();
            inputRef.current.value = "";
            setTitle("");
        }
    };

    const onFocus = () => setError(false);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) =>
        e.preventDefault();

    const handleInputTitleChange = (event: React.ChangeEvent<HTMLInputElement>) =>
        setTitle(event.currentTarget.value);

    const handleInputDescChange = (event: React.ChangeEvent<HTMLInputElement>) =>
        setDescription(event.currentTarget.value);

    const handleInputUserChange = (event: SelectChangeEvent) =>
        setUser(event.target.value);

    const handleInputStatusChange = (event: SelectChangeEvent) =>
        setStatus(event.target.value);

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
            <DialogTitle id="edit-dialog-title">Add Task</DialogTitle>
            <DialogContent>
                <form onSubmit={handleSubmit}>
                    <Grid container={true} classes={{ root: classes.root }}>
                        <TextField
                            error={error}
                            label="Title"
                            inputRef={inputRef}
                            classes={{ root: classes.rootInput }}
                            onChange={handleInputTitleChange}
                            onFocus={onFocus}
                        />
                        <TextField
                            error={error}
                            label="Description"
                            inputRef={inputRef}
                            classes={{ root: classes.rootInput }}
                            onChange={handleInputDescChange}
                            onFocus={onFocus}
                        />
                    </Grid>
                    <Grid container={true} classes={{ root: classes.root }}>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            inputRef={inputRef}
                            label="Choose user"
                            onChange={handleInputUserChange}
                        >
                            <MenuItem value="">
                                <em>Choose a User</em>
                            </MenuItem>
                            {users
                                ? (users as unknown as any[]).map((user, index) => (
                                    <MenuItem key={index} value={user.id}>{user.firstName} {user.lastName}</MenuItem>
                                ))
                                : null
                            }
                        </Select>
                    </Grid>
                    <Grid container={true} classes={{ root: classes.root }}>

                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            inputRef={inputRef}
                            label="Choose user"
                            onChange={handleInputStatusChange}
                        >
                            <MenuItem value="">
                                <em>Choose a Status</em>
                            </MenuItem>
                            <MenuItem value={"todo"}>To Do</MenuItem>
                            <MenuItem value={"inProgress"}>In Progress</MenuItem>
                            <MenuItem value={"done"}>Done</MenuItem>
                        </Select>
                    </Grid>
                </form>
            </DialogContent>
            <DialogActions classes={{ root: classes.actionContainer }}>
                <Button variant="outlined" onClick={onClose}>
                    Cancel
                </Button>
                <Button
                    color="primary"
                    startIcon={<SaveIcon />}
                    variant="outlined"
                    onClick={handleAddNew}
                >
                    Save
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export const AddModal = memo(AddModelBase, areEqual);