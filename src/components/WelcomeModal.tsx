
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Gift } from 'lucide-react';

interface WelcomeModalProps {
  isOpen: boolean;
  onClose: () => void;
  userName: string;
}

const WelcomeModal: React.FC<WelcomeModalProps> = ({ isOpen, onClose, userName }) => {
  const handleTelegramJoin = () => {
    window.open('https://t.me/bestniajaupdate', '_blank');
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md mx-auto rounded-2xl border-0 p-0 overflow-hidden bg-background">
        <div className="gradient-green-light p-6 text-primary-foreground text-center">
          <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <Gift className="w-10 h-10 text-white" />
          </div>
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-primary-foreground mb-0">
              Welcome to FairMonie Pay!
            </DialogTitle>
          </DialogHeader>
        </div>
        
        <div className="p-6 space-y-6">
          <div className="text-center space-y-4">
            <p className="text-foreground leading-relaxed">
              Hello <span className="font-semibold text-primary">{userName}</span>! 👋
            </p>
            <p className="text-muted-foreground text-sm leading-relaxed text-center">
              Welcome to FairMonie Pay! Join our community to get updates and start earning with FairMonie Pay.
            </p>
          </div>

          <div className="flex space-x-3">
            <Button
              onClick={onClose}
              variant="outline"
              className="flex-1 h-12 rounded-full border-border text-muted-foreground hover:bg-muted"
            >
              Maybe Later
            </Button>
            <Button
              onClick={handleTelegramJoin}
              className="flex-1 h-12 bg-primary hover:bg-primary/90 text-primary-foreground rounded-full transition-all duration-200 transform hover:scale-105"
            >
              Join Community
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default WelcomeModal;
