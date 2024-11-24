import react from "react";
import { createBrowserRouter,RouterProvider,useNavigate } from "react-router-dom";
import SwipeDrawer from "./components/SwiperDrawer";
import DisplayNotes from "./components/notes/Notes"
import NotesContainer from "./components/notes/NotesContainer"

function RouteModules(){
    const routes=createBrowserRouter([
        {
            path: "notes",
            element: <NotesContainer/>
        },
        {
            path: "dashboard",
            element: <SwipeDrawer/>,
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