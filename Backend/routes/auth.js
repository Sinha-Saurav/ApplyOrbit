import { createClient } from "@supabase/supabase-js";
import express from 'express';

const authRouter = express.Router()
const supabase = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_KEY
);

authRouter.post("/signUp", async(req, res)=>{
    try{
        const{userName, email, password } = req.body;

        if(!userName || !email || !password){
            return res.status(400).json({message: "All fields are required"})
        }

        const{ data, error } = await supabase.auth.signUp({
            email: email,
            password: password,
            options: {
                data: { userName }
            }
        })

        if(error){
            return res.status(400).json({message: error.message})
        }

        res.status(201).json({
            message: "SignUp successful, please verify your email",
            user: data.user
        })
    }
    catch(error){
        return res.status(400).json({message: "signUp unsuccessful"})
    }
})

authRouter.post("/login", async(req, res)=>{
    try{
        const{email, password} = req.body;

        const{data, error} = await supabase.auth.signInWithPassword({
            email: email.toLowerCase(),
            password: password
        });

        if(error){
            return res.status(400).json({message: error.message})
        }

        const userName = data.user.user_metadata.userName
        res.status(200).json({
            message: `Welcome ${userName}`,
            token: data.session.access_token
        })
    }
    catch(error){
        res.status(400).json({
            message: "Unexpected error occurred"
        })
    }
})

authRouter.post("/signOut", async(req, res) => {
    try {
        const { error } = await supabase.auth.signOut();

        if (error) {
            return res.status(400).json({ message: error.message });
        }

        res.status(200).json({ message: "Signed out successfully" });
    }
    catch (error) {
        res.status(500).json({ message: "Unexpected error occurred" });
    }
})

authRouter.get("/verify", async(req, res)=>{
    try{
        const {token_hash, type} = req.query;

        if(token_hash && type){
            const { error } = await supabase.auth.verifyOtp({
                type,
                token_hash,
            })

            if(error){
                return res.status(400).json({message: error.message})
            }

            res.status(200).json({message: "Email verified successfully"})
        }

    }catch(error){
        return res.status(500).json({message: "Unexpected error occurred"})
    }
})

authRouter.post('/forgot-password', async(req, res)=>{
    try{
        const{email} = req.body;

        if(!email){
            return res.status(400).json("Email is required")
        }

        const {error} = await supabase.auth.resetPasswordForEmail(email, {
            redirectTo: "http://localhost:5173/auth/reset-password"
        })

        if(error){
            return res.status(200).json({message: error.message})
        }

        return res.status(200).json({ message: "Password reset email sent" })
    }
    catch(error){
        return res.status(500).json({message: "Unexpected error occurred"})
    }
})

authRouter.post("/reset-password", async(req, res)=>{
    try{
        const { new_password } = req.body;

        const { error } = await supabase.auth.updateUser({
            password: new_password
        });

        if (error) {
            return res.status(400).json({ message: error.message });
        }

        res.status(200).json({ message: "Password updated successfully" });
    }
    catch(error){
        res.status(500).json({ message: "Unexpected error occurred" });
    }
})

export default authRouter;