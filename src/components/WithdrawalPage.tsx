import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { ArrowLeft, Copy, Loader2, CheckCircle, AlertCircle } from 'lucide-react';
import { nigerianBanks } from '@/utils/banks';
import { toast } from '@/hooks/use-toast';
import WithdrawalSuccessPage from '@/components/WithdrawalSuccessPage';
import WhatsAppWithdrawalModal from '@/components/WhatsAppWithdrawalModal';

interface WithdrawalPageProps {
  onBack: () => void;
  balance: number;
  onWithdraw: (amount: number) => void;
  onBuyFairCode?: () => void;
}

const WithdrawalPage: React.FC<WithdrawalPageProps> = ({ onBack, balance, onWithdraw, onBuyFairCode }) => {
  const [accountNumber, setAccountNumber] = useState('');
  const [selectedBank, setSelectedBank] = useState('');
  const [accountName, setAccountName] = useState('');
  const [amount, setAmount] = useState('');
  const [fairCode, setFairCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);
  const [showWhatsAppShare, setShowWhatsAppShare] = useState(false);
  const [withdrawalDetails, setWithdrawalDetails] = useState<any>(null);

  const handleProceed = () => {
    if (!accountNumber || !selectedBank || !accountName || !amount || !fairCode) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        duration: 3000,
      });
      return;
    }

    // Check if fair code is correct
    if (fairCode !== 'FC-0874938@Q') {
      setShowError(true);
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      // Store withdrawal details
      setWithdrawalDetails({
        amount: amount,
        bank: selectedBank,
        accountNumber: accountNumber
      });
      setShowSuccess(true);
      onWithdraw(Number(amount));
    }, 6000);
  };

  const handleSuccessShare = () => {
    setShowWhatsAppShare(true);
  };

  const handleErrorOk = () => {
    setShowError(false);
    setFairCode('');
  };

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied!",
      description: `${label} copied to clipboard`,
      duration: 2000,
    });
  };

  // Show success page if withdrawal is successful
  if (showSuccess && withdrawalDetails) {
    return (
      <WithdrawalSuccessPage
        onBack={onBack}
        onShare={handleSuccessShare}
        withdrawalDetails={withdrawalDetails}
      />
    );
  }

  return (
    <>
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
            <h1 className="text-xl font-semibold text-gray-900">Withdraw To Bank Account</h1>
          </div>
        </div>

        <div className="px-4 py-6">
          <Card>
            <CardContent className="p-6 space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Account Number</label>
                <Input
                  placeholder="Enter account number"
                  value={accountNumber}
                  onChange={(e) => setAccountNumber(e.target.value)}
                  className="w-full"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Bank Name</label>
                <Select value={selectedBank} onValueChange={setSelectedBank}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select Bank" />
                  </SelectTrigger>
                  <SelectContent>
                    {nigerianBanks.map((bank) => (
                      <SelectItem key={bank} value={bank}>
                        {bank}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Account Name</label>
                <Input
                  placeholder="Account Name"
                  value={accountName}
                  onChange={(e) => setAccountName(e.target.value)}
                  className="w-full"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Amount</label>
                <Input
                  placeholder="Enter amount"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  type="number"
                  className="w-full"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Fair Code</label>
                <Input
                  placeholder="Enter fair code"
                  value={fairCode}
                  onChange={(e) => setFairCode(e.target.value)}
                  className="w-full"
                />
              </div>

              <div className="text-center">
                <p className="text-lg font-semibold text-green-600">
                  Available Balance: ₦{balance.toLocaleString()}.00
                </p>
              </div>

              <Button
                onClick={handleProceed}
                disabled={isLoading}
                className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-full"
              >
                {isLoading ? (
                  <div className="flex items-center space-x-2">
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Withdrawal in progress...</span>
                  </div>
                ) : (
                  'Proceed'
                )}
              </Button>

              {/* Buy Fair Code Link */}
              <div className="text-center mt-4">
                <button
                  onClick={() => onBuyFairCode && onBuyFairCode()}
                  className="text-green-600 font-medium text-sm hover:text-green-700 transition-colors"
                >
                  Buy Fair Code
                </button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>


      {/* Error Dialog */}
      <Dialog open={showError} onOpenChange={() => {}}>
        <DialogContent className="max-w-sm mx-auto">
          <div className="text-center py-4">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <AlertCircle className="w-8 h-8 text-red-600" />
            </div>
            <h2 className="text-xl font-semibold text-red-600 mb-2">Invalid Fair Code</h2>
            <p className="text-gray-600 mb-4">
              The fair code you entered is incorrect. Please try again.
            </p>
            <Button 
              onClick={handleErrorOk}
              className="w-full bg-red-600 hover:bg-red-700 text-white"
            >
              Try Again
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* WhatsApp Share Modal */}
      {withdrawalDetails && (
        <WhatsAppWithdrawalModal
          isOpen={showWhatsAppShare}
          onClose={() => {
            setShowWhatsAppShare(false);
            onBack();
          }}
          user={{ name: accountName, email: '' }}
          withdrawalDetails={withdrawalDetails}
        />
      )}
    </>
  );
};

export default WithdrawalPage;
