import react from "react";
import { createBrowserRouter,RouterProvider,useNavigate } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import NotesContainer from "./components/notes/NotesContainer"
import Login from "./components/login/Login";
import Register from "./components/register/Register";

function RouteModules(){
    const routes=createBrowserRouter([
        {
            path: "login",
            element: <Login/>
        },
        {
            path: "register",
            element: <Register/>
        },
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