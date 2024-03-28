"use client";

import React, { FormEventHandler, useState } from "react";
import { Button } from "./ui/button";
import Modal from "./Modal";
import { addTodo, getAllTodos } from "@/api/api";
import { useRouter } from "next/navigation";
import { v4 as uuidv4 } from "uuid";
import { AiOutlinePlus } from "react-icons/ai";

const AddTask = () => {
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [newTask, setNewTask] = useState("");
  const router = useRouter();

  const handleSubmitNewTodo: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();

    const todos = await getAllTodos();

    await addTodo({
      id: uuidv4(),
      text: newTask,
      done: false,
    });
    setNewTask("");
    setModalOpen(false);
    router.refresh();
  };

  const btn = (
    <Button
      className="w-full uppercase"
      onClick={() => {
        setModalOpen(true);
        console.log(modalOpen);
      }}
    >
      Add New Task
      <AiOutlinePlus className="ml-2" size={18} />
    </Button>
  );

  return (
    <div className="">
      <Modal
        title="Add New Task"
        children1={btn}
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}
      >
        <form onSubmit={handleSubmitNewTodo}>
          <div className="flex gap-2 mt-5">
            <input
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
              type="text"
              placeholder="Add new task here"
              className="input input-bordered w-full"
            />

            <Button type="submit">Submit</Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default AddTask;
