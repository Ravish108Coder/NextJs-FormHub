import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"

interface FormDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  formDetails: any;
}

const FormDetailsModal = ({ isOpen, onClose, formDetails }: FormDetailsModalProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Submitted Form Details</DialogTitle>
        </DialogHeader>
        <DialogDescription className="overflow-x-auto">
          <pre>{JSON.stringify(formDetails, null, 2)}</pre>
        </DialogDescription>
      </DialogContent>
    </Dialog>
  );
}

export default FormDetailsModal;
