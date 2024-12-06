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

            // Check if user exists
            if (!user) {
                return res.status(404).json({ message: "User not found" });
            }

            // Check if permissions array is defined
            if (!permissions || permissions.length === 0) {
                return res.status(500).json({ message: "Permissions configuration is missing" });
            }

            const permission = permissions.find((value) => value.role === user.role);

            // Check if permission exists for the user's role
            if (!permission) {
                return res.status(403).json({ message: "No permission found for this role" });
            }

            // Check if the action is included in the user's permissions
            if (permission.actions.includes(action)) {
                return next(); // Proceed to the next middleware
            } else {
                return res.status(403).json({ message: "You are not authorized to perform this action" });
            }

        } catch (error) {
            next(error); // Pass the error to the next middleware
        }
    }
}
   
