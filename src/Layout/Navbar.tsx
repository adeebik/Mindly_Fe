import { Globe, LogOut } from "lucide-react";
import Button from "../components/Button";
import { useBrainShareStatusStore } from "../Store/store";

type NavProps = {
  username: string;
  toggleModal: () => void;
};

export default function Navbar({ username, toggleModal }: NavProps) {
  const isShared = useBrainShareStatusStore((state) => state.isShared);

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.reload();
  };

  return (
    <div className="fixed top-0 left-0 w-screen h-14 bg-white border-b border-zinc-200 p-3 z-50">
      <div className="main flex justify-between items-center">
        <div className="logo flex items-center gap-2 ml-3 cursor-pointer" onClick={() => window.location.href = "/"}>
          <p className="text-white bg-blue-600 rounded-lg px-2.5 py-1 font-bold shadow-sm">
            M
          </p>
          <p className="font-bold text-zinc-800 tracking-tight">Mindly</p>
        </div>
        <div className="buttons flex items-center gap-3 mr-6">
          <Button
            size="sm"
            variant={isShared ? "primary" : "secondary"}
            startIcon={<Globe size={16} />}
            text="Share Brain"
            onclick={toggleModal}
          />
          <div className="flex items-center gap-2 border-l border-zinc-200 pl-4 ml-2">
            <p className="text-sm font-medium text-zinc-700">
              {username ? username : "User"}
            </p>
            <Button
              size="sm"
              variant="ghost"
              startIcon={<LogOut size={16} />}
              text="Logout"
              onclick={handleLogout}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
