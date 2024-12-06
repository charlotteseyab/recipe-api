import { Router } from "express";
import { deleteProfile, getProfile, login, logout, register,  updateProfile } from "../controllers/user.js";
import { hasPermission, isAuthenticated } from "../middleware/auth.js";
import { recipeIconUpload } from "../middleware/upload.js";


export const userRouter = Router();

userRouter.post('/register', register);


userRouter.post('/login', login);

userRouter.get('/profile', isAuthenticated, getProfile);

userRouter.patch('/profile', isAuthenticated, hasPermission('update_profile'), recipeIconUpload.single('avatar'), updateProfile);

userRouter.delete('/profile', isAuthenticated, deleteProfile);

userRouter.post('/logout', isAuthenticated, logout);

export default userRouter;
