import { Globe, LogOut } from "lucide-react";
import Button from "../components/Button";

type NavProps = {
  username: string,
  toggleModal : ()=> void
}

export default function Navbar({username , toggleModal} : NavProps) {

  return (
    <div className="fixed top-0 left-0 w-screen h-14 bg-white border-b border-zinc-200 p-3">
      <div className="main flex justify-between items-center">
        <div className="logo flex items-center gap-2 ml-3">
          <p className="text-white bg-blue-600 rounded-lg px-2.5 py-1 font-bold"> M </p>
          <p className="font-bold text-zinc-800">Mindly</p>
        </div>
        <div className="buttons flex items-center gap-3 mr-6">
          <Button size="sm" variant="secondary" startIcon={<Globe size={16}/>} text="Share Brain" onclick={toggleModal}/>
          <p className="text-sm font-normal text-zinc-700 mx-2">{username ? username : "User"}</p>
          <Button size="sm" variant="ghost" startIcon={<LogOut size={16}/>} text="Logout" />
        </div>
      </div>
    </div>
  )
}

