
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowLeft, MessageCircle, Send } from 'lucide-react';

interface JoinGroupPageProps {
  onBack: () => void;
}

const JoinGroupPage: React.FC<JoinGroupPageProps> = ({ onBack }) => {
  const handleTelegramJoin = () => {
    window.open('https://t.me/bestniajaupdate', '_blank');
  };

  const handleWhatsAppJoin = () => {
    window.open('https://t.me/bestniajaupdate', '_blank');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white px-4 py-4 shadow-sm">
        <div className="flex items-center space-x-3">
          <button
            onClick={onBack}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <ArrowLeft className="w-6 h-6 text-gray-600" />
          </button>
          <h1 className="text-xl font-semibold text-gray-900">Join Our Community</h1>
        </div>
      </div>

      <div className="px-4 py-6 space-y-6">
        <div className="text-center">
          <p className="text-gray-600 mb-6">
            Join our community to get updates, tips, and start earning with FairMonie Pay!
          </p>
        </div>

        <Card className="border border-gray-200 hover:shadow-md transition-shadow cursor-pointer" onClick={handleTelegramJoin}>
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                <Send className="w-8 h-8 text-blue-600" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Telegram Channel</h3>
                <p className="text-sm text-gray-600">Join our Telegram community for updates and exclusive content</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border border-gray-200 hover:shadow-md transition-shadow cursor-pointer" onClick={handleWhatsAppJoin}>
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                <MessageCircle className="w-8 h-8 text-green-600" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">WhatsApp Group</h3>
                <p className="text-sm text-gray-600">Connect with our WhatsApp community for instant updates</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default JoinGroupPage;
