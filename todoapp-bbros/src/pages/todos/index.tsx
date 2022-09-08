import React, { FC, useEffect, useCallback, useState } from "react";
import { useSelector, useDispatch, shallowEqual } from "react-redux";
import { createStyles, makeStyles } from "@material-ui/core/styles";
import { Grid, CircularProgress, Typography, Button } from "@material-ui/core";
import { Todo } from "../../models";
import { todoActions, userActions } from "../../store/todo";
import { RootState } from "../../store";
import { EditModal } from "../../components/EditModal";
import { Item } from "../../components/Item";
import { Form } from "../../components/Form";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { AddModal } from "../../components/AddModel";
import { store } from "../../App";

const useStyles = makeStyles(() =>
  createStyles({
    container: {
      maxWidth: 600,
      margin: "80px auto",
    },
    indicator: {
      paddingTop: "2rem",
    },
  })
);

const TodoListBase: FC = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [isOpening, setIsOpening] = useState(false);
  const [currentTodo, setCurrentTodo] = useState<Todo>({
    title: "",
    description: "",
    user: "",
    status: "",
    completed: false,
  });


  const dispatch = useDispatch();

  const classes = useStyles();

  const { list, loading } = useSelector((state: RootState) => state.todos, shallowEqual);
  const { listUser, loadingUsers } = useSelector((state: RootState) => state.users, shallowEqual);


  useEffect(() => {
    todoActions.getTodos(dispatch);
    userActions.getUsers(dispatch);
  }, [dispatch]);

  const addTodo = useCallback(
    (todo: Todo) => todoActions.addTodo(todo, dispatch),
    [dispatch]
  );

  const deleteTodo = useCallback(
    (id: number) => todoActions.deleteTodo(id, dispatch),
    [dispatch]
  );

  const updateTodo = useCallback(
    (todo: Todo) => todoActions.updateTodo(todo, dispatch),
    [dispatch]
  );

  const handleEditModal = useCallback((todo: Todo) => {
    setIsEditing(true);
    setCurrentTodo(todo);
  }, []);

  const onClose = useCallback(() => {
    setIsEditing(false);
    setIsOpening(false);
  }, []);

  const openAddModal = useCallback(() => {
    setIsOpening(true);
  }, []);

  const RenderList: FC = () => {
    if (list?.length) {
      return (
        <>
          {list.map((todo: Todo) => (
            <Item
              key={todo.id}
              item={todo}
              onDelete={deleteTodo}
              onUpdate={updateTodo}
              onEditModal={handleEditModal}
            />
          ))}
        </>
      );
    } else {
      return <Typography align="center">Empty</Typography>;
    }
  };

  return (
    <Grid classes={{ root: classes.container }}>
      <Button
        variant="outlined"
        onClick={openAddModal}
      >Create Task</Button>
      <AddModal
        open={isOpening}
        onClose={onClose}
        onSave={addTodo}
        users={listUser} />
      <RenderList />
      {loading && (
        <Grid
          container={true}
          direction="row"
          justify="center"
          alignItems="center"
          classes={{ root: classes.indicator }}
        >
          <CircularProgress disableShrink />
        </Grid>
      )}
      <EditModal
        open={isEditing}
        item={currentTodo}
        onClose={onClose}
        onSave={updateTodo}
      />
    </Grid>

  );
};

export const TodoList = TodoListBase;