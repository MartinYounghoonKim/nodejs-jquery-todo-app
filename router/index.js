module.exports = (app,bodyParser, connection)=>{
    app.get('/',(req,res)=>{
		res.render('index.ejs',{ pageInformation:"Main" });
    });
    /*
    app.get('/view/:filter',(req,res)=>{
        const todosFilter = req.params.filter;
		res.render('index.ejs',{ pageInformation:"Main", filter : todosFilter });
    });*/
    app.get('/api/Todos/:filter',(req,res)=>{
        const filter = req.params.filter;
        let selectQuery = "";
        switch(filter) {
            case 'all' : selectQuery = 'SELECT * FROM todos';
            break;
            case 'completed' : selectQuery = 'SELECT * FROM todos WHERE isCompleted=1';
            break;
            case 'active' : selectQuery = 'SELECT * FROM todos WHERE isCompleted=0';
            break;
        }

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

        connection.query(deleteQuery,[idx], (err, result, fields)=>{
            if(err){
                console.log(err);
                res.status(500).send("Error");
            } else {
                res.send(result);
            }
        })
    });
    app.post('/api/CheckTodo',(req,res)=>{
        let isCompleted = req.body.isCompleted;
        let idx = req.body.idx;
        let updateQuery='UPDATE todos SET isCompleted=? WHERE idx=?';

        connection.query(updateQuery,[isCompleted, idx], (err, result, fields)=>{
            if(err){
                console.log(err);
                res.status(500).send("Error");
            } else {
                res.send(result);
            }
        })
    });
    app.get('/api/CheckTodoAll', (req,res)=>{
        let selectQuery = 'SELECT isCompleted FROM todos WHERE isCompleted=1';
        connection.query(selectQuery, (err,result,fields)=>{
            if(err){
                console.log(err);
                res.status(500).send("Error");
            } else {
                res.send(result);
            }
        })
    })
    app.post('/api/CheckTodoAll', (req,res)=>{
        const isCompletedAllTodos = req.body.isCompleted;
        let updateQuery = 'UPDATE todos SET isCompleted=?';
        connection.query(updateQuery,[isCompletedAllTodos], (err,result,fields)=>{
            if(err){
                res.status(500).send("Error");
            } else {
                res.send(result);
            }
        })
    })
}
