
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowLeft, Tv, Loader2, CheckCircle } from 'lucide-react';

interface TVRechargePageProps {
  onBack: () => void;
}

const TVRechargePage: React.FC<TVRechargePageProps> = ({ onBack }) => {
  const [selectedTV, setSelectedTV] = useState('');
  const [iucNumber, setIucNumber] = useState('');
  const [amount, setAmount] = useState('');
  const [fairCode, setFairCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);

  const tvTypes = [
    'DSTV', 'GOTV', 'Startimes', 'MYTV'
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedTV || !iucNumber || !amount || !fairCode) {
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

    // 8 seconds loading
    await new Promise(resolve => setTimeout(resolve, 8000));

    setIsLoading(false);
    setShowSuccess(true);
  };

  const handleSuccessOk = () => {
    setShowSuccess(false);
    setSelectedTV('');
    setIucNumber('');
    setAmount('');
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
              <h3 className="text-xl font-bold text-gray-900 mb-2">Recharge Successful!</h3>
              <p className="text-gray-600">
                Your {selectedTV} subscription has been recharged successfully.
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
          <h1 className="text-xl font-semibold text-gray-900">TV Recharge</h1>
        </div>
      </div>

      <div className="px-4 py-6">
        <Card>
          <CardContent className="p-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Select TV Type
                </label>
                <div className="grid grid-cols-2 gap-3">
                  {tvTypes.map((tv) => (
                    <button
                      key={tv}
                      type="button"
                      onClick={() => setSelectedTV(tv)}
                      className={`p-3 border rounded-lg text-center transition-colors ${
                        selectedTV === tv
                          ? 'bg-green-100 border-green-500 text-green-700'
                          : 'bg-white border-gray-200 text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      {tv}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  IUC Number
                </label>
                <Input
                  type="text"
                  value={iucNumber}
                  onChange={(e) => setIucNumber(e.target.value)}
                  placeholder="Enter your IUC number"
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
                  Fair Code
                </label>
                <Input
                  type="text"
                  value={fairCode}
                  onChange={(e) => setFairCode(e.target.value)}
                  placeholder="Enter your faircode (e.g., F-245698)"
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
                disabled={!selectedTV || !iucNumber || !amount || !fairCode || isLoading}
                className="w-full h-12 bg-green-600 hover:bg-green-700 text-white rounded-full disabled:opacity-50"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Processing Recharge...
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

export default TVRechargePage;
