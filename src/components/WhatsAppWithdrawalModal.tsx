import React, { useEffect } from 'react';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { X, Gift } from 'lucide-react';

interface WhatsAppWithdrawalModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: { name: string; email: string };
  withdrawalDetails: {
    amount: string;
    bank: string;
    accountNumber: string;
  };
}

const WhatsAppWithdrawalModal: React.FC<WhatsAppWithdrawalModalProps> = ({ 
  isOpen, 
  onClose, 
  user, 
  withdrawalDetails 
}) => {
  const handleWhatsAppShare = () => {
    const shareText = `🎉 Great news! I just successfully withdrew ₦${withdrawalDetails.amount} from FairMonie Pay to my ${withdrawalDetails.bank} account (${withdrawalDetails.accountNumber}). 

Join FairMonie Pay today and start earning instantly! Get ₦250,000 welcome bonus and withdraw anytime. 

Sign up now: https://fairmoniepay.vercel.app/`;
    
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(shareText)}`;
    window.open(whatsappUrl, '_blank');
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-sm mx-auto p-0 bg-white rounded-3xl overflow-hidden border-0 shadow-2xl max-h-[480px]">
        {/* Header with close button - Green design */}
        <div className="relative gradient-green p-4 text-white">
          <button
            onClick={onClose}
            className="absolute top-3 right-3 p-1 hover:bg-white/20 rounded-full transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
          <div className="flex items-center space-x-2 mb-1">
            <div className="w-5 h-5 bg-white/20 rounded-full flex items-center justify-center">
              <Gift className="w-3 h-3" />
            </div>
            <span className="text-sm font-medium">Share Success</span>
          </div>
        </div>

        {/* Content */}
        <div className="p-5 text-center">
          {/* Success Icon */}
          <div className="w-14 h-14 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
            <Gift className="w-7 h-7 text-green-600" />
          </div>

          {/* Title */}
          <h2 className="text-lg font-bold text-gray-900 mb-2">Withdrawal Successful!</h2>

          {/* Description */}
          <div className="text-sm text-gray-600 mb-4 space-y-1">
            <p>Share your successful withdrawal with friends!</p>
            <p>Show them how easy it is to earn and withdraw from FairMonie Pay.</p>
            <p>Help others discover this amazing opportunity.</p>
          </div>

          {/* WhatsApp Share Button */}
          <Button
            onClick={handleWhatsAppShare}
            className="w-full bg-green-500 hover:bg-green-600 text-white py-2.5 rounded-full font-medium text-sm mb-3 transition-all duration-200 transform hover:scale-105"
          >
            <svg 
              className="w-4 h-4 mr-2" 
              fill="currentColor" 
              viewBox="0 0 24 24"
            >
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
            </svg>
            Share on WhatsApp
          </Button>

          {/* Bottom text */}
          <p className="text-xs text-gray-500">
            Help others discover FairMonie Pay and start earning together!
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default WhatsAppWithdrawalModal;