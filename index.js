const express = require('express')
const app = express()
const port = 3000

app.get('/', (request, response) => {
    response.send('Received "get" request')
})

app.post('/', (request, response) => {
    response.send('Received "post" request')
}
)

app.put('/', (request, response) => {
    response.send('Received "put" request')
}
)

app.use((err, request, response, next) => {
    // обработчик ошибок
    console.log(err)
    response.status(500).send('Something broke!')
})

app.listen(port, (err) => {
    if (err) {
        return console.log('something bad happened', err)
    }
    console.log(`server is listening on ${port}`)
})