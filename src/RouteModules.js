import react from "react";
import { createBrowserRouter,RouterProvider,useNavigate } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import NotesContainer from "./components/notes/NotesContainer"

function RouteModules(){
    const routes=createBrowserRouter([
        {
            path: "dashboard",
            element: <Dashboard/>,
            children:[
                {
                    path: "notes",
                    element: <NotesContainer/>
                }
            ]
        },
        
    ])
    return(
        <RouterProvider router={routes} />
    )

}

export default RouteModules