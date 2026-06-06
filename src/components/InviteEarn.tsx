import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { ArrowLeft, Gift, Share, Copy, Users } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface InviteEarnProps {
  onBack: () => void;
  user: { name: string; email: string };
  onUpdateBalance: (amount: number) => void;
}

const InviteEarn: React.FC<InviteEarnProps> = ({ onBack, user, onUpdateBalance }) => {
  const [referralCode] = useState(`FMP${user.name.toUpperCase().slice(0, 3)}${Math.random().toString(36).slice(2, 8).toUpperCase()}`);
  const [referralLink] = useState(`https://fairmonieltd.vercel.app/?ref=${referralCode}`);
  const [totalEarnings, setTotalEarnings] = useState(0);
  const [totalReferrals, setTotalReferrals] = useState(0);

  // Load referral data from localStorage
  useEffect(() => {
    const savedReferralData = localStorage.getItem(`referralData_${user.email}`);
    if (savedReferralData) {
      const data = JSON.parse(savedReferralData);
      setTotalReferrals(data.totalReferrals || 0);
      setTotalEarnings(data.totalEarnings || 0);
    }

    // Check if there are new referrals to credit
    const pendingReferrals = localStorage.getItem(`pendingReferrals_${referralCode}`);
    if (pendingReferrals) {
      const newReferrals = parseInt(pendingReferrals);
      const newEarnings = newReferrals * 6500;
      
      // Update referral data
      const updatedReferrals = totalReferrals + newReferrals;
      const updatedEarnings = totalEarnings + newEarnings;
      
      setTotalReferrals(updatedReferrals);
      setTotalEarnings(updatedEarnings);
      
      // Save updated data
      localStorage.setItem(`referralData_${user.email}`, JSON.stringify({
        totalReferrals: updatedReferrals,
        totalEarnings: updatedEarnings
      }));
      
      // Credit the user's balance
      onUpdateBalance(newEarnings);
      
      // Clear pending referrals
      localStorage.removeItem(`pendingReferrals_${referralCode}`);
      
      // Show success message
      toast({
        title: "Referral Bonus!",
        description: `You earned ₦${newEarnings.toLocaleString()} from ${newReferrals} new referral${newReferrals > 1 ? 's' : ''}!`,
        duration: 5000,
      });
    }

    // Store referral code for this user to track when someone signs up
    localStorage.setItem(`userReferralCode_${user.email}`, referralCode);
  }, [user.email, referralCode, totalReferrals, totalEarnings, onUpdateBalance]);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(referralLink);
    toast({
      title: "Link Copied!",
      description: "Referral link copied to clipboard",
      duration: 2000,
    });
  };

  const handleShare = () => {
    const shareText = `Join fairmonie Pay and get ₦250,000 welcome bonus instantly! I'm already earning with Fairmonie pay. Sign up using my link: ${referralLink}`;
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(shareText)}`;
    window.open(whatsappUrl, '_blank');
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
          <h1 className="text-xl font-semibold text-gray-900">Invite & Earn</h1>
        </div>
      </div>

      <div className="px-4 py-6 space-y-6">
        {/* Earnings Summary */}
        <Card className="gradient-green text-white border-0">
          <CardContent className="p-6 text-center">
            <Gift className="w-12 h-12 mx-auto mb-4" />
            <h2 className="text-2xl font-bold mb-2">₦{totalEarnings.toLocaleString()}</h2>
            <p className="text-green-100 mb-4">Total Earnings</p>
            <div className="flex justify-center items-center space-x-4">
              <div className="text-center">
                <p className="text-2xl font-bold">{totalReferrals}</p>
                <p className="text-sm text-green-100">Referrals</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold">₦6,500</p>
                <p className="text-sm text-green-100">Per Referral</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* How it Works */}
        <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">How it Works</h3>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-xs font-bold text-green-600">1</span>
                </div>
                <p className="text-sm text-gray-600">Share your referral link with friends</p>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-xs font-bold text-green-600">2</span>
                </div>
                <p className="text-sm text-gray-600">They sign up using your link</p>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-xs font-bold text-green-600">3</span>
                </div>
                <p className="text-sm text-gray-600">You earn ₦6,500 for each successful referral automatically</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Referral Link */}
        <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Your Referral Link</h3>
            <div className="space-y-4">
              <div className="flex space-x-2">
                <Input value={referralLink} readOnly className="flex-1 text-xs" />
                <Button onClick={handleCopyLink} variant="outline" size="icon">
                  <Copy className="w-4 h-4" />
                </Button>
              </div>
              <div className="flex space-x-2">
                <Button onClick={handleShare} className="flex-1 bg-green-600 hover:bg-green-700">
                  <Share className="w-4 h-4 mr-2" />
                  Share on WhatsApp
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default InviteEarn;
