const db = require('./db-config');

module.exports={
    findAktor,addAktor,updateAktor,deleteAktor,findAktorById
}

function findAktor(){
    return db('aktor');
}
function findAktorById(id){
    return db("aktor").where({id}).first();
}
function addAktor(yeniAktor){
    return db('aktor').insert(yeniAktor,"id").then(([id])=>{
        return db('aktor').where({id}).first();
    });
}

function updateAktor(yeniAktor,id){
    return db('aktor').update(updateAktor).where({id}).then(uptated=>{
        if(updated===1){
            return db('aktor').where({id}).first();
        }
    })
}

function deleteAktor(id){
    return db("aktor").del().where({id});
}