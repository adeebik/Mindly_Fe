import { ExternalLink } from "lucide-react";
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
    <div className="tweet">
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="ml-1 text-blue-600 hover:text-blue-700 text-xs flex items-center gap-1 font-medium"
      >
        View on Twitter <ExternalLink size={12} />
      </a>
      <Tweet id={tweetId} />
    </div>
  );
}
