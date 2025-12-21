import { Share2, Trash2 } from "lucide-react";
import Button from "./Button";
import Tags from "./Tags";

interface CardProps {
  title: string
  description? : string
  type: string;
  onClick?: () => void;
  link?: URL,
}

export default function Card(props: CardProps) {
  return (
    <>
      <div className="border border-zinc-300 bg-white max-w-80 min-h-80 min-w-80 min-h-80 rounded-md p-3">
        <div className="titleBtn mb-2 gap-2 flex justify-between items-center">
          <div className="title font-medium line-clamp-2">
            {props.title}
          </div>
          <div className="buttons flex gap-1">
            <Button
              variant="outline"
              onclick={props.onClick}
              size="xs"
              startIcon={<Share2 size={16} />}
            />
            <Button
              variant="outline"
              onclick={props.onClick}
              size="xs"
              startIcon={<Trash2 size={16} />}
            />
          </div>
        </div>
        <div className="desc mb-2">
          <p className="text-sm text-zinc-600 line-clamp-2">
            {props.description}
          </p>
        </div>

        <div className="embed mb-3">
          {props.type == "youtube" ? (
            <div className="player rounded-md overflow-hidden">
              <iframe
                src="https://www.youtube.com/embed/dfqz4o1QPCk?si=JIa_x0V94LKhuvsJ"
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              ></iframe>
            </div>
          ) : (
            <div className="tweet">
              <blockquote className="twitter-tweet">
                <p lang="en" dir="ltr">
                  <a href="https://twitter.com/kirat_tw?ref_src=twsrc%5Etfw">
                    @kirat_tw
                  </a>{" "}
                  Dropped another bomb.<br></br> Excited to join and Explore{" "}
                  <a href="https://t.co/Fw0vIit1iY">
                    pic.twitter.com/Fw0vIit1iY
                  </a>
                </p>
                &mdash; Ayush Gopal (@iamAyushgopal){" "}
                <a href="https://twitter.com/iamAyushgopal/status/2002742332660257012?ref_src=twsrc%5Etfw">
                  December 21, 2025
                </a>
              </blockquote>{" "}
              <script
                async
                src="https://platform.twitter.com/widgets.js"
                charSet="utf-8"
              ></script>
            </div>
          )}
        </div>
        <div className="tags mb-2 flex gap-1 flex-wrap">
          <Tags title="startup" />
          <Tags title="education" />
          <Tags title="projects" />
          <Tags title="learn" />
        </div>
        <div className="date">
          <p className="text-xs text-zinc-600">Dec 15, 2020</p>
        </div>
      </div>
    </>
  );
}
