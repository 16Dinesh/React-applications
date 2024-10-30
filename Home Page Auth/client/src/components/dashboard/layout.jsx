import { Outlet } from "react-router-dom";
import HomeNav from "./header";

export default function UserHomeLayout() {
    return (
        <>
        <HomeNav/>
        <div >
            <Outlet/>
        </div>
        </>
    )
}