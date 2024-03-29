import { act } from "react-dom/test-utils"

const initState = {
    filters: {
        search: '',
        status: 'All',
        priority: [],
    },
    todoList:
        [
            {
                id: 1,
                name: 'Learn Java',
                completed: false,
                priority: 'Medium'
            },
            {
                id: 2,
                name: 'Learn React',
                completed: true,
                priority: 'Medium'
            },
            {
                id: 3,
                name: 'Learn Redux',
                completed: false,
                priority: 'Medium'
            }
        ]
}

type Action = {
    type: string;
    payload?: any;
};

const rootReducer = (state = initState, action: Action) => {
    switch (action.type) {
        case 'todoList/addTodo':
            return {
                ...state,
                todoList: [
                    ...state.todoList,
                    { id: 5, name: 'Learn NodeJS', completed: false, priority: 'Medium' }
                ]
            }
        default:
            return state;
    }
}

export default rootReducer;