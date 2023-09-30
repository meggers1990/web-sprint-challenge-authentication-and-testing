const db = require('../../data/dbConfig')

function getId(id){
    return db('users').where('id', id).first()
}
function findByUsername(username){
    return db('users').where("username", username)
}

async function createAccount({username, password}){
    const [id] = await db('users').insert({username, password})
    return await getId(id)
}

function deleteUser(id){
    return db('users').where('id', id).del()
}

module.exports={
    createAccount,
    getId,
    deleteUser,
    findByUsername
}