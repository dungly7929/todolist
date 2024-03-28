"use client";

import React, { FormEventHandler, useState } from "react";
import { TableRow, TableCell } from "./ui/table";
import { ITask } from "@/types/task";
import { FiEdit, FiTrash } from "react-icons/fi";
import { Button } from "./ui/button";
import Modal from "./Modal";
import { useRouter } from "next/navigation";
import { deleteTodo, editDoneTodo, editTodo } from "@/api/api";
import { Checkbox } from "./ui/checkbox";

interface TaskProps {
  task: ITask;
}

const Task: React.FC<TaskProps> = ({ task }) => {
  const router = useRouter();
  const [modalEditOpen, setModalEditOpen] = useState<boolean>(false);
  const [openModelDelete, setOpenModelDelete] = useState<boolean>(false);
  const [checked, setChecked] = useState<boolean>(task.done);
  const [taskToEdit, setTasktoEdit] = useState<string>(task.text);

  const handleSubmitEditTodo: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    await editTodo({
      id: task.id,
      text: taskToEdit,
      done: task.done,
    });
    setTasktoEdit("");
    setModalEditOpen(false);
    router.refresh();
  };

  const handleSubmitDeleteTodo = async (id: string) => {
    await deleteTodo(id);
    setOpenModelDelete(false);
    router.refresh();
  };

  const handleSubmitDoneTodo = async (done: boolean) => {
    await editDoneTodo({
      id: task.id,
      text: task.text,
      done: done!,
    });
  };

  return (
    <TableRow key={task.id} className="">
      <TableCell className={checked ? "text-red-500 line-through" : "w-full"}>
        {task.text}
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
              setChecked(!checked);
              handleSubmitDoneTodo(!checked);
            }}
          />
        </div>
      </TableCell>
    </TableRow>
  );
};

export default Task;
