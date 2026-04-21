import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_KEY
)

const protect = async (req, res, next) => {
    try{

        const token = req.headers.authorization?.split(" ")[1];

        if(!token){
            return res.status(401).json({
                success: false,
                message: "No token provided",
            })
        }

        const {
            data: {user},
            error,
        } = await supabase.auth.getUser(token);

        req.user = user;

        next();
    }
    catch(error){
        return res.status(500).json({
            success: false,
            message: "Server Error",
            error: error.message,
        });
    }
}

export default protect