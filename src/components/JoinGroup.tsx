
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { MessageCircle, Send, ArrowLeft } from 'lucide-react';

interface JoinGroupProps {
  isOpen: boolean;
  onClose: () => void;
  onBack: () => void;
}

const JoinGroup: React.FC<JoinGroupProps> = ({ isOpen, onClose, onBack }) => {
  const handleTelegramJoin = () => {
    window.open('https://t.me/bestniajaupdate', '_blank');
    onClose();
  };

  const handleWhatsAppJoin = () => {
    window.open('https://t.me/bestniajaupdate', '_blank');
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md mx-4 rounded-2xl border-0 p-0 overflow-hidden bg-white">
        <div className="gradient-green-light p-6 text-white">
          <div className="flex items-center space-x-3 mb-4">
            <button
              onClick={onBack}
              className="p-2 hover:bg-white/20 rounded-full transition-colors"
            >
              <ArrowLeft className="w-5 h-5 text-white" />
            </button>
            <DialogHeader>
              <DialogTitle className="text-xl font-bold text-white">
                Join Our Community
              </DialogTitle>
            </DialogHeader>
          </div>
        </div>
        
        <div className="p-6 space-y-4">
          <p className="text-center text-gray-600 text-sm mb-6">
            Join our community to get updates, tips, and start earning with FairMonie Pay!
          </p>

          <Card className="border border-gray-200 hover:shadow-md transition-shadow cursor-pointer" onClick={handleTelegramJoin}>
            <CardContent className="p-4">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <Send className="w-6 h-6 text-blue-600" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900">Telegram Channel</h3>
                  <p className="text-sm text-gray-600">Join our Telegram community for updates</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border border-gray-200 hover:shadow-md transition-shadow cursor-pointer" onClick={handleWhatsAppJoin}>
            <CardContent className="p-4">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                  <MessageCircle className="w-6 h-6 text-green-600" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900">WhatsApp Group</h3>
                  <p className="text-sm text-gray-600">Connect with our WhatsApp community</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="pt-4">
            <Button
              onClick={onClose}
              variant="outline"
              className="w-full h-12 rounded-full border-gray-200 text-gray-600 hover:bg-gray-50"
            >
              Maybe Later
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default JoinGroup;
