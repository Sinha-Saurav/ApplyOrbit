import { createClient } from "@supabase/supabase-js";
import express from 'express';
import{
    signUp,
    signIn,
    signOut,
    forgotPassword,
    resetPassword,
    refreshToken,
    updateProfile,
    deleteAccount
}from "../controllers/authController.js"
import protect from "../middleware/protect.js";

export const authRouter = express.Router()

authRouter.post("/signUp", signUp)
authRouter.post("/login", signIn)
authRouter.post("/signOut", signOut)
authRouter.post('/forgot-password', forgotPassword)
authRouter.post("/reset-password", resetPassword)
authRouter.patch("/update-profile", protect, updateProfile)
authRouter.post("/refresh", refreshToken);
authRouter.delete("/delete-account", protect, deleteAccount)
