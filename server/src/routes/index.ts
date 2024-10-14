import { Router } from 'express'
import { getTodos, addTodo, updateTodo, deleteTodo } from '../controllers/todos'

var bodyParser = require('body-parser')
var jsonParser = bodyParser.json()
 
const router: Router = Router()

router.get('/todos', getTodos)

router.post('/add-todo', jsonParser, addTodo)

router.put('/edit-todo/:id', jsonParser, updateTodo)

router.delete('/delete-todo/:id', deleteTodo)

export default router
