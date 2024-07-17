import express from 'express'
import pg from 'pg'


// CONSTRAINTS 
const PORT = 3000
let userid = 1
let alltask = []

// make app 
const app = express()


// pg config 
const db = new pg.Client({
    database: 'ToDoList',
    host: 'localhost',
    port: '5432',
    user: 'postgres',
    password: 'jaimin16',
})


// set middlewares
app.use(express.static("public"))
app.use(express.urlencoded({extended:true}))




try {

    db.connect()
    console.log("Databse connected...")


    // app routing start...

    app.get("/",  async (req, res) => {

        alltask = await getAlltask(userid)




        res.render("index.ejs", {alltask: alltask})
    })



    app.post("/edit", async (req, res) => {



        if ((req.body.type) === 'edit-task') {
            const taskid = req.body.taskid
            const taskUpdate = req.body.task
            console.log(taskUpdate)

            await updateTask(taskUpdate, taskid, userid)

        }
        else {
            const taskid = req.body.taskid
            await deleteTask(taskid, userid)

        }


        res.redirect("/")

    })




    app.post("/task-add", async (req, res) => {

        const task = req.body.task
        const task_status = 'pending'


        await newTaskAdd(userid, task, task_status)


        alltask = await getAlltask(userid)

        res.redirect("/")

    })






    app.listen(PORT, () => {
        console.log("Server is running on port " + PORT)
    })


}
catch {

}






async function getAlltask(userid) {

    try {



        const result = await db.query('SELECT * FROM tasks WHERE userid = $1 ORDER BY taskid ASC', [userid])


        return result.rows
    }
    catch {
        console.error("Task not fetched")
    }

}


async function newTaskAdd(userid, task, task_status) {

    try {
        const query = 'INSERT INTO tasks (task, status, userid) VALUES ($1, $2, $3)'
        const values = [task, task_status, userid]
        db.query(query, values)
    } catch {
        console.error("Error while adding task to DB")
    }

}



async function updateTask(task, taskid, userid) {

    try {

        db.query("UPDATE tasks SET task = $1 WHERE taskid = $2 AND userid = $3", [task, taskid, userid])

    }
    catch {
        console.error("Not edit task in DB")
    }
}


async function deleteTask(taskid, userid) {
    db.query('DELETE FROM tasks WHERE taskid = $1 AND userid = $2', [taskid, userid])
}