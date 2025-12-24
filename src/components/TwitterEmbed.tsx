import { ExternalLink, Twitter } from "lucide-react";
import { Tweet } from "react-tweet";

export default function TwitterEmbed({ url }: { url: string }) {
  const getTweetId = (url: string) => {
    const match = url.match(/status\/(\d+)/);
    return match ? match[1] : null;
  };

  const tweetId = getTweetId(url);
  if (!tweetId) {
    return (
      <div className="bg-gray-50 rounded-lg text-center">
        <p className="text-gray-500 text-xs">Invalid Twitter URL</p>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 rounded-lg px-3 pb-3 border border-gray-200">
        <div className="tweet">
          <Tweet id={tweetId} />

      </div>
      <div className="bg-white rounded-lg p-3 border border-gray-200">
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 hover:text-blue-700 text-xs flex items-center gap-1 font-medium"
        >
          View on Twitter <ExternalLink size={12} />
        </a>
      </div>
    </div>
  );
}
