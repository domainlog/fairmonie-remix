import React from 'react';
import { Button } from '@/components/ui/button';
import { CheckCircle, ArrowLeft } from 'lucide-react';

interface WithdrawalSuccessPageProps {
  onBack: () => void;
  onShare: () => void;
  withdrawalDetails: {
    amount: string;
    bank: string;
    accountNumber: string;
  };
}

const WithdrawalSuccessPage: React.FC<WithdrawalSuccessPageProps> = ({ 
  onBack, 
  onShare, 
  withdrawalDetails 
}) => {
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
          <h1 className="text-xl font-semibold text-gray-900">Withdrawal Successful</h1>
        </div>
      </div>

      {/* Success Content */}
      <div className="flex flex-col items-center justify-center px-4 py-12">
        <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mb-6">
          <CheckCircle className="w-12 h-12 text-green-600" />
        </div>
        
        <h2 className="text-2xl font-bold text-green-600 mb-4 text-center">
          Withdrawal Successful!
        </h2>
        
        <p className="text-gray-600 mb-8 text-center max-w-sm">
          Your withdrawal has been processed successfully. Here are your transaction details:
        </p>

        {/* Transaction Details Card */}
        <div className="w-full max-w-sm bg-white rounded-xl shadow-lg p-6 mb-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 text-center">
            Transaction Receipt
          </h3>
          
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-600">Amount:</span>
              <span className="font-semibold text-green-600">₦{withdrawalDetails.amount}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Bank:</span>
              <span className="font-semibold">{withdrawalDetails.bank}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Account:</span>
              <span className="font-semibold">{withdrawalDetails.accountNumber}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Status:</span>
              <span className="font-semibold text-green-600">Completed</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Date:</span>
              <span className="font-semibold">{new Date().toLocaleDateString()}</span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="w-full max-w-sm space-y-3">
          <Button
            onClick={onShare}
            className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-full"
          >
            Share Success Story
          </Button>
          
          <Button
            onClick={onBack}
            variant="outline"
            className="w-full border-gray-300 text-gray-700 hover:bg-gray-50 py-3 rounded-full"
          >
            Back to Dashboard
          </Button>
        </div>
      </div>
    </div>
  );
};

export default WithdrawalSuccessPage;