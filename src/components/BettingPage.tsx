
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowLeft, Target, Loader2, CheckCircle } from 'lucide-react';

interface BettingPageProps {
  onBack: () => void;
}

const BettingPage: React.FC<BettingPageProps> = ({ onBack }) => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [amount, setAmount] = useState('');
  const [selectedBetting, setSelectedBetting] = useState('');
  const [fairCode, setFairCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);

  const bettingPlatforms = [
    'SportyBet', 'Bet9ja', '1xBet', 'BetKing'
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!phoneNumber || !amount || !selectedBetting || !fairCode) {
      return;
    }

    setIsLoading(true);
    setShowError(false);

    // Check faircode
    if (fairCode !== 'F-187377') {
      await new Promise(resolve => setTimeout(resolve, 2000));
      setIsLoading(false);
      setShowError(true);
      return;
    }

    // 3 seconds loading
    await new Promise(resolve => setTimeout(resolve, 3000));

    setIsLoading(false);
    setShowSuccess(true);
  };

  const handleSuccessOk = () => {
    setShowSuccess(false);
    setPhoneNumber('');
    setAmount('');
    setSelectedBetting('');
    setFairCode('');
  };

  if (showSuccess) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardContent className="p-6 text-center space-y-6">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle className="w-10 h-10 text-green-600" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Transaction Successful!</h3>
              <p className="text-gray-600">
                Your {selectedBetting} account has been funded with ₦{amount} successfully.
              </p>
            </div>
            <Button
              onClick={handleSuccessOk}
              className="w-full h-12 bg-green-600 hover:bg-green-700 text-white rounded-full"
            >
              OK
            </Button>
          </CardContent>
        </Card>
      </div>
    );
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
          <h1 className="text-xl font-semibold text-gray-900">Betting</h1>
        </div>
      </div>

      <div className="px-4 py-6">
        <Card>
          <CardContent className="p-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Phone Number
                </label>
                <Input
                  type="tel"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  placeholder="Enter your phone number"
                  className="w-full"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Amount
                </label>
                <Input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="Enter amount"
                  className="w-full"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Select Betting Platform
                </label>
                <div className="grid grid-cols-2 gap-3">
                  {bettingPlatforms.map((platform) => (
                    <button
                      key={platform}
                      type="button"
                      onClick={() => setSelectedBetting(platform)}
                      className={`p-3 border rounded-lg text-center transition-colors ${
                        selectedBetting === platform
                          ? 'bg-green-100 border-green-500 text-green-700'
                          : 'bg-white border-gray-200 text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      {platform}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Fair Code
                </label>
                <Input
                  type="text"
                  value={fairCode}
                  onChange={(e) => setFairCode(e.target.value)}
                  placeholder="Enter your faircode"
                  className="w-full"
                />
              </div>

              {showError && (
                <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                  <p className="text-red-700 text-sm">
                    Wrong faircode! Contact support to get your faircode.
                  </p>
                </div>
              )}

              <Button
                type="submit"
                disabled={!phoneNumber || !amount || !selectedBetting || !fairCode || isLoading}
                className="w-full h-12 bg-green-600 hover:bg-green-700 text-white rounded-full disabled:opacity-50"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Processing Transaction...
                  </>
                ) : (
                  'Submit'
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default BettingPage;
