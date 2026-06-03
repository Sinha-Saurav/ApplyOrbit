import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_KEY
);

export async function signUp(req, res) {
    try {
        const { userName, email, password } = req.body;

        if (!userName || !email || !password) {
            return res.status(400).json({ message: "All fields are required" })
        }

        const { data, error } = await supabase.auth.signUp({
            email: email,
            password: password,
            options: {
                data: {
                    userName,
                    full_name: userName,
                },
                emailRedirectTo: 'http://localhost:5173/auth/verify'
            }
        })

        if (error) {
            return res.status(400).json({ message: error.message })
        }

        res.status(201).json({
            message: "SignUp successful, please verify your email",
            user: data.user
        })
    }
    catch (error) {
        return res.status(400).json({ message: "signUp unsuccessful" })
    }
}

export async function signIn(req, res) {
    try {
        const { email, password } = req.body;

        const { data, error } = await supabase.auth.signInWithPassword({
            email: email.toLowerCase(),
            password: password
        });

        if (error) {
            return res.status(400).json({ message: error.message })
        }

        const userName = data.user.user_metadata.userName
        res.status(200).json({
            message: `Welcome ${userName}`,
            userName: userName,
            email: data.user.email,
            token: data.session.access_token,
            refreshToken: data.session.refresh_token
        })
    }
    catch (error) {
        res.status(400).json({
            message: "Unexpected error occurred"
        })
    }
}

export async function signOut(req, res) {
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
}

export async function forgotPassword(req, res) {
    try {
        const { email } = req.body;

        if (!email) {
            return res.status(400).json("Email is required")
        }

        const { error } = await supabase.auth.resetPasswordForEmail(email, {
            redirectTo: "http://localhost:5173/auth/reset-password"
        })

        if (error) {
            return res.status(200).json({ message: error.message })
        }

        return res.status(200).json({ message: "Password reset email sent" })
    }
    catch (error) {
        return res.status(500).json({ message: "Unexpected error occurred" })
    }
}

export async function resetPassword(req, res) {
    try {
        const { new_password } = req.body;

        const { error } = await supabase.auth.updateUser({
            password: new_password
        });

        if (error) {
            return res.status(400).json({ message: error.message });
        }

        res.status(200).json({ message: "Password updated successfully" });
    }
    catch (error) {
        res.status(500).json({ message: "Unexpected error occurred" });
    }
}

export async function refreshToken(req, res) {
    try {
        const { refreshToken } = req.body;

        const { data, error } = await supabase.auth.refreshSession({
            refresh_token: refreshToken
        });

        if (error) return res.status(401).json({ message: error.message });

        res.status(200).json({
            token: data.session.access_token,
            refreshToken: data.session.refresh_token
        });
    } catch (error) {
        res.status(500).json({ message: "Unexpected error" });
    }
}

export async function updateProfile(req, res) {
    try {
        const { full_name } = req.body;

        const { data, error } = await supabase.auth.admin.updateUserById(
            req.user.id,
            { user_metadata: { full_name } }
        );

        if(error){
            throw error;
        }
        res.status(200).json({message: "Profile updated successfully"});

    }catch(error){
        console.error("Update profile error:", error.message);
        res.status(500).json({ message: "Failed to update profile" });
    }
}

export async function deleteAccount(req, res){
    try{
        const userId = req.user.id;

        const { error: appError } = await supabase
        .from("applications")
        .delete()
        .eq("user_id", userId);

        if(appError) throw appError;
        
        //delete user
        const {error} = await supabase.auth.admin.deleteUser(
            req.user.id
        )

        if(error){
            throw error;
        }
        res.status(200).json({message: "Account successfully deleted"});
    }catch(error){
        console.error("Account delete error: ", error.message);
        res.status(500).json({message: "Failed to delete the account"})
    }
}