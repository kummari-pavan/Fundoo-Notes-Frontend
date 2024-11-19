import react from "react";
import { createBrowserRouter,RouterProvider,useNavigate } from "react-router-dom";
import Register from "./components/register_page/Register";
import Login from "./components/login_page/Login";
import Dashboard from "./components/dashboard/Dashboard";
import NotesContainer from "./components/notes_container/Form";
import EmptyTrash from "./components/trash/Emptytrash"
import EmptyArchive from "./components/archive/Emptyarchive"

function RouteModules(){
    const routes=createBrowserRouter([
        {
            path: "",
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