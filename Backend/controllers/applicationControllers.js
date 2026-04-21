import supabase from "../db/supabaseClient.js";

export async function getApplications(req, res){

    try{
        const userId = req.user.id
        const { data, error } = await supabase
        .from('applications')
        .select('*')
        .eq("user_id", userId)
        .order('created_at', {
        ascending: false,
        })

        if(error){
            throw error
        }
        res.status(200).json(data)
    }catch(error){
        console.error('Error fetching application:', error.message)
        res.status(500).json({error: error.message});
    }
}

export async function addApplications(req, res){
    try{
        const userId = req.user.id;
        const{company, role, status, date_applied, jd_link, notes} = req.body;

        if(!company || !role){
            return res.status(400).json({message: "Company name and role is required"})
        }
        const { data, error } = await supabase
            .from('applications')
            .insert([{user_id:userId, company, role, status, date_applied, jd_link, notes }])
            .select();
    
            if(error){
                throw error
            }

        res.status(201).json(data[0])

    }catch(error){
        console.error('Error adding application:',error.message)
        res.status(500).json({error: error.message});
    }
}

export async function deleteApplications(req, res){
    try{
        const {id} = req.params;
        const userId = req.user.id;
        
        const {error} = await supabase
        .from('applications')
        .delete()
        .eq('id',id)
        .eq('user_id', userId)

        if(error) throw error;
        res.status(200).json({message: 'Application deleted'})
    }catch(error){
        console.error('Error deleting application:', error.message)
        res.status(500)
    }
}

export async function updateApplications(req, res){
    try{
        const { id } = req.params;
        const updates = req.body;
        const userId = req.user.id;

        const {data, error} = await supabase
        .from('applications')
        .update(updates)
        .eq('id', id)
        .eq('user_id', userId)
        .select()

        if(error){
            throw error;
        }
        res.status(200).json(data[0])
    }catch(error){
        console.error('Error updating the application:', error.message)
        res.status(500).json({error: error.message})
    }
}


