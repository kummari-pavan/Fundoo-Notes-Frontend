import react from "react";
import { createBrowserRouter,RouterProvider,useNavigate } from "react-router-dom";
import Register from "./components/register_page/Register";
import Login from "./components/login_page/Login";
import Dashboard from "./components/dashboard/Dashboard";
import NotesContainer from "./components/notes_container/NotesContainer";

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
            element: <Dashboard/>
        },
        {
            path: "notes",
            element: <NotesContainer/>
        }

    ])
    return(
        <RouterProvider router={routes} />
    )

}

export default RouteModules