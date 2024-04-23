import { Button, Paper, Stack, TextField, Typography } from "@mui/material";
import { Delete } from '@mui/icons-material';
import { useState } from "react";

type PropsType = {
  todo: TodoItemType;
  deleteHandler:(id:TodoItemType["id"])=>void;
  completeHandler:(id:TodoItemType["id"])=>void;
  editHandler:(id:TodoItemType["id"], newTitle:TodoItemType["title"])=>void;
};

const TodoItem = ({ todo, deleteHandler, editHandler }: PropsType) => {

  const [editActive, setEditActive] = useState<boolean>(false);
  const [textVal, setTextVal] = useState<string>(todo.title);
  const [updated, setUpdated] = useState<boolean>(false); // Track whether title has been updated

  const handleEdit = (id: TodoItemType["id"], newTitle: TodoItemType["title"]) => {
    editHandler(id, newTitle);
    setUpdated(false); 
    setEditActive(false); 
  };

  return (
    <Paper sx={{ padding: "1rem" }}>
      <Stack direction={'row'} alignItems={'center'} >
        {editActive ? (
          <TextField
            value={textVal}
            onChange={(e) => {
              setTextVal(e.target.value);
              setUpdated(true);
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter" && textVal.trim() !== "") {
                handleEdit(todo.id, textVal.trim());
              }
            }}
          />
        ) : (
          <Typography marginRight={'auto'} >{todo.title}</Typography>
        )}
        {editActive && updated ? (
          <Button
            sx={{ fontWeight: "600" }}
            onClick={() => handleEdit(todo.id, textVal.trim())}
          >
            Done
          </Button>
        ) : (
          <Button
            sx={{ fontWeight: "600" }}
            onClick={() => setEditActive(true)} 
          >
            Edit
          </Button>
        )}
        <Button onClick={() => deleteHandler(todo.id)} sx={{ opacity: "0.5", color: "black" }}>
          <Delete />
        </Button>
      </Stack>
    </Paper>
  );
};

export default TodoItem;
