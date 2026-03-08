import { useNavigate } from "react-router-dom";
import { MoveLeft, HelpCircle } from "lucide-react";
import Button from "../components/Button";

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full text-center space-y-8">
        <div className="relative">
          <div className="absolute inset-0 flex items-center justify-center opacity-10">
            <h1 className="text-[200px] font-black">404</h1>
          </div>
          <div className="relative flex justify-center">
            <div className="p-6 bg-white rounded-3xl shadow-xl border border-zinc-100 ring-1 ring-zinc-200/50">
              <HelpCircle size={64} className="text-blue-600 animate-pulse" />
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <h2 className="text-3xl font-bold text-zinc-900 tracking-tight">
            Lost in thought?
          </h2>
          <p className="text-zinc-600 text-lg leading-relaxed">
            The link you're looking for doesn't exist or might have been moved.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          <Button
            variant="primary"
            size="md"
            text="Back to Dashboard"
            startIcon={<MoveLeft size={18} />}
            onclick={() => navigate("/dashboard")}
            fullWidth
          />
        </div>

        <p className="text-sm text-zinc-400 font-medium">
          Mindly &copy; 2026
        </p>
      </div>
    </div>
  );
}
