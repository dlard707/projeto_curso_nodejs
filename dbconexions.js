//usar desestruturação para pegar o módulo pg
const{Pool}= require('pg')

const client= new Pool({
    connectionString: 'postgres://hotligqcofzcdy:013bbb6d685616dd3c0658955e05fd644058f107e3a1b431fc4818a35d2f2fba@ec2-3-209-38-221.compute-1.amazonaws.com:5432/dmb2p7r0f6rbe',
    ssl:{
        rejectUnauthorized:false
    }
})

//teste de conexão

// async function connectTeste(){
//     const res= await client.query("SELECT $1::text as message",["Olá mundo"], (err, result) => {console.log(result.rows[0].message)})
// }

// connectTeste()

module.exports= client