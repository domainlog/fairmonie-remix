
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowLeft, Wifi, Loader2, CheckCircle } from 'lucide-react';

interface DataPageProps {
  onBack: () => void;
}

const DataPage: React.FC<DataPageProps> = ({ onBack }) => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [selectedNetwork, setSelectedNetwork] = useState('');
  const [selectedPlan, setSelectedPlan] = useState('');
  const [fairCode, setFairCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);

  const networks = ['MTN', 'Airtel', 'Glo', '9mobile'];
  const dataPlans = ['1GB - ₦300', '2GB - ₦600', '5GB - ₦1,500', '10GB - ₦3,000'];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!phoneNumber || !selectedNetwork || !selectedPlan || !fairCode) {
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

    // 7 seconds loading
    await new Promise(resolve => setTimeout(resolve, 7000));

    setIsLoading(false);
    setShowSuccess(true);
  };

  const handleSuccessOk = () => {
    setShowSuccess(false);
    setPhoneNumber('');
    setSelectedNetwork('');
    setSelectedPlan('');
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
              <h3 className="text-xl font-bold text-gray-900 mb-2">Purchase Successful!</h3>
              <p className="text-gray-600">
                {selectedPlan} data has been sent to {phoneNumber} on {selectedNetwork} network successfully.
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
          <h1 className="text-xl font-semibold text-gray-900">Buy Data</h1>
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
                  placeholder="Enter phone number"
                  className="w-full"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Select Network
                </label>
                <div className="grid grid-cols-2 gap-3">
                  {networks.map((network) => (
                    <button
                      key={network}
                      type="button"
                      onClick={() => setSelectedNetwork(network)}
                      className={`p-3 border rounded-lg text-center transition-colors ${
                        selectedNetwork === network
                          ? 'bg-green-100 border-green-500 text-green-700'
                          : 'bg-white border-gray-200 text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      {network}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Select Data Plan
                </label>
                <div className="space-y-2">
                  {dataPlans.map((plan) => (
                    <button
                      key={plan}
                      type="button"
                      onClick={() => setSelectedPlan(plan)}
                      className={`w-full p-3 border rounded-lg text-center transition-colors ${
                        selectedPlan === plan
                          ? 'bg-green-100 border-green-500 text-green-700'
                          : 'bg-white border-gray-200 text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      {plan}
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
                disabled={!phoneNumber || !selectedNetwork || !selectedPlan || !fairCode || isLoading}
                className="w-full h-12 bg-green-600 hover:bg-green-700 text-white rounded-full disabled:opacity-50"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Processing Purchase...
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

export default DataPage;
