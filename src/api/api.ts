import { ITask } from "@/types/task";

const baseUrl = 'http://localhost:3001';

export const getAllTodos = async (): Promise<ITask[]> => { 
    const res = await fetch(`${baseUrl}/tasks`, { cache: 'no-store' });
    return await res.json();
}

export const addTodoApi = async (todo: ITask): Promise<ITask> => {
    const res = await fetch(`${baseUrl}/tasks`, 
    {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(todo)
    })
    return await res.json();
}

export const editTodoApi = async (todo: ITask): Promise<ITask> => {
    const res = await fetch(`${baseUrl}/tasks/${todo.id}`, 
    {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(todo)
    })
    return await res.json();
}


export const editCompletedTodoApi = async (todo: ITask): Promise<ITask> => {

    const res = await fetch(`${baseUrl}/tasks/${todo.id}`, 
    {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(todo)
    })
    return await res.json();
}

export const deleteTodoApi = async (id: string): Promise<void> => {
    await fetch(`${baseUrl}/tasks/${id}`, 
    {
        method: 'DELETE',
    })
}