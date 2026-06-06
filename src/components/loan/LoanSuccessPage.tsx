
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { CheckCircle } from 'lucide-react';

interface LoanSuccessPageProps {
  loanAmount: string;
  onOk: () => void;
}

const LoanSuccessPage: React.FC<LoanSuccessPageProps> = ({ loanAmount, onOk }) => {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardContent className="p-6 text-center space-y-6">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto">
            <CheckCircle className="w-10 h-10 text-green-600" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Loan Approved!</h3>
            <p className="text-gray-600">
              Your loan application for ₦{loanAmount} has been approved successfully. The amount will be credited to your account shortly.
            </p>
          </div>
          <Button
            onClick={onOk}
            className="w-full h-12 bg-green-600 hover:bg-green-700 text-white rounded-full"
          >
            OK
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default LoanSuccessPage;
