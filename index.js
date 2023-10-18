const express = require('express') // importa express
const uuid = require('uuid') // importando biblioteca

//npm run dev RODAR SERVIDOR

const app = express()
app.use(express.json()) // facilitando chamando ela de app

/*
     -Query params => meusite.com/users?nome=Augusto&age=18 // Filtros
     -Route params => /users/2  // BUSCAR, DELETAR PO ATUALIZAR ALGO ESPECIFICO 
     -Request Body => {"name":"Rodolfo","age":}

      -GET         => Buscar informações no back-end
      -POST        => Criar informações no back-end
      -PUT/ PATCH  => Alterar/Atualizar informação no back-end
      -DELETE      => Delete informação no back-end


         -Middlewares => INTERCEPTOR => Tem poder de parar ou alterar dados da requisição
*/

const users =[]

const checkUserId = (request, response, next) => {
    const { id } = request.params; // Corrigido para acessar o parâmetro da rota :id
    const index = users.findIndex(user => user.id === id);

    if (index < 0) {
        return response.status(404).json({ message: "user not found" });
    }

    request.userIndex = index;
    request.userId = id;

    next();
};



// criando uma rota
app.get('/users/', (request, response) =>{ // -GET => Buscar informações no back-end

    return response.json(users)    
})


app.post('/users', (request, response) =>{ // -POST  => Criar informações no back-end
    const {name, age} = request.body

    const user = { id:uuid.v4(), name, age}

    users.push(user)
    return response.status(201).json(users)
})



app.put('/users/:id',checkUserId, (request, response) =>{ // -GET => Buscar informações no back-end
   const {name, age} = request.body // peagando id
   const index = request.userIndex//peagando informações do usuario
   
   const updateUser = {id, name, age}
  
   users[index] = updateUser

       return response.json(updateUser)    
})



app.delete('/users/:id',checkUserId, (request, response) =>{ // -GET => Buscar informações no back-end
  
   const index = users.findIndex(user => user.id === id)
    
  

   users.splice(index,1)


    return response.status(204).json(users)    
})

app.listen(3000 , () => {
    console.log('Server started om port 3000')
})


   
