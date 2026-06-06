
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowLeft, User, Info, Download, Play, CreditCard, LogOut, Crown } from 'lucide-react';
import BuyFaircodeModal from '@/components/BuyFaircodeModal';
import YouTubeWatchPage from '@/components/YouTubeWatchPage';
import UpgradeAccountPage from '@/components/UpgradeAccountPage';

interface ProfileMenuProps {
  onBack: () => void;
  user: { name: string; email: string };
  onProfileInfo: () => void;
  onAbout: () => void;
  onLogout?: () => void;
}

const ProfileMenu: React.FC<ProfileMenuProps> = ({ onBack, user, onProfileInfo, onAbout, onLogout }) => {
  const [showBuyFaircode, setShowBuyFaircode] = useState(false);
  const [showYouTubeWatch, setShowYouTubeWatch] = useState(false);
  const [showUpgradeAccount, setShowUpgradeAccount] = useState(false);

  const handleDownloadApp = () => {
    window.open('https://median.co/share/nmxmrnq#apk', '_blank');
  };

  const handleWatchTutorial = () => {
    setShowYouTubeWatch(true);
  };

  const menuItems = [
    { title: 'Profile Information', icon: User, onClick: onProfileInfo },
    { title: 'About', icon: Info, onClick: onAbout },
    { title: 'Download App', icon: Download, onClick: handleDownloadApp },
    { title: 'Watch Tutorial', icon: Play, onClick: handleWatchTutorial },
    { title: 'Buy Faircode', icon: CreditCard, onClick: () => setShowBuyFaircode(true) },
    { title: 'Upgrade Account', icon: Crown, color: 'bg-yellow-100 text-yellow-600', onClick: () => setShowUpgradeAccount(true) },
    { title: 'Log Out', icon: LogOut, color: 'bg-red-100 text-red-600', onClick: onLogout }
  ];

  if (showBuyFaircode) {
    return <BuyFaircodeModal onBack={() => setShowBuyFaircode(false)} user={user} />;
  }

  if (showYouTubeWatch) {
    return <YouTubeWatchPage onBack={() => setShowYouTubeWatch(false)} />;
  }

  if (showUpgradeAccount) {
    return <UpgradeAccountPage onBack={() => setShowUpgradeAccount(false)} user={user} />;
  }

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
          <h1 className="text-xl font-semibold text-gray-900">More Options</h1>
        </div>
      </div>

      <div className="px-4 py-6 space-y-3">
        {menuItems.map((item, index) => (
          <Card key={index} className="border border-gray-200 hover:shadow-md transition-shadow cursor-pointer" onClick={item.onClick}>
            <CardContent className="p-3">
              <div className="flex items-center space-x-4">
                <div className={`w-10 h-10 ${item.color || 'bg-green-100'} rounded-full flex items-center justify-center`}>
                  <item.icon className={`w-5 h-5 ${item.color ? (item.color.includes('red') ? 'text-red-600' : item.color.includes('yellow') ? 'text-yellow-600' : 'text-green-600') : 'text-green-600'}`} />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900">{item.title}</h3>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ProfileMenu;
