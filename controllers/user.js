import { User } from "../models/user.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { loginValidator, registerValidator, updateProfileValidator } from "../validators/user.js";


export const register = async (req, res, next) => {
    // Validate the request body
    const { error, value } = registerValidator.validate(req.body);

    if (error) {
        return res.status(422).json({ error: "Validation Failed", details: error.details });
    }

    const { name, email, password, ...rest } = value;

    //check required fields
    if (!name || !email || !password) {
        return res.status(400).json({ message: "All fields are required" });
    }

    // //check if email is valid
    // if (!validator.isEmail(email)) {
    //     return res.status(400).json({ message: "Invalid email" });
    // }

    //check password length
    if (password.length < 6) {
        return res.status(400).json({ message: "Password must be at least 6 characters long" });
    }

    // Check if the user already exists

    try {
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res
                .status(409)
                .json({ message: "User already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user

        const newUser = new User({
            name,
            email,
            password: hashedPassword,
            ...rest,
        });

        // Save the user to the database

        const user = await newUser.save();

        // Generate a JWT token
        const token = jwt.sign({
            id: user._id,
        },
            process.env.JWT_SECRET,
            { expiresIn: "1d" }
        );

         // Remove password from response
         const userObject = user.toJSON();
         const { password: _, ...userWithoutPassword } = userObject;
 
         const response = {
             token,
             user: userWithoutPassword
         };

        // const response = {
        //     token,
        //     ...rest 
        // }

        // Send the response

        res.status(201).json({ message: "User created successfully", user: userWithoutPassword, token });
    } catch (error) {
        next(error);
    }
};


export const login = async (req, res, next) => {
    // Validate the request body
    const { error, value } = loginValidator.validate(req.body);

    if (error) {
        return res.status(422).json({ error: "Validation error", details: error.details })
    }
    const { email, password } = value;

    try {
        // Check if the user exists
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: "Invalid email or password" });
        }

        // Check if the password is correct
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: "Invalid email or password" });
        }

        // Generate a JWT token
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1d" });

        // Remove password from response
        const userObject = user.toJSON();
        const { password: _, ...userWithoutPassword } = userObject;

        const response = {
            token,
            user: userWithoutPassword
        };


        res.status(200).json(response);
    } catch (error) {
        next(error);
    }
};

export const getProfile = async(req, res, next) => {
    try {
        // Find the user by id
        const user = await User
            .findById(req.auth.id)
            .select({ password: false });

        // Send the response
        res.status(200).json(user);
    } catch (error) {
        next(error);
    }
};

 export const updateProfile = async (req, res, next) => {
   try {
     // Validate the request body
     const {error, value} = updateProfileValidator.validate({
        ...req.body, 
        avatar: req.file?.filename,
    });
    
     if(error) {
         return res.status(422).json({error:"Validation error", details: error.details});
     }

     // Find the user by id
 
     const oldUser = await User.findById(req.auth.id);
     if(!oldUser) {
         return res.status(404).json({message: "User not found"});
     }

     // Update the user
 
     const updatedUser = await User.findByIdAndUpdate(req.auth.id, value,  {new: true});

     // Generate a JWT token
 
     const token = jwt.sign({
        id: updatedUser._id}, 
        process.env.JWT_SECRET, 
        {expiresIn: "1d"});

     // Send the response
        
     const response = {
         token,
         user: updatedUser
     };
 
     res.status(200).json(response);
   } catch (error) {
    next(error);
   }
 };

 export const deleteProfile = async (req, res, next) => {
    try {
        // Find the user by id
        await User.findByIdAndDelete(req.auth.id);

        // Send the response
        res.status(200).json({message: "User deleted successfully"});
    } catch (error) {
        next(error);
    }
 };

//  export const followCook = async (req, res, next) => {
    // try         const followerId = req.auth.id;
    //     const cookId = req.body.cookId;

//         const follower = await User.findByIdAndUpdate(followerId, {$addToSet: {following: cookId}}, {new: true});
//     } catch (error) {
//         next(error);
//     }
//  };

 export const logout = async (req, res, next) => {
   try {
    // Get the token from the request headers   
    const token = req.headers.authorization.split(" ")[1];

    // Create a new blacklisted token
    const blacklistedToken = new BlacklistedToken({token});
    await blacklistedToken.save();

    // Send the response
    res.status(200).json({message: "Logout successful"});
   } catch (error) {
    next(error);
   }
 };

