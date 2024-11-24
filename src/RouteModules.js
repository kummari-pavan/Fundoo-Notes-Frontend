import react from "react";
import { createBrowserRouter,RouterProvider,useNavigate } from "react-router-dom";
import SwipeDrawer from "./components/SwiperDrawer";

function RouteModules(){
    const routes=createBrowserRouter([
        {
            path: "",
            element: <SwipeDrawer/>
        }
        
    ])
    return(
        <RouterProvider router={routes} />
    )

}

export default RouteModules