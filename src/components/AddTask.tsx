"use client";

import React, { FormEventHandler, useEffect, useState } from "react";
import { Button } from "./ui/button";
import Modal from "./Modal";
import { v4 as uuidv4 } from "uuid";
import { AiOutlinePlus } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { addTodo, fetchTodos } from "@/redux/slice/slice";
import { addTodoApi } from "@/api/api";

const AddTask = () => {
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [newTask, setNewTask] = useState("");
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchTodos());
  }, [dispatch]);

  const handleSubmitNewTodo: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();

    const newTodo = {
      id: uuidv4(),
      name: newTask,
      completed: false,
      priority: "Medium",
    };

    //Add the new todo to the API
    const addedTodo = await addTodoApi(newTodo);

    dispatch(addTodo(addedTodo));
    setNewTask("");
    setModalOpen(false);
  };

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewTask(e.target.value);
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
              onChange={handleOnChange}
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
