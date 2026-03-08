import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { Contents } from "../Types/types";
import { Loader2 } from "lucide-react";
import Card from "../components/Card";

export default function SharedMind() {
  const { hash } = useParams<{ hash: string }>();
  const [contents, setContents] = useState<Contents[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSharedMind = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await axios.get(
          `${BACKEND_URL}/share/mind/${hash}`,
        );
        setContents(response.data.contents);
      } catch (err: any) {
        console.error("Error fetching shared mind:", err);
        setError(
          err.response?.data?.msg || "Mind not found or link expired",
        );
      } finally {
        setLoading(false);
      }
    };

    if (hash) {
      fetchSharedMind();
    }
  }, [hash]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2
            className="animate-spin text-blue-600 mx-auto mb-4"
            size={48}
          />
          <p className="text-gray-600">Loading shared mind...</p>
        </div>
      </div>
    );
  }

  if (error || contents.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
        <div className="text-center max-w-md">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-red-600 text-2xl">✕</span>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Mind Not Found
          </h2>
          <p className="text-gray-600 mb-6">
            {error || "This mind doesn't exist or has no public content."}
          </p>
          <Link
            to="/login"
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 inline-block"
          >
            Go to Mindly
          </Link>
        </div>
      </div>
    );
  }

  const username = contents[0]?.userId?.name || "Someone";
  const capitalizedUsername = username.charAt(0).toUpperCase() + username.slice(1);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      <nav className="bg-white/80 backdrop-blur-sm border-b border-gray-200 px-6 py-4 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white font-bold text-xl relative overflow-hidden group">
               <span className="relative z-10">M</span>
               <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/20 to-white/0 transform -translate-x-full group-hover:translate-x-full transition-transform duration-500"></div>
            </div>
            <h1 className="text-xl font-bold text-gray-900">Mindly</h1>
          </div>
          <div className="flex items-center gap-4">
             <span className="hidden sm:inline text-sm text-gray-600">Explore {capitalizedUsername}'s Brain</span>
            <Link
                to="/signup"
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm font-medium shadow-md shadow-blue-200 transition-all hover:-translate-y-0.5"
            >
                Create Your Brain
            </Link>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto p-6 py-12">
        <div className="mb-12">
            <h2 className="text-4xl font-extrabold text-gray-900 tracking-tight">{capitalizedUsername}'s Mind</h2>
            <p className="text-lg text-gray-600 mt-3 max-w-2xl">Exploring a curated collection of thoughts, inspirations, and digital treasures.</p>
        </div>

        <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
            {contents.map((content) => (
                <div key={content._id} className="break-inside-avoid">
                    <Card
                        content={content}
                        sharedContents={{}} // No share status needed for view-only
                        // onShare and onDelete are omitted for view-only mode
                    />
                </div>
            ))}
        </div>

        <footer className="mt-20 py-8 border-t border-gray-200 text-center text-sm text-gray-500">
            <p>© 2026 Mindly. All rights reserved.</p>
            <p className="mt-2">Shared via <Link to="/" className="text-blue-600 hover:underline">Mindly</Link> - Your Digital Brain</p>
        </footer>
      </main>
    </div>
  );
}
