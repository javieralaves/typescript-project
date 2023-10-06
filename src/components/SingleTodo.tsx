import React, { useEffect, useRef, useState } from "react";
import { Todo } from "../model";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";
import { MdDone } from "react-icons/md";
import "./styles.css";

type Props = {
  todo: Todo;
  todos: Todo[];
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
};

const SingleTodo = ({ todos, todo, setTodos }: Props) => {
  const [edit, setEdit] = useState<boolean>(false);
  const [editTodo, setEditTodo] = useState<string>(todo.todo);

  const handleDone = (id: number) => {
    setTodos(
      todos.map((todo) =>
        // look for the todo with the clicked is and change the isDone to true
        todo.id === id ? { ...todo, isDone: !todo.isDone } : todo
      )
    );
  };

  const handleDelete = (id: number) => {
    // return a new array with all todos except the todo with the clicked id
    setTodos(todos.filter((todo) => todo.id != id));
  };

  const handleEdit = (e: React.FormEvent, id: number) => {
    e.preventDefault();

    setTodos(
      todos.map((todo) => (todo.id === id ? { ...todo, todo: editTodo } : todo))
    );
    setEdit(false);
  };

  // to focus on input on edit
  const inputRef = useRef<HTMLInputElement>(null);

  // switch to input focus on command
  useEffect(() => {
    inputRef.current?.focus();
  }, [edit]);

  return (
    <form className="todos_single" onSubmit={(e) => handleEdit(e, todo.id)}>
      {
        // check if edit mode is on
        edit ? (
          // edit mode is on
          <input
            // reference for focus on edit
            ref={inputRef}
            // value from editTodo useState
            value={editTodo}
            // when pressing enter it'll change the todo
            onChange={(e) => setEditTodo(e.target.value)}
            // styling
            className="todos_single--text"
          />
        ) : // edit mode not on
        todo.isDone ? (
          <s className="todos_single--text">{todo.todo}</s>
        ) : (
          <span className="todos_single--text">{todo.todo}</span>
        )
      }

      <div>
        <span
          className="icon"
          onClick={() => {
            // if not edit mode and not done
            if (!edit && !todo.isDone) {
              setEdit(!edit);
            }
          }}
        >
          <AiFillEdit />
        </span>
        <span className="icon" onClick={() => handleDelete(todo.id)}>
          <AiFillDelete />
        </span>
        <span className="icon" onClick={() => handleDone(todo.id)}>
          <MdDone />
        </span>
      </div>
    </form>
  );
};

export default SingleTodo;
