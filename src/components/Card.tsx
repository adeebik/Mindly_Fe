import { Share2, Trash2 } from "lucide-react";
import Button from "./Button";
import Tags from "./Tags";
import { Contents } from "../Types/types";
import YoutubeEmbed from "./YoutubeEmbed";
import TwitterEmbed from "./TwitterEmbed";

interface CardProps {
  content: Contents;
  onShare?: () => void;
  onDelete?: (arg: string) => void;
}

export default function Card({ content, onShare, onDelete }: CardProps) {
  return (
    <>
      <div className="border border-zinc-300 bg-white  rounded-md p-3 flex flex-col justify-between">
        <div className="top">
          <div className="titleBtn mb-2 gap-2 flex justify-between items-center">
            <div className="title font-medium line-clamp-2">
              {content.title}
            </div>
            <div className="buttons flex gap-1">
              <Button
                variant="outline"
                onclick={onShare}
                size="xs"
                startIcon={<Share2 size={14} />}
              />
              <Button
                variant="dangerOutline"
                onclick={() => onDelete?.(content._id)}
                size="xs"
                startIcon={<Trash2 size={14} />}
              />
            </div>
          </div>
          <div className="desc mb-2">
            <p className="text-sm text-zinc-600 line-clamp-2">
              {content.description}
            </p>
          </div>
        </div>

        <div className="mid">
          <div className="relative embed mb-3 w-full">
            {content.type == "youtube" ? (
              <YoutubeEmbed url={content.link} />
            ) : (
              <TwitterEmbed url={content.link} />
            )}
          </div>
        </div>

        <div className="bottom">
          <div className="tags mb-2 flex gap-1 flex-wrap">
            {content.tags.map((tag) => (
              <Tags title={tag.title} />
            ))}
          </div>
          <div className="date">
            <p className="text-xs text-zinc-600">{content.createdAt}</p>
          </div>
        </div>
      </div>
    </>
  );
}
