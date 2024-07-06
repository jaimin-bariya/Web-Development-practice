import express from "express"
import morgan from "morgan"
import {dirname} from "path"
import { fileURLToPath } from "url"

const PORT = 3000

const app = express()

app.use(express.static("public"))
app.use(morgan("combined"))
app.use(express.urlencoded({extended:true}))


app.get("/", (req, res) => {



    res.render("index.ejs", {listOfBlogs: allBlogs})
})



app.get("/about", (req, res) => {
    res.render("about.ejs")
})



app.get("/blogs/:id", (req, res) => {
    const blogID = parseInt(req.params.id)
    const blogDetails = {
        blogID: blogID,
        allBlogs: allBlogs
    }
    res.render("blog.ejs", {blog: blogDetails})
})



app.get("/blogs/:id/delete", (req, res) => {
    const blogID = parseInt(req.params.id)
    res.redirect("/")

    allBlogs.splice(blogID, 1)

})



app.get("/blogs/:id/edit", (req, res) => {
    const blogID = parseInt(req.params.id)
    let blogDetails = {
        blogID: blogID,
        allBlogs: allBlogs
    }
    res.render("editblog.ejs", {blog: blogDetails})

})


app.post("/blogs/:id/save", (req, res) => {
    const blogID = parseInt(req.params.id);

    const blogTitle = req.body["blog-title"]
    const blogContent = req.body["blog-content"]

    allBlogs[blogID].title = blogTitle
    allBlogs[blogID].content = blogContent

    res.redirect(`/blogs/${blogID}`)

    
})


app.get("/blog/create", (req, res) => {
    res.render("createblog.ejs")
})


app.post("/blog/create-blog", (req, res) => {

    const blogTitle = req.body["blog-title"]
    const blogContent = req.body["blog-content"]

    allBlogs.push({
        title: blogTitle,
        content: blogContent
    })

    const blogID = (allBlogs.length)-1

    res.redirect(`/blogs/${blogID}`)
} )





app.listen(PORT, () => {
    console.log("Server is running")
})


















// Starting Blogs
const allBlogs = [

    {
        title: "How to stop going college",
        content: `Go to your HOD and slap him, after then your problem will be solved,  
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio odit sint pariatur illo, 
                repellat ea aliquid, ab provident blanditiis aut ex a fugit incidunt dolores. Minus numquam 
                alias ex aliquid. Nisi molestias animi impedit reprehenderit qui asperiores, accusamus itaque, 
                temporibus in consectetur nam enim ducimus tenetur ad cum repudiandae. Sint quibusdam, corporis 
                iure reiciendis iusto eius quas veniam neque sit autem recusandae nihil architecto libero sapiente
                 corrupti commodi rem. Dolores exercitationem quaerat dignissimos perferendis molestias, rem velit. 
                 Eaque, nam hic illum autem, nihil soluta vero vitae ex veniam numquam impedit debitis, cupiditate quae 
                 magnam blanditiis! Asperiores, facilis saepe. Quas necessitatibus illo provident. Incidunt mollitia 
                 obcaecati, quam perspiciatis eum aspernatur repellendus eaque qui vero, sint ipsam. Amet tempore aperiam 
                 ad quasi porro, voluptatibus error dolorem molestias deserunt at adipisci obcaecati assumenda molestiae 
                 nisi provident iusto reprehenderit suscipit. Voluptatibus, quia voluptates ipsum tempora enim cumque. 
                 Veritatis nisi a beatae modi aspernatur officia dolores dolore quo sapiente quasi corporis itaque quaerat vel,
                  sequi atque fuga dignissimos, nulla eligendi rem. Maiores eius optio quos, nemo sit odio excepturi quas, 
                  blanditiis, ut doloribus inventore facilis aspernatur ex commodi veritatis. Est, beatae voluptates perferendis 
                  cum, esse ratione autem minus corrupti expedita rerum enim quibusdam explicabo delectus harum quae veritatis 
                  atque saepe, illo in debitis aperiam ducimus laboriosam libero? Reprehenderit doloribus, ipsam sint sequi totam 
                  numquam, ullam minus porro maiores, non possimus est dolores hic suscipit rerum at alias architecto saepe illum
                   aliquam dicta molestiae a ipsum quam? Quisquam quaerat perferendis reiciendis fugiat laborum! Numquam sed qui
                    pariatur distinctio nostrum. Vel, quod fugiat mollitia laboriosam maxime tempore aut dolorem ducimus odit 
                    aspernatur quia velit, natus sunt neque voluptates placeat earum consectetur optio? Non iusto ipsa saepe? 
                    Aperiam, recusandae voluptate repellat minima sit exercitationem nostrum ad ex ipsum laudantium adipisci 
                    assumenda nulla unde molestias vitae, praesentium iusto quae!`
    },


    {
        title: "How to complete Project fastly?",
        content: "Leave current project and start new once simple 😅, "
    },


    {
        title: "How to stop going college",
        content: "Go to your HOD and slap him, after then your problem will be solved, Go to your HOD and slap him, after then your problem will be solved, Go to your HOD and slap him, after then your problem will be solved"
    },


    {
        title: "How to complete Project fastly?",
        content: "Leave current project and start new once simple 😅, "
    },

    {
        title: "How to stop going college",
        content: "Go to your HOD and slap him, after then your problem will be solved"
    },


    {
        title: "How to complete Project fastly?",
        content: "Leave current project and start new once simple 😅, "
    },

    {
        title: "How to stop going college",
        content: "Go to your HOD and slap him, after then your problem will be solved"
    },


    {
        title: "How to complete Project fastly?",
        content: "Leave current project and start new once simple 😅, "
    },

    {
        title: "How to stop going college",
        content: "Go to your HOD and slap him, after then your problem will be solved"
    },


    {
        title: "How to complete Project fastly?",
        content: "Leave current project and start new once simple 😅, "
    },

    {
        title: "How to stop going college",
        content: "Go to your HOD and slap him, after then your problem will be solved"
    },


    {
        title: "How to complete Project fastly?",
        content: "Leave current project and start new once simple 😅, "
    },

]