import { Outlet } from "react-router-dom";
import CustomerHeader from "./header";

function CustomerLayout() {
    return(
        <div className="flex flex-col bg-white overflow-hidden">
            {/* Common Header */}
            <CustomerHeader/>
             <main className="flex flex-col w-full">
               <Outlet/>
             </main>
        </div>
    )
}

export default CustomerLayout;