"use client";
import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { ITask } from "@/types/task";
import Task from "../Task";
import { Button } from "../ui/button";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import {
  completedTasksFilter,
  selectCompletedTasks,
} from "@/redux/slice/slice";

interface TodoListProps {
  tasks: ITask[];
}

const TodoList: React.FC<TodoListProps> = () => {
  const tasks = useSelector((state: RootState) => state.list.Tasks);
  const completedTasks = useSelector(selectCompletedTasks);
  const [showCompleted, setShowCompleted] = useState("");

  const handleFliterCompleted = () => {
    setShowCompleted("completed");
  };

  const handleFliterNotCompleted = () => {
    setShowCompleted("notCompleted");
  };

  const handleShowAll = () => {
    setShowCompleted("");
  };

  const tasksToDisplay = () => {
    switch (showCompleted) {
      case "completed":
        return tasks.filter((task) => task.completed === true);
      case "notCompleted":
        return tasks.filter((task) => task.completed === false);
      default:
        return tasks;
    }
  };

  return (
    <div>
      <div className="flex">
        <div className="mx-auto flex gap-5">
          <Button onClick={handleShowAll}>Show All</Button>
          <Button onClick={handleFliterCompleted}>Completed</Button>
          <Button onClick={handleFliterNotCompleted}>Not </Button>
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
          {tasksToDisplay().map((task) => (
            <Task key={task.id} task={task} />
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default TodoList;
