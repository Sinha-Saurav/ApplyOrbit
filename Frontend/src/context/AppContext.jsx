import React from 'react'
import MOCK_APPS from '../data/mockData'

export const AppContext = React.createContext();

export function AppProvider({children}){
    const [apps, setApps] = React.useState(MOCK_APPS);
    const [selectedApp, setSelectedApp] = React.useState(null); 

    const addApp = (newApp) => setApps((prev) => [...prev, newApp])

    const editApp = (updateApp) => setApps((prev) => 
        prev.map((app) => app.id === updateApp.id? updateApp: app)
    )

    return (
        <AppContext.Provider value={{apps, setApps, addApp, editApp, selectedApp, setSelectedApp}}>
            {children}
        </AppContext.Provider>
    )
}