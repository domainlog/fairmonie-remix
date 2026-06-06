
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowLeft, MessageCircle, Mail, Send } from 'lucide-react';

interface SupportPageProps {
  onBack: () => void;
  onLiveChat: () => void;
}

const SupportPage: React.FC<SupportPageProps> = ({ onBack, onLiveChat }) => {
  const handleTelegramSupport = () => {
    window.open('https://t.me/fairmoniesupport', '_blank');
  };

  const handleEmailSupport = () => {
    window.open('mailto: surdarkw@gmail.com', '_blank');
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
          <h1 className="text-xl font-semibold text-gray-900">Support</h1>
        </div>
      </div>

      <div className="px-4 py-6 space-y-4">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">How can we help you?</h2>
          <p className="text-gray-600 mb-6">
            Choose your preferred way to get support from our team
          </p>
        </div>

        <Card className="border border-gray-200 hover:shadow-md transition-shadow cursor-pointer" onClick={handleTelegramSupport}>
          <CardContent className="p-4">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                <Send className="w-6 h-6 text-green-600" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-900 mb-1">Telegram Support</h3>
                <p className="text-sm text-gray-600">Get instant support through our Telegram channel</p>
                <p className="text-xs text-green-600 mt-1">@fairmonie_earning_support</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border border-gray-200 hover:shadow-md transition-shadow cursor-pointer" onClick={handleEmailSupport}>
          <CardContent className="p-4">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                <Mail className="w-6 h-6 text-green-600" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-900 mb-1">Email Support</h3>
                <p className="text-sm text-gray-600">Send us an email and we'll get back to you within 24 hours</p>
                <p className="text-xs text-green-600 mt-1">surdarkw@gmail.com</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border border-gray-200 hover:shadow-md transition-shadow cursor-pointer" onClick={onLiveChat}>
          <CardContent className="p-4">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                <MessageCircle className="w-6 h-6 text-green-600 animate-bounce" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-900 mb-1">Live Chat</h3>
                <p className="text-sm text-gray-600">Chat with our support team in real-time</p>
                <p className="text-xs text-green-600 mt-1">Available 24/7</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SupportPage;
