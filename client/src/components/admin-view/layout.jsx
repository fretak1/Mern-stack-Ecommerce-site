import { Outlet } from "react-router-dom"; // ✅ Import Outlet
import AdminHeader from "./header";
import AdminSideBar from "./sidebar";
import { useState } from "react";

function AdminLayout() {

   const [openSideBar,setOpenSideBar] = useState(false)

    return (
        <div className="flex min-h-screen w-full">
            {/* admin sidebar */}
            <AdminSideBar open={openSideBar} setopen={setOpenSideBar}/>
            <div className="flex flex-1 flex-col">
                {/* admin header */}
                <AdminHeader setOpen={setOpenSideBar} />
                <main className="flex flex-col flex-1 bg-muted/40 p-4 md:p-6">
                    <Outlet /> {/* ✅ Will now work */}
                </main>
            </div>
        </div>
    );
}

export default AdminLayout;
