import { Router } from "express";
import { sample_users } from "../data.js";
import jwt from 'jsonwebtoken';
import expressAsyncHandler from "express-async-handler";
import { UserModel } from "../models/user.model.js";
import bcrypt from 'bcryptjs';
import authMiddleware, { isAdmin } from "../middlewares/auth.mid.js";

const router = Router();

// Seed route
router.get("/seed", expressAsyncHandler(async (req, res) => {
    const usersCount = await UserModel.countDocuments();
    if (usersCount > 0) {
        res.send("Seed is already done!");
        return;
    }
    await UserModel.create(sample_users);
    res.send("Seed is done");
}));

// Registration Route
router.post('/register', expressAsyncHandler(async (req, res) => {
    const { name, email, password, address } = req.body;
    const existingUser = await UserModel.findOne({ email });

    if (existingUser) {
        res.status(400).send('User already exists, please login!');
        return;
    }

    const encryptedPassword = await bcrypt.hash(password, 10);

    const newUser = new UserModel({
        name,
        email: email.toLowerCase(),
        password: encryptedPassword,
        address,
        isAdmin: false
    });

    const dbUser = await newUser.save();
    const token = generateTokenResponse(dbUser);

    res.status(200).json({
        id: dbUser.id,
        name: dbUser.name,
        email: dbUser.email,
        address: dbUser.address,
        token: token
    });
}));

// Login Route
router.post('/login', expressAsyncHandler(async (req, res) => {
    const { email, password } = req.body;
    const user = await UserModel.findOne({ email });

    if (!user) {
        res.status(401).json({ message: 'Invalid email or password' });
        return;
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);

    if (!isPasswordMatch) {
        res.status(401).json({ message: 'Invalid email or password' });
        return;
    }

    const token = generateTokenResponse(user);

    res.status(200).json({
        id: user.id,
        name: user.name,
        email: user.email,
        address: user.address,
        token: token,
        isAdmin: user.isAdmin
    });
}));

// Token generation function
const generateTokenResponse = (user) => {
    const token = jwt.sign(
        {
            id: user.id,
            email: user.email,
            isAdmin: user.isAdmin
        },
        process.env.JWT_SECRET || "defaultSecret",
        { expiresIn: "30d" }
    );
    return token;
}

// Admin page route
router.get('/admin-page', authMiddleware, isAdmin, async (req, res) => {
    try {
        const users = await UserModel.find();
        res.status(200).json(users);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
});

// Get all users
router.get('/', expressAsyncHandler(async (req, res) => {
    try {
        const users = await UserModel.find();
        res.status(200).json(users);
    } catch (err) {
        console.log(err);
        res.status(500).send('Server error.');
    }
}));

// Get user by ID
router.get('/:id', expressAsyncHandler(async (req, res) => {
    try {
        const user = await UserModel.findById(req.params.id);
        res.status(200).json(user);
    } catch (err) {
        res.status(500).send('No user found');
    }
}));

// Delete user
router.delete('/delete/:id', expressAsyncHandler(async (req, res) => {
    try {
        const deletedUser = await UserModel.findByIdAndDelete(req.params.id);
        if (!deletedUser) {
            res.status(404).json({ message: 'User not found' });
            return;
        }
        res.status(200).json(deletedUser);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
}));

// Update user
router.put('/update/:id', expressAsyncHandler(async (req, res) => {
    try {
        const { name, email, password, address, isAdmin } = req.body;

        const updateFields = {};
        if (name) updateFields.name = name;
        if (email) updateFields.email = email;
        if (password) {
            const encryptedPassword = await bcrypt.hash(password, 10);
            updateFields.password = encryptedPassword;
        }
        if (address) updateFields.address = address;
        if (isAdmin !== undefined) updateFields.isAdmin = isAdmin;

        const updatedUser = await UserModel.findByIdAndUpdate(req.params.id, updateFields, { new: true });
        res.status(200).json(updatedUser);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
}));

// Update user profile
router.put("/:userId", async (req, res) => {
    try {
        const userId = req.params.userId;
        const { name, address, email } = req.body;
        await UserModel.findByIdAndUpdate(userId, { name, address, email });

        res.status(200).json({ message: "User profile updated successfully" });
    } catch (err) {
        console.log("Error updating user Profile", err);
        res.status(500).json({ message: "Error updating user profile" });
    }
});

export default router;
