module.exports = (app,bodyParser, connection)=>{
    app.get('/',(req,res)=>{
		res.render('index.ejs',{pageInformation:"Main"});
    });
    app.get('/api/Todos',(req,res)=>{
        let selectQuery = 'SELECT * FROM todos';
        connection.query(selectQuery, (err,result, fields)=>{
            if(err){
                console.log(err);
                res.status(500).send("Error");
            } else {
                res.send(result);
            }
        });
    });
    app.post('/api/Todos',(req,res)=>{
        let text = req.body.text;
        let insertQuery='INSERT INTO todos(todo) VALUES (?)';

        connection.query(insertQuery,[text], (err, result, fields)=>{
            if(err){
                console.log(err);
                res.status(500).send("Error");
            } else {
                res.send(result);
            }
        })
    });
    app.post('/api/DeleteTodo',(req,res)=>{
        let idx = req.body.idx;
        let deleteQuery='DELETE FROM todos WHERE idx=?';

        connection.query(insertQuery,[text], (err, result, fields)=>{
            if(err){
                console.log(err);
                res.status(500).send("Error");
            } else {
                res.send(result);
            }
        })
    })
}
