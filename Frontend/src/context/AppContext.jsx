import React from 'react'

export const AppContext = React.createContext();

export function AppProvider({ children }) {
    const [apps, setApps] = React.useState([]);
    const [selectedApp, setSelectedApp] = React.useState(null);

    React.useEffect(() => {
        async function fetchApps() {
            try{
                const token = localStorage.getItem("token");
                if (!token) return;
    
                const res = await fetch("/api/applications", {
                    headers: {
                        "Authorization": `Bearer ${token}`
                    }
                })

                if(!res.ok){
                    throw new Error("Failed to fetch applications");
                }
                const data = await res.json();
                setApps(data);

            }catch(err){
                console.log("Fetch applications error: ", err);
            }
    
            fetchApps()
            }
    }, [])

    async function addApp(payLoad) {
        try{
            const token = localStorage.getItem("token")
            const res = await fetch("/api/applications", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify(payLoad),
            });

            if(!res.ok){
                const errorData = await res.json();
                throw new Error(errorData.message || "Failed to add application");
            }
            const newApp = await res.json();
            setApps(prev => [...prev, newApp]);

            return {success:true};

        }catch (error) {
            console.error("Add App Error:", error);
            return { success: false, message: error.message };
        }

    }

    async function editApp(id, payLoad) {
        try{

            const token = localStorage.getItem("token")
            const res = await fetch(`/api/applications/${id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify(payLoad),
            });

            if(!res.ok){
                const errorData = await res.json();
                throw new Error(errorData.message || "Failed to edit application")
            }
            
            const updated = await res.json();
            setApps(prev => prev.map(app => app.id === id ? updated : app));

            return {success:true}

        }catch(err){
            console.error("Add App Error:", error);
            return { success: false, message: error.message };
        }

    }

    async function deleteApp(id) {
        try {
            const token = localStorage.getItem("token");

            const res = await fetch(`/api/applications/${id}`, {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            if (!res.ok) {
                const errorData = await res.json();
                throw new Error(errorData.message || "Failed to delete application");
            }

            setApps(prev => prev.filter(app => app.id !== id));

            return { success: true };

        } catch (error) {
            console.error("Delete App Error:", error);
            return { success: false, message: error.message };
        }
    }

    return (
        <AppContext.Provider value={{ apps, setApps, addApp, editApp, deleteApp, selectedApp, setSelectedApp }}>
            {children}
        </AppContext.Provider>
    )
}