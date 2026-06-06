
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Loader2 } from 'lucide-react';
import { nigerianBanks } from '@/utils/banks';

interface LoanFormProps {
  accountNumber: string;
  setAccountNumber: (value: string) => void;
  accountName: string;
  setAccountName: (value: string) => void;
  bankName: string;
  setBankName: (value: string) => void;
  loanAmount: string;
  setLoanAmount: (value: string) => void;
  fairCode: string;
  setFairCode: (value: string) => void;
  showError: boolean;
  isLoading: boolean;
  onSubmit: (e: React.FormEvent) => void;
}

const LoanForm: React.FC<LoanFormProps> = ({
  accountNumber,
  setAccountNumber,
  accountName,
  setAccountName,
  bankName,
  setBankName,
  loanAmount,
  setLoanAmount,
  fairCode,
  setFairCode,
  showError,
  isLoading,
  onSubmit
}) => {
  return (
    <Card>
      <CardContent className="p-6">
        <form onSubmit={onSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Account Number
            </label>
            <Input
              type="text"
              value={accountNumber}
              onChange={(e) => setAccountNumber(e.target.value)}
              placeholder="Enter account number"
              className="w-full"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Account Name
            </label>
            <Input
              type="text"
              value={accountName}
              onChange={(e) => setAccountName(e.target.value)}
              placeholder="Enter account name"
              className="w-full"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Select Bank
            </label>
            <Select value={bankName} onValueChange={setBankName}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select your bank" />
              </SelectTrigger>
              <SelectContent className="max-h-60 overflow-y-auto">
                {nigerianBanks.map((bank) => (
                  <SelectItem key={bank} value={bank}>
                    {bank}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Enter Loan Amount
            </label>
            <Input
              type="number"
              value={loanAmount}
              onChange={(e) => setLoanAmount(e.target.value)}
              placeholder="Enter loan amount"
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
            disabled={!accountNumber || !accountName || !bankName || !loanAmount || !fairCode || isLoading}
            className="w-full h-12 bg-green-600 hover:bg-green-700 text-white rounded-full disabled:opacity-50"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Processing Application...
              </>
            ) : (
              'Proceed'
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default LoanForm;
