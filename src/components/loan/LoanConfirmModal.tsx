
import React from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';

interface LoanConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

const LoanConfirmModal: React.FC<LoanConfirmModalProps> = ({ isOpen, onClose, onConfirm }) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md mx-auto rounded-2xl border-0 p-0 overflow-hidden bg-white fixed left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <div className="p-6 text-center space-y-6">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold text-gray-900">
              Confirm Loan Application
            </DialogTitle>
          </DialogHeader>
          <p className="text-gray-600">
            Loan request submitted. Are you sure all your details are correct?
          </p>
          <div className="flex space-x-3">
            <Button
              onClick={onClose}
              variant="outline"
              className="flex-1 h-12 rounded-full border-gray-200 text-gray-600 hover:bg-gray-50"
            >
              Cancel
            </Button>
            <Button
              onClick={onConfirm}
              className="flex-1 h-12 bg-green-600 hover:bg-green-700 text-white rounded-full"
            >
              Proceed
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default LoanConfirmModal;
