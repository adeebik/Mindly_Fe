import Modal from "../Modal";
import Button from "../Button";

interface DeleteConfirmationModalProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
}

export default function DeleteConfirmationModal({
  open,
  onClose,
  onConfirm,
  title,
}: DeleteConfirmationModalProps) {
  return (
    <Modal open={open} onClose={onClose} title="Delete Content" size="sm">
      <div className="flex flex-col gap-4">
        <p className="text-gray-600">
          Are you sure you want to delete <span className="font-semibold text-gray-800">"{title}"</span>? This action cannot be undone.
        </p>
        <div className="flex justify-end gap-3 mt-4">
          <Button
            variant="secondary"
            size="md"
            text="Cancel"
            onclick={onClose}
            className="px-4 py-2"
          />
          <Button
            variant="primary"
            size="md"
            text="Delete"
            onclick={onConfirm}
            className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white border-none"
          />
        </div>
      </div>
    </Modal>
  );
}
