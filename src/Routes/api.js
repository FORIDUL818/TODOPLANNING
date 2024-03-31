const express=require("express")
const userRagistraton=require("../Controller/userController");
const authMiddlewere = require("../Middlewere/authMiddlewere");
const todoController=require("../Controller/ToDoController")
const router=express.Router()

router.post("/user-ragistration",userRagistraton.Ragistration);
router.post("/user-login",userRagistraton.login);
router.post("/profile-update",authMiddlewere,userRagistraton.profileUpdate);
router.get("/user-details",authMiddlewere,userRagistraton.profileDetails);
router.get("/user-email-recovery/:email",userRagistraton.RecoverVaryfyEmail);
router.get("/user-otp-varify-recovery/:email/:otp",userRagistraton.OtpVarification);
router.post("/resetPassword",userRagistraton.passwordReset);

// todo routes start
  router.post("/ToDo-create",authMiddlewere,todoController.CreateTodo)
  router.get("/ToDo-update/:id/:status",authMiddlewere,todoController.UpdateToDo)
  router.get("/ToDo-delete/:id",authMiddlewere,todoController.DeleteToDo)
  router.get("/todo-list-by-status/:status",authMiddlewere,todoController.TodoListByStatus)
  router.get("/todo-count-by-status",authMiddlewere,todoController.TodoCountBystatus)
// todo routes end
module.exports=router;

