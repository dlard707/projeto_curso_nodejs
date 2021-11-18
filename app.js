//importar o express
const express= require('express')

//criar uma variável que guarda o objeto express
const app= express()

app.set('view engine','ejs')
app.use(express.static('./views/public'))

//const noticias= require('./mockup.js')
const db= require('./dbconexions')

//criando nossa primeira rota
app.get('/', async (req,res)=>{
    //acessar o banco de dados
    var result= await db.query('SELECT * FROM noticias ORDER BY id_noticia DESC LIMIT 3')

    res.render('home/index',{noticias:result.rows})
})

app.get('/noticias',async (req,res) =>{

    var result= await db.query('SELECT * FROM noticias ORDER BY id_noticia DESC')

    res.render('noticias/noticias',{noticias:result.rows})
})

app.get('/noticia', async(req,res) =>{
    var id= req.query.id
    // res.render('noticias/noticia',{noticia: noticias[id]})
    let result = await db.query('SELECT FROM noticias WHERE id_noticia = $1', [id])
    res.render('noticias/noticia', {noticia:result.rows[0], title: 'Noticia'})
})

app.get('/admin',(req,res) =>{
    // res.render('admin/form_add_noticia')
    if(req.session.autorizado){
        res.render('admin/form_add_noticia', {title:'Admin', autorizado:req.session.autorizado})
    }else{
        res.render('admin/login', {title:'Login'})
    }
})

//rota recurso salvar noticias 
app.post('/admin/salvar-noticia', async (req,res) =>{

    let {titulo, conteudo} = req.body

    await db.query('INSERT INTO noticias(titulo, conteudo) VALUES($1,$2)', [titulo, conteudo], (err, result) =>{
        res.redirect('/noticias')
    })
})
//iniciando o servidor
app.listen(3000,()=> {
    console.log("escutando na porta 3000 com express")
    console.log("Pressione CTRL+C para encerrar")

})