
import React from 'react';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { X, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface PaymentUpdateModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const PaymentUpdateModal: React.FC<PaymentUpdateModalProps> = ({ isOpen, onClose }) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-sm mx-auto p-0 bg-background rounded-3xl overflow-hidden border-0 shadow-2xl max-h-[480px]">
        
        {/* Header with close button */}
        <div className="relative bg-green-500 p-4 text-white">
          <button
            onClick={onClose}
            className="absolute top-3 right-3 p-1 hover:bg-white/20 rounded-full transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
          <div className="flex items-center space-x-2 mb-1">
            <Zap className="w-4 h-4" />
            <span className="text-sm font-medium">Payment Now Fast!</span>
          </div>
        </div>

        {/* Content */}
        <div className="p-5 text-center">
          {/* Title */}
          <h2 className="text-lg font-bold text-foreground mb-2">
            ⚡ Lightning Fast Payments!
          </h2>

          {/* Description */}
          <p className="text-sm text-muted-foreground mb-4">
            Great news! Our payment system has been upgraded. 
            Your payments will now be processed and verified much faster than before.
          </p>

          {/* What's New Section */}
          <div className="bg-green-50 rounded-xl p-4 text-left text-sm mb-5">
            <p className="font-semibold mb-2">✅ What's New:</p>
            <ul className="space-y-1 text-muted-foreground">
              <li>• Instant payment verification</li>
              <li>• Faster processing times</li>
              <li>• Real-time payment updates</li>
              <li>• Improved payment reliability</li>
            </ul>
          </div>

          {/* Button */}
          <Button
            onClick={onClose}
            className="w-full bg-green-600 hover:bg-green-700 text-white py-2.5 rounded-full font-medium text-sm transition-all duration-200 transform hover:scale-105"
          >
            Start Making Payments
          </Button>

          {/* Bottom note */}
          <p className="text-xs text-muted-foreground mt-3">
            Make your payments now and experience the speed! 🚀
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PaymentUpdateModal;
