import { ITask } from '@/types/task';
import { createSlice, PayloadAction, createAsyncThunk, createSelector } from '@reduxjs/toolkit';
import { getAllTodos } from '@/api/api';

export const fetchTodos = createAsyncThunk('todos/fetchTodos', async () => {
  const res = await getAllTodos();
  return res;
});

export interface CounterState {
    Tasks: ITask[];
}

const initialState: CounterState = {
  Tasks: []
}

export const selectTasks = (state: { list: CounterState }) => state.list.Tasks;

export const selectCompletedTasks = createSelector(
  [selectTasks],
  (tasks) => tasks.filter((task) => task.completed === true)
);

export const counterSlice = createSlice({
  name: 'todoList',
  initialState,
  reducers: {
    addTodo: (state, action: PayloadAction<ITask>) => {
      state.Tasks.push(action.payload);
    },

    editTodo: (state, action:  PayloadAction<ITask>) => {
      const { id, name } = action.payload;
      const existingTask = state.Tasks.find((task) => task.id === id);
      if(existingTask) {
        existingTask.name = name;
      }
    },

    deleteTodo: (state, action: PayloadAction<string>) => {
        const id = action.payload;
        const index = state.Tasks.findIndex((task) => task.id === id);
        if(index !== -1){
          state.Tasks.splice(index, 1);
        }

    },


    editCompletedTodo: (state, action: PayloadAction<ITask>) => {
      const { id , completed} = action.payload;
      const existingTask = state.Tasks.find((task) => task.id === id);
      if(existingTask) {
        existingTask.completed = completed;
      }

    },

    completedTasksFilter: (state) => {
      state.Tasks = state.Tasks.filter((task) => task.completed === true);
    }
    ,


    },

    extraReducers: (builder) => {
      builder.addCase(fetchTodos.fulfilled, (state, action) => {
          state.Tasks = action.payload;
      });
  },
})




export const { addTodo, editTodo, deleteTodo, editCompletedTodo, completedTasksFilter } = counterSlice.actions


export default counterSlice.reducer
