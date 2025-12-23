export default function YoutubeEmbed({url}: {url: string}) {
  const getVideoId = (url: string) => {
    const patterns = [
      /(?:youtube\.com\/watch\?v=)([^&\?\/]+)/,
      /(?:youtu\.be\/)([^&\?\/]+)/,
      /(?:youtube\.com\/embed\/)([^&\?\/]+)/,
      /(?:youtube\.com\/shorts\/)([^&\?\/]+)/,
    ];

    for (const pattern of patterns) {
      const match = url.match(pattern);
      if (match && match[1]) return match[1];
    }
    return null;
  };
  const videoId = getVideoId(url);

  if (!videoId) {
    return (
      <div className="bg-gray-50 rounded-lg p-3 text-center">
        <p className="text-gray-500 text-xs">Invalid YouTube URL</p>
      </div>
    );
  }

  return (
    <div className="player rounded-md overflow-hidden">
      <iframe
        className="w-full h-full"
        src={`https://www.youtube.com/embed/${videoId}`}
        title="YouTube video"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>
    </div>
  );
}
