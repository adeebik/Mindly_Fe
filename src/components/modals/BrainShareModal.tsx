import Modal from "../Modal";
import { useState, useEffect } from "react";
import { Check, Copy, ExternalLink, Loader2 } from "lucide-react";
import axios from "axios";
import { BACKEND_URL } from "../../config";

interface BrainShareModalProps {
  open: boolean;
  onClose: () => void;
}

export default function BrainShareModal({ open, onClose }: BrainShareModalProps) {
  const [isShared, setIsShared] = useState(false);
  const [shareLink, setShareLink] = useState("");
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);


  useEffect(() => {
    if (open) {
      fetchBrainShareStatus();
    }
  }, [open]);

  const fetchBrainShareStatus = async () => {
    setLoading(true);
    try {
      const response = await axios.post(
        `${BACKEND_URL}/share/mindShare`,
        { share: true },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      const link = 
        response.data.link || 
        response.data["Here is your Sharable Link"] ||
        response.data["Link already created "];

      if (link) {
        setIsShared(true);
        setShareLink(link);
      }
    } catch (error) {
      setIsShared(false);
      setShareLink("");
    } finally {
      setLoading(false);
    }
  };

  const handleToggle = async () => {
    setLoading(true);
    try {
      const response = await axios.post(
        `${BACKEND_URL}/share/mindShare`,
        { share: !isShared },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (!isShared) {

        const link = 
          response.data.link || 
          response.data["Here is your Sharable Link"] ||
          response.data["Link already created "];
        
        setIsShared(true);
        setShareLink(link);
      } else {
        // Disabling share
        setIsShared(false);
        setShareLink("");
      }
    } catch (error: any) {
      console.error("Toggle brain share error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    if (shareLink) {
      navigator.clipboard.writeText(shareLink);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div>
      <Modal size="sm" title="Share Your Brain" open={open} onClose={onClose}>
        <div className="py-2 space-y-4">

          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div>
              <p className="font-medium text-gray-900">Public Sharing</p>
              <p className="text-sm text-gray-600">
                {isShared
                  ? "Anyone with the link can view all your content"
                  : "Your content is private"}
              </p>
            </div>
            <button
              onClick={handleToggle}
              disabled={loading}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors cursor-pointer ${
                isShared ? "bg-blue-600" : "bg-gray-300"
              } ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  isShared ? "translate-x-6" : "translate-x-1"
                }`}
              />
            </button>
          </div>


          {loading && (
            <div className="flex items-center justify-center py-4">
              <Loader2 className="animate-spin text-blue-600" size={24} />
            </div>
          )}


          {isShared && shareLink && !loading && (
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">
                Share Link
              </label>
              <div className="flex gap-2 mt-1">
                <input
                  type="text"
                  value={shareLink}
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
                href={shareLink}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-blue-600 hover:text-blue-700 flex items-center gap-1"
              >
                Open in new tab <ExternalLink size={12} />
              </a>
            </div>
          )}


          {!isShared && !loading && (
            <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
              <p className="text-sm text-yellow-800">
                Enable sharing to generate a public link. You can disable it
                anytime to make your content private again.
              </p>
            </div>
          )}
        </div>
      </Modal>
    </div>
  );
}