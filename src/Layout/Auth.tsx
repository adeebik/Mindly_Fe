import { ArrowLeft } from "lucide-react";
import { ReactElement } from "react";
import { FRONTEND_URL } from "../config";

interface AuthProps {
  title: string;
  subtitle: string;
  children: ReactElement;
  redirectTitle: string;
  redirectLink: string;
  redirectText: string;
}

export default function Auth(props: AuthProps) {
  return (
    <div className="w-screen h-screen flex justify-center items-center bg-zinc-50">
      <div className="rounded-lg max-h-[90vh] flex w-md bg-white p-8 border border-zinc-200">
        <div className="insideModal w-full flex flex-col items-center justify-center gap-4">
          <div className="logo">
            <p className="text-white bg-blue-600 text-xl rounded-lg px-4 py-2.5 font-bold">
              M
            </p>
          </div>
          <div className="text flex flex-col gap-2 items-center">
            <p className="font-semibold text-2xl text-zinc-900">
              {props.title}
            </p>
            <p className="text-sm  text-zinc-500">{props.subtitle}</p>
          </div>
          <div className="inputs flex flex-col w-full gap-4 my-2">
            {props.children}
          </div>
          <div className="flex gap-1 text-sm">
            <p className="text-zinc-600 ">{props.redirectTitle}</p>
            <a
              className="text-blue-700 hover:text-blue-800 hover:underline "
              href={FRONTEND_URL + props.redirectLink}
            >
              {props.redirectText}
            </a>
          </div>
          <div>
            <a
              className="flex items-center gap-1 text-zinc-500 text-sm hover:text-zinc-800"
              href={FRONTEND_URL + "/"}
            >
              <ArrowLeft size={16} />
              Back to home
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
