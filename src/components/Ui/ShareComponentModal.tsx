import Modal from "../Modal";
import Button from "../Button";
import { useState } from "react";

interface ShareContentProps {
  link: string;
  open: boolean;
  onClose: () => void;
}

export default function ShareComponentModal({
  link,
  open,
  onClose,
}: ShareContentProps) {
  const [copied, setCopied] = useState(false);

  const copyText = () => {
    navigator.clipboard.writeText(link);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div>
      <Modal size="md" title="Share Content" open={open} onClose={onClose}>
        <div className="space-y-4">
          <p className="text-sm text-gray-600">
            Share this content with anyone using this link
          </p>
          <div className="flex gap-2">
            <input
              type="text"
              value={link}
              readOnly
              className="flex-1 px-3 py-2.5 text-sm border border-gray-300 rounded-lg bg-gray-50"
            />

            <Button onclick={copyText} variant="secondary" size="sm">
                <>
              {copied ? "Copied!" : "Copy"}
              </>
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
