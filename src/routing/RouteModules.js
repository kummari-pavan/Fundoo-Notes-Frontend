import { createBrowserRouter,RouterProvider } from "react-router-dom";
import Dashboard from "../components/Dashboard";
import Login from "../components/login/Login";
import Register from "../components/register/Register";
import ArchiveContainer from "../components/archive/ArchiveContainer";
import WelcomePage from "../components/start/Start"
import NotesContainer from "../components/notes/NotesContainer";
import TrashNotesContainer from "../components/trash/TrashContainer";
import { AuthRoute } from "./AuthRoute";
import { ProtectedRoute } from "./ProtectedRoute";



function RouteModules(){
    const routes=createBrowserRouter([
        {
            path: "",
            element: <WelcomePage/>
        },
        {
            path: "login",
            element: <AuthRoute><Login/></AuthRoute>
        },
        {
            path: "register",
            element: <AuthRoute><Register/></AuthRoute>
        },
        {
            path: "dashboard",
            element:<ProtectedRoute><Dashboard/></ProtectedRoute>,
            children:[
                {
                    path: "notes",
                    element: <NotesContainer/>
                },
                {
                    path: "trash",
                    element: <TrashNotesContainer/>
                },
                {
                    path: "archive",
                    element: <ArchiveContainer/>
                }
            ]
        },
        
    ])
    return(
        <RouterProvider router={routes} />
    )

}

export default RouteModules