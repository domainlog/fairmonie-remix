import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowLeft, Copy, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { toast } from '@/hooks/use-toast';

interface BuyFaircodePageProps {
  onBack: () => void;
  user: { name: string; email: string };
}

const BuyFaircodePage: React.FC<BuyFaircodePageProps> = ({ onBack, user }) => {
  const [showPaymentDialog, setShowPaymentDialog] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [paymentConfirmed, setPaymentConfirmed] = useState(false);
  const [paymentDeclined, setPaymentDeclined] = useState(false);

  const bankDetails = {
    bankName: "First Bank",
    accountNumber: "3119876543",
    accountName: "Fair Monie Pay"
  };

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied!",
      description: `${label} copied to clipboard`,
      duration: 2000,
    });
  };

  const handleMakePayment = () => {
    setShowPaymentDialog(true);
  };

  const handlePaymentMade = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      // Randomly decide payment confirmation or decline
      const isConfirmed = Math.random() > 0.3; // 70% chance of confirmation
      if (isConfirmed) {
        setPaymentConfirmed(true);
      } else {
        setPaymentDeclined(true);
      }
    }, 6000);
  };

  const handleCloseDialog = () => {
    setShowPaymentDialog(false);
    setPaymentConfirmed(false);
    setPaymentDeclined(false);
    setIsLoading(false);
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
          <h1 className="text-xl font-semibold text-gray-900">Buy Fair Code</h1>
        </div>
      </div>

      <div className="px-4 py-6 space-y-6">
        {/* Fair Code Info */}
        <Card>
          <CardContent className="p-6">
            <div className="text-center space-y-4">
              <h2 className="text-2xl font-bold text-green-600">Fair Code - ₦1,500</h2>
              <p className="text-gray-600">
                Purchase a Fair Code to enable withdrawals and secure transactions
              </p>
              <div className="bg-green-50 p-4 rounded-lg">
                <p className="text-green-700 font-medium">
                  One Fair Code = Multiple Withdrawals
                </p>
                <p className="text-sm text-green-600">
                  Use your Fair Code for all future withdrawal approvals
                </p>
              </div>
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
                <span className="text-gray-600">Amount:</span>
                <span className="font-bold text-green-600 text-lg">₦1,500.00</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Instructions */}
        <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Instructions</h3>
            <ol className="list-decimal list-inside space-y-2 text-gray-700">
              <li>Transfer exactly ₦1,500 to the account details above</li>
              <li>Click "I have made the bank transfer" below</li>
              <li>Wait for payment confirmation</li>
              <li>Your Fair Code will be sent to your registered email</li>
            </ol>
          </CardContent>
        </Card>

        {/* Payment Button */}
        <Button
          onClick={handleMakePayment}
          className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-full"
        >
          I have made the bank transfer
        </Button>
      </div>

      {/* Payment Confirmation Dialog */}
      <Dialog open={showPaymentDialog} onOpenChange={() => {}}>
        <DialogContent className="max-w-sm mx-auto">
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
                <h2 className="text-xl font-semibold text-green-600 mb-2">Payment Confirmed!</h2>
                <p className="text-gray-600 mb-4">
                  Your Fair Code will be sent to {user.email} within 5 minutes.
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
                  Have you completed the bank transfer of ₦1,500?
                </p>
                <div className="space-y-3">
                  <Button 
                    onClick={handlePaymentMade}
                    className="w-full bg-green-600 hover:bg-green-700 text-white"
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

export default BuyFaircodePage;