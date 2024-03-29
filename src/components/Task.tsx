"use client";

import React, { FormEventHandler, useState } from "react";
import { TableRow, TableCell } from "./ui/table";
import { ITask } from "@/types/task";
import { FiEdit, FiTrash } from "react-icons/fi";
import { Button } from "./ui/button";
import Modal from "./Modal";
import { deleteTodoApi, editCompletedTodoApi, editTodoApi } from "@/api/api";
import { Checkbox } from "./ui/checkbox";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { deleteTodo, editTodo, editCompletedTodo } from "@/redux/slice/slice";

interface TaskProps {
  task: ITask;
}

const Task: React.FC<TaskProps> = ({ task }) => {
  const dispatch = useDispatch<AppDispatch>();
  const [modalEditOpen, setModalEditOpen] = useState<boolean>(false);
  const [openModelDelete, setOpenModelDelete] = useState<boolean>(false);
  const [checked, setChecked] = useState<boolean>(task.completed);
  const [taskToEdit, setTasktoEdit] = useState<string>(task.name);

  //Handle logic for editing a task
  const handleSubmitEditTodo: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();

    const editedTodo = await editTodoApi({
      id: task.id,
      name: taskToEdit,
      completed: task.completed,
      priority: task.priority,
    });

    dispatch(editTodo(editedTodo));

    setTasktoEdit("");
    setModalEditOpen(false);
  };

  //Handle logic for deleting a task
  const handleSubmitDeleteTodo = async (id: string) => {
    await deleteTodoApi(id);
    dispatch(deleteTodo(id));

    setOpenModelDelete(false);
  };

  //Handle logic for filter completed tasks.
  const handleSubmitCompletedTodo = async (todo: ITask) => {
    const updatedTask = await editCompletedTodoApi(todo);
    // Dispatch an action to update the task in the Redux store
    dispatch(editCompletedTodo(updatedTask));
  };

  return (
    <TableRow key={task.id} className="">
      <TableCell
        className={checked ? "text-red-500 line-through w-full" : "w-full"}
      >
        {task.name}
      </TableCell>
      <TableCell className="flex gap-2">
        {/* Edit Model */}
        <Modal
          title="Edit Task"
          children1={
            <FiEdit cursor={"pointer"} size={25} className="text-blue-500" />
          }
          modalOpen={modalEditOpen}
          setModalOpen={setModalEditOpen}
        >
          <form onSubmit={handleSubmitEditTodo}>
            <div className="flex gap-2 mt-5">
              <input
                value={taskToEdit}
                onChange={(e) => setTasktoEdit(e.target.value)}
                type="text"
                placeholder="Add new task here"
                className="input input-bordered w-full"
              />

              <Button type="submit">Change</Button>
            </div>
          </form>
        </Modal>
        {/* Delete Model */}
        <Modal
          title="Delete Task"
          children1={
            <FiTrash cursor={"pointer"} size={22} className="text-red-500" />
          }
          modalOpen={openModelDelete}
          setModalOpen={setOpenModelDelete}
        >
          <div className="flex-col mt-5 justify-center items-center text-center">
            <h1>Are you sure, you want to delete it ?</h1>

            <Button
              onClick={() => handleSubmitDeleteTodo(task.id)}
              className="mt-5"
            >
              Delete
            </Button>
          </div>
        </Modal>
        {/* Checkbox */}
        <div className="mt-1 items-center">
          <Checkbox
            checked={checked}
            id="done"
            onCheckedChange={() => {
              const newChecked = !checked;
              const updatedTask = { ...task, completed: !checked };
              handleSubmitCompletedTodo(updatedTask);
              setChecked(newChecked);
            }}
          />
        </div>
      </TableCell>
    </TableRow>
  );
};

export default Task;
