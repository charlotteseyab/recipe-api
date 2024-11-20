import { Router } from "express";
import { deleteProfile, getProfile, login, logout, regsiter, updateProfile } from "../controllers/user.js";
import { hasPermission, isAuthenticated } from "../middleware/auth.js";


export const userRouter = Router();

userRouter.post('/register', regsiter);


userRouter.post('/login', login);

userRouter.get('/profile', isAuthenticated, getProfile);

userRouter.patch('/profile', isAuthenticated, hasPermission('update_profile'), updateProfile);

userRouter.delete('/profile', isAuthenticated, deleteProfile);

userRouter.post('/logout', isAuthenticated, logout);

export default userRouter;
