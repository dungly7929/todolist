"use client";
import React, { useState } from "react";
import { Table, TableBody, TableHead, TableHeader, TableRow } from "./ui/table";
import { ITask } from "@/types/task";
import Task from "./Task";
import { Button } from "./ui/button";

interface TodoListProps {
  tasks: ITask[];
}

const TodoList: React.FC<TodoListProps> = ({ tasks }) => {
  const [newTasks, setNewTasks] = useState<ITask[]>(tasks);

  const handleAllTasks = () => {
    setNewTasks(tasks);
  };

  const handleFilterDoneTasks = () => {
    const doneTasks = tasks.filter((task) => task.done === true);
    setNewTasks(doneTasks);
  };

  const handleFilterNotDoneTasks = () => {
    const notDoneTasks = tasks.filter((task) => task.done === !true);
    setNewTasks(notDoneTasks);
  };

  return (
    <div>
      <div className="flex">
        <div className="mx-auto flex gap-5">
          <Button onClick={handleAllTasks}>All</Button>
          <Button onClick={handleFilterDoneTasks}>Done</Button>
          <Button onClick={handleFilterNotDoneTasks}>Not Done</Button>
        </div>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="font-bold uppercase">Tasks</TableHead>
            <TableHead className="font-bold uppercase">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {newTasks.map((task) => (
            <Task key={task.id} task={task} />
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default TodoList;
