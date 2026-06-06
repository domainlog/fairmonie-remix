
import React, { useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import LoanForm from '@/components/loan/LoanForm';
import LoanConfirmModal from '@/components/loan/LoanConfirmModal';
import LoanSuccessPage from '@/components/loan/LoanSuccessPage';

interface LoanPageProps {
  onBack: () => void;
}

const LoanPage: React.FC<LoanPageProps> = ({ onBack }) => {
  const [accountNumber, setAccountNumber] = useState('');
  const [accountName, setAccountName] = useState('');
  const [bankName, setBankName] = useState('');
  const [loanAmount, setLoanAmount] = useState('');
  const [fairCode, setFairCode] = useState('');
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!accountNumber || !accountName || !bankName || !loanAmount || !fairCode) {
      return;
    }

    // Check faircode first
    if (fairCode !== 'F-187377') {
      setShowError(true);
      return;
    }

    setShowConfirmModal(true);
  };

  const handleConfirmProceed = async () => {
    setShowConfirmModal(false);
    setIsLoading(true);

    // 7 seconds loading
    await new Promise(resolve => setTimeout(resolve, 7000));

    setIsLoading(false);
    setShowSuccess(true);
  };

  const handleSuccessOk = () => {
    setShowSuccess(false);
    setAccountNumber('');
    setAccountName('');
    setBankName('');
    setLoanAmount('');
    setFairCode('');
  };

  if (showSuccess) {
    return (
      <LoanSuccessPage 
        loanAmount={loanAmount}
        onOk={handleSuccessOk}
      />
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
          <h1 className="text-xl font-semibold text-gray-900">Apply for Loan</h1>
        </div>
      </div>

      <div className="px-4 py-6">
        <LoanForm
          accountNumber={accountNumber}
          setAccountNumber={setAccountNumber}
          accountName={accountName}
          setAccountName={setAccountName}
          bankName={bankName}
          setBankName={setBankName}
          loanAmount={loanAmount}
          setLoanAmount={setLoanAmount}
          fairCode={fairCode}
          setFairCode={setFairCode}
          showError={showError}
          isLoading={isLoading}
          onSubmit={handleSubmit}
        />
      </div>

      <LoanConfirmModal
        isOpen={showConfirmModal}
        onClose={() => setShowConfirmModal(false)}
        onConfirm={handleConfirmProceed}
      />
    </div>
  );
};

export default LoanPage;
