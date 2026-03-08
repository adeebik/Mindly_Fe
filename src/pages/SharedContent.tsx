import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { Contents } from "../Types/types";
import { Loader2, ExternalLink } from "lucide-react";
import YoutubeEmbed from "../components/YoutubeEmbed";
import TwitterEmbed from "../components/TwitterEmbed";
import Tags from "../components/Tags";

export default function SharedContent() {
  const { hash } = useParams<{ hash: string }>();
  const [content, setContent] = useState<Contents | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSharedContent = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await axios.get(
          `${BACKEND_URL}/share/content/${hash}`,
        );
        setContent(response.data.content);
      } catch (err: any) {
        console.error("Error fetching shared content:", err);
        setError(
          err.response?.data?.msg || "Content not found or link expired",
        );
      } finally {
        setLoading(false);
      }
    };

    if (hash) {
      fetchSharedContent();
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
          <p className="text-gray-600">Loading shared content...</p>
        </div>
      </div>
    );
  }

  if (error || !content) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
        <div className="text-center max-w-md">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-red-600 text-2xl">✕</span>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Content Not Found
          </h2>
          <p className="text-gray-600 mb-6">
            {error || "This content doesn't exist or has been removed."}
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      <nav className="bg-white/80 backdrop-blur-sm border-b border-gray-200 px-6 py-4">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center">
              <span className="text-white font-bold text-xl">M</span>
            </div>
            <h1 className="text-xl font-bold text-gray-900">Mindly</h1>
          </div>
          <Link
            to="/signup"
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm font-medium"
          >
            Create Your Brain
          </Link>
        </div>
      </nav>

      <main className="max-w-4xl mx-auto p-6 py-12">
        <div className="bg-white rounded-lg border border-gray-200 shadow-lg p-8">
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-gray-900 mb-3">
              {content.title}
            </h1>
            {content.description && (
              <p className="text-gray-600 mb-4">{content.description}</p>
            )}
            {content.tags && content.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-4">
                {content.tags.map((tag) => (
                  <Tags key={tag._id} title={tag.title} />
                ))}
              </div>
            )}
            <p className="text-sm text-gray-500">
              Shared by {content.userId?.name || "Unknown"}
            </p>
          </div>

          <div className="">
            {content.type === "youtube" ? (
              <YoutubeEmbed url={content.link} />
            ) : (
              <TwitterEmbed url={content.link} />
            )}
          </div>

          <div className="mt-6 pt-6 border-t border-gray-200">
            <div className="flex items-center justify-between">
              <a
                href={content.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-700 flex items-center gap-2 text-sm"
              >
                View Original <ExternalLink size={14} />
              </a>
              <p className="text-sm text-gray-600">
                Shared via{" "}
                <Link
                  to="/signup"
                  className="text-blue-600 hover:text-blue-700 font-medium"
                >
                  Mindly
                </Link>
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
