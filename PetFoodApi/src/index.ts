import { app } from "./app";
import { ProductController } from "./controller/ProductController";
import { UserController } from "./controller/UserController";


//Usuário
app.post("/signup", new UserController().signupPeople)
app.post("/login", new UserController().login)
app.get("/getProfile/:id", new UserController().getProfile)
app.get("/getAllUsers", new UserController().getAllUsers)
app.put("/updateProfile", new UserController().updateProfile)


//Produtos
app.post("/createProduct", new ProductController().createProduct)
app.get("/getProducts", new ProductController().getProduct)
app.post("/buyProduct", new ProductController().buyProduct)
app.delete("/deleteProduct", new ProductController().deleteProduct)