import { Button, Paper, Stack, TextField, Typography } from "@mui/material";
import{Delete} from '@mui/icons-material'
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

  return (
    <Paper sx={{ padding: "1rem" }}>
      <Stack direction={'row'} alignItems={'center'} >
        {
          editActive ? (<TextField value={textVal} onChange={(e)=>setTextVal(e.target.value)} onKeyDown={(e)=>{
            if(e.key === "Enter" && textVal !== "") {
              editHandler(todo.id, textVal);
              setEditActive(false);
            }
          }} />):(
            <Typography marginRight={'auto'} >{todo.title}</Typography>
          )
        }
        <Button sx={{fontWeight:"600"}} onClick={()=>setEditActive(prev=>!prev)} >{editActive ? "Done" : "Edit"}</Button>
        <Button onClick={()=>deleteHandler(todo.id)} sx={{opacity:"0.5", color:"black"}} ><Delete /></Button>
      </Stack>
    </Paper>
  );
};

export default TodoItem;
