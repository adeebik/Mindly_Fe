import Modal from "../Modal";
import { useState } from "react";
import { Check, Copy, ExternalLink, Loader2 } from "lucide-react";
import { SharedCont } from "../../Store/store";
import { FRONTEND_URL } from "../../config";

interface ShareContentProps {
  open: boolean;
  onClose: () => void;
  onToggleShare: (contentId: string, share: boolean) => void;
  sharedContents: Record<string, SharedCont>;
  loading: string | null;
  contentId: string;
}

export default function ShareComponentModal({
  open,
  onClose,
  onToggleShare,
  sharedContents,
  loading,
  contentId,
}: ShareContentProps) {
  const isShared = !!sharedContents[contentId]?.isShared;
  const shareLink = sharedContents[contentId]?.link;

  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(FRONTEND_URL + `/shared-content/` + shareLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div>
      <Modal size="sm" title="Share Content" open={open} onClose={onClose}>
        <>
          <div className="py-2 space-y-4">
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div>
                <p className="font-medium text-gray-900">Public Sharing</p>
                <p className="text-sm text-gray-600">
                  {isShared
                    ? "Anyone with the link can view this content"
                    : "This content is private"}
                </p>
              </div>
              <button
                onClick={() => onToggleShare(contentId, !isShared)}
                disabled={loading === contentId}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors cursor-pointer ${
                  isShared ? "bg-blue-600" : "bg-gray-300"
                } ${loading === contentId ? "opacity-50 cursor-disable" : ""}`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    isShared ? "translate-x-6" : "translate-x-1"
                  }`}
                />
              </button>
            </div>

            {loading === contentId && (
              <div className="flex items-center justify-center py-4">
                <Loader2 className="animate-spin text-blue-600" size={24} />
              </div>
            )}

            {isShared && shareLink && loading !== contentId && (
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  Share Link
                </label>
                <div className="flex gap-2 mt-1">
                  <input
                    type="text"
                    value={FRONTEND_URL + `/shared-content/` + shareLink}
                    readOnly
                    className="flex-1 px-4 py-2 text-sm border border-gray-300 rounded-lg bg-gray-50 text-zinc-600"
                  />
                  <button
                    onClick={handleCopy}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2"
                  >
                    {copied ? (
                      <>
                        <Check size={16} />
                        Copied!
                      </>
                    ) : (
                      <>
                        <Copy size={16} />
                        Copy
                      </>
                    )}
                  </button>
                </div>
                <a
                  href={FRONTEND_URL + `/shared-content/` + shareLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-blue-600 hover:text-blue-700 flex items-center gap-1"
                >
                  Open in new tab <ExternalLink size={12} />
                </a>
              </div>
            )}

            {!isShared && loading !== contentId && (
              <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                <p className="text-sm text-yellow-800">
                  Enable sharing to generate a public link for this content.
                </p>
              </div>
            )}
          </div>
        </>
      </Modal>
    </div>
  );
}
