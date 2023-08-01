const express = require('express')
const uuid = require('uuid')
const bodyParser = require('body-parser')
const port = 3000
const app = express()
app.use(express.json())
app.use(bodyParser.json())

const users = []

const checkUserId = (request, response, next) => {
    const { id } = request.params

    const index = users.findIndex(user => user.id === id)
    if (index < 0) {
        return response.status(404).json({ error: "User not found" })
    }
    request.userIndex = index
    request.userId = id

    next()
}

app.get('/users', (request, response) => {
    return response.json(users)
})

app.post('/users', (request, response) => {
    const { name, age } = request.body

    const user = { id: uuid.v4(), name, age }

    users.push(user)
    return response.status(201).json(user)
})
app.put('/users/:id', checkUserId, (request, response) => {

    const { name, age } = request.body
    const index = request.userIndex
    const id = request.userId

    const updateUser = { id, name, age }
    // find //permite encontrar a informação dentro do array e já retorna com a inf.
    // findIndex //ele retorna o LOCAL que está a informação. Ele acha o id e informa que po
    //posição do array ele está. E se caso nao encontre ele responde com -1


    users[index] = updateUser
    console.log(index)

    return response.json(updateUser)
})

app.delete('/users/:id', checkUserId, (request, response) => {
    const index = request.userIndex

    users.splice(index, 1)
    return response.status(204).json()
})
app.listen(port, () => {
    console.log(`Server started on port ${port}`)
})