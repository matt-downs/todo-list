import { Response, Request } from 'express'
import { ITodo } from './../../types/todo'
import Todo from '../../models/todo'
import {stringify} from 'flatted';

const getTodos = async (req: Request, res: Response): Promise<void> => {
    try {
        const todos: ITodo[] = await Todo.find()
        res.status(200).json({ todos })
    } catch (error) {
        throw error
    }
}

const addTodo = async (req: Request, res: Response): Promise<void> => {
    console.log('Adding a todo - start');
    try {
        console.log('Adding a todo - getting body. req.body: ' + stringify(req.body));

        const body = req.body as Pick<ITodo, 'name' | 'description' | 'status'>
        console.log('Adding a todo - parsing body');

        const todo: ITodo = new Todo({
            name: body.name,
            description: body.description,
            status: body.status,
        }) 

        console.log('Adding a todo - save');
        const newTodo: ITodo = await todo.save()

        console.log('Adding a todo - find');
        const allTodos: ITodo[] = await Todo.find()

        console.log('Adding a todo - returning 201');
        res.status(201).json({ message: 'Todo added', todo: newTodo, todos: allTodos })
    } catch (error) {
        throw error
    }
}

const updateTodo = async (req: Request, res: Response): Promise<void> => {
    try {
        const {
            params: { id },
            body,
        } = req
        const updateTodo: ITodo | null = await Todo.findByIdAndUpdate(
            { _id: id },
            body
        )
        const allTodos: ITodo[] = await Todo.find()
        res.status(200).json({
            message: 'Todo updated',
            todo: updateTodo,
            todos: allTodos,
        })
    } catch (error) {
        throw error
    }
}

const deleteTodo = async (req: Request, res: Response): Promise<void> => {
    try {
        const deletedTodo: ITodo | null = await Todo.findByIdAndRemove(
            req.params.id
        )
        const allTodos: ITodo[] = await Todo.find()
        res.status(200).json({
            message: 'Todo deleted',
            todo: deletedTodo,
            todos:allTodos,
        })
    } catch (error) {
        throw error
    }
}

export { getTodos, addTodo, updateTodo, deleteTodo }
