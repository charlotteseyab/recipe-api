import { expressjwt } from "express-jwt";
import { User } from "../models/user.js";
import { permissions } from "../utils/rbac.js";

export const isAuthenticated = expressjwt({
    secret: process.env.JWT_SECRET,
    algorithms: ["HS256"],
});

export const hasPermission = (action) => {
    return async (req, res, next) => {
        try {
            const user = await User.findById(req.auth.id);
            const permission = permissions.find((value) => value.role === user.role);

            if (!permission) {
                return res.status(403).json({message: "No permission found"});
            }

            if (permission.actions.includes(action)) {
                next();
            } else {
                return res.status(403).json({message: "You are not authorized to perform this action"});
            }

        } catch (error) {
            next(error)
        }
    }
}
   
