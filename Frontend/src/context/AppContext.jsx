import React from 'react'

export const AppContext = React.createContext();

export function AppProvider({ children }) {
    const [apps, setApps] = React.useState([]);
    const [selectedApp, setSelectedApp] = React.useState(null);

    async function fetchApps() {
        try {
            const token = await getToken();
            if (!token) return;

            const res = await fetch("/api/applications", {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            })

            if (!res.ok) {
                throw new Error("Failed to fetch applications");
            }
            const data = await res.json();
            setApps(data);

        } catch (err) {
            console.log("Fetch applications error: ", err);
        }

    }

    async function addApp(payLoad) {
        try {
            const token = await getToken()
            const res = await fetch("/api/applications", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify(payLoad),
            });

            if (!res.ok) {
                const errorData = await res.json();
                throw new Error(errorData.message || "Failed to add application");
            }
            const newApp = await res.json();
            setApps(prev => [...prev, newApp]);

            return { success: true };

        } catch (error) {
            console.error("Add App Error:", error);
            return { success: false, message: error.message };
        }

    }

    async function editApp(id, payLoad) {
        try {

            const token = await getToken()
            const res = await fetch(`/api/applications/${id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify(payLoad),
            });

            if (!res.ok) {
                const errorData = await res.json();
                throw new Error(errorData.message || "Failed to edit application")
            }

            const updated = await res.json();
            setApps(prev => prev.map(app => app.id === id ? updated : app));

            return { success: true }

        } catch (err) {
            console.error("Add App Error:", err);
            return { success: false, message: err.message };
        }

    }

    async function deleteApp(id) {
        try {
            const token = await getToken();

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

    async function getToken() {
        const token = localStorage.getItem("token");
        const refreshToken = localStorage.getItem("refreshToken");

        if (!token || !refreshToken) return null;

        // decode token to check expiry
        const payload = JSON.parse(atob(token.split(".")[1]));
        const isExpired = payload.exp * 1000 < Date.now();

        if (!isExpired) return token;

        // refresh if expired
        const res = await fetch("/api/auth/refresh", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ refreshToken }),
        });

        const data = await res.json();
        localStorage.setItem("token", data.token);
        localStorage.setItem("refreshToken", data.refreshToken);
        return data.token;
    }

    return (
        <AppContext.Provider value={{apps, setApps, addApp, editApp, deleteApp, fetchApps, getToken, setSelectedApp }}>
            {children}
        </AppContext.Provider>
    )
}