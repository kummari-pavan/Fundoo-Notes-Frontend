import react from "react";
import { createBrowserRouter,RouterProvider,useNavigate } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import NotesContainer from "./components/notes/NotesContainer"
import Login from "./components/login/Login";
import Register from "./components/register/Register";
import EmptyArchive from "./components/archive/EmptyArchive";
import EmptyTrash from "./components/trash/EmptyTrash";
import WelcomePage from "./components/start/Start"

function RouteModules(){
    const routes=createBrowserRouter([
        {
            path: "",
            element: <WelcomePage/>
        },
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
                },
                {
                    path: "trash",
                    element: <EmptyTrash/>
                },
                {
                    path: "archive",
                    element: <EmptyArchive/>
                }
            ]
        },
        
    ])
    return(
        <RouterProvider router={routes} />
    )

}

export default RouteModules