 import React, { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { ArrowLeft, Loader2, CreditCard, AlertCircle, Copy, CheckCircle, Upload, Image as ImageIcon, X } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { useTextToSpeech } from '@/hooks/useTextToSpeech';

interface BuyFaircodeModalProps {
  onBack: () => void;
  user: { name: string; email: string };
}

const BuyFaircodeModal: React.FC<BuyFaircodeModalProps> = ({ onBack, user }) => {
  const [step, setStep] = useState<'form' | 'loading' | 'payment' | 'transferNotice' | 'confirm' | 'declined'>('form');
  const [fullName, setFullName] = useState(user.name || '');
  const [email, setEmail] = useState(user.email || '');
  const [isLoading, setIsLoading] = useState(false);
  const [showTransferNotice, setShowTransferNotice] = useState(false);

  // NEW: upload state
  const [receiptImage, setReceiptImage] = useState<File | null>(null);
  const [receiptPreview, setReceiptPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const { speak, stopSpeaking, enableSpeech } = useTextToSpeech();

  // Enable speech on component mount and user interactions
  useEffect(() => {
    enableSpeech();

    const handleUserInteraction = () => {
      enableSpeech();
      // Force speech API initialization safely
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        try {
          const test = new SpeechSynthesisUtterance('');
          test.volume = 0;
          window.speechSynthesis.speak(test);
          window.speechSynthesis.cancel();
        } catch (error) {
          console.log('Speech init error:', error);
        }
      }
    };

    const events = ['click', 'touchstart', 'mousedown', 'keydown', 'focus'] as const;
    events.forEach(event => {
      document.addEventListener(event, handleUserInteraction as EventListener, { once: true, passive: true } as AddEventListenerOptions);
    });

    const timer = setTimeout(() => {
      handleUserInteraction();
    }, 100);

    return () => {
      events.forEach(event => {
        document.removeEventListener(event, handleUserInteraction as EventListener);
      });
      clearTimeout(timer);
    };
  }, [enableSpeech]);

  // Auto-speak when transfer notice is shown
  useEffect(() => {
    if (showTransferNotice) {
      const textToSpeak = `Before you make this transfer, please note: Transfer only the exact amount of 7,500 naira. Do not transfer an incorrect amount. Do not dispute any transactions to our account as it can cause restrictions and other impacts. Avoid using Opay bank for your payment as this can lead to delays in verifying your payment click, I understand to continue your payment.`;

      enableSpeech();
      const t = setTimeout(() => {
        speak(textToSpeak);
      }, 500);

      return () => {
        clearTimeout(t);
        stopSpeaking();
      };
    }
  }, [showTransferNotice, speak, stopSpeaking, enableSpeech]);

  // Cleanup object URL for preview
  useEffect(() => {
    return () => {
      if (receiptPreview) URL.revokeObjectURL(receiptPreview);
    };
  }, [receiptPreview]);

  const handleCopyAccountNumber = () => {
    enableSpeech();
    navigator.clipboard.writeText('6056823731').then(() => {
      toast({
        title: "Copied!",
        description: "Account number copied to clipboard",
        duration: 2000,
      });
    }).catch(() => {
      toast({
        title: "Copy failed",
        description: "Please copy the account number manually.",
        duration: 2000,
      });
    });
  };

  const handleProceedToPayment = async () => {
    enableSpeech();
    if (!fullName.trim() || !email.trim()) {
      alert('Please fill in all required fields');
      return;
    }

    setStep('loading');
    setIsLoading(true);

    // 7 seconds loading
    setTimeout(() => {
      setIsLoading(false);
      setStep('payment');
      // Auto show transfer notice after showing payment details
      setTimeout(() => {
        setShowTransferNotice(true);
      }, 500);
    }, 7000);
  };

  const handleContinuePayment = () => {
    enableSpeech();
    setShowTransferNotice(false);
  };

  // NEW: select image
  const handleChooseImage = () => {
    fileInputRef.current?.click();
  };

  // NEW: on file change/validation
  const handleFileChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const file = e.target.files?.[0] || null;
    if (!file) {
      setReceiptImage(null);
      setReceiptPreview(null);
      return;
    }

    if (!file.type.startsWith('image/')) {
      toast({
        title: "Invalid file",
        description: "Please upload an image file (PNG, JPG, etc).",
        duration: 2500,
      });
      e.target.value = '';
      return;
    }

    const maxBytes = 5 * 1024 * 1024; // 5MB
    if (file.size > maxBytes) {
      toast({
        title: "File too large",
        description: "Maximum size is 5MB.",
        duration: 2500,
      });
      e.target.value = '';
      return;
    }

    // Success
    if (receiptPreview) URL.revokeObjectURL(receiptPreview);
    setReceiptImage(file);
    setReceiptPreview(URL.createObjectURL(file));
  };

  // NEW: remove image
  const handleRemoveImage = () => {
    setReceiptImage(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
    if (receiptPreview) URL.revokeObjectURL(receiptPreview);
    setReceiptPreview(null);
  };

  const handlePaymentConfirm = () => {
    enableSpeech();

    // Guard: require image
    if (!receiptImage) {
      toast({
        title: "Upload required",
        description: "Please upload your payment screenshot before continuing.",
        duration: 2500,
      });
      return;
    }

    setStep('confirm');
    setIsLoading(true);

    // 10 seconds loading then decline
    setTimeout(() => {
      setIsLoading(false);
      setStep('declined');
    }, 10000);
  };

  if (step === 'form') {
    return (
      <div className="min-h-screen bg-green-50">
        {/* Header */}
        <div className="bg-green-600 px-4 py-4 shadow-sm">
          <div className="flex items-center space-x-3">
            <button
              onClick={onBack}
              className="p-2 hover:bg-green-700 rounded-full transition-colors"
            >
              <ArrowLeft className="w-6 h-6 text-white" />
            </button>
            <h1 className="text-xl font-semibold text-white">Buy Faircode</h1>
          </div>
        </div>

        <div className="px-4 py-6">
          <Card className="border-green-200 shadow-lg">
            <CardHeader className="bg-green-100">
              <CardTitle className="text-green-800 text-center">
                <CreditCard className="w-8 h-8 mx-auto mb-2" />
                Faircode Purchase
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600 mb-2">₦7,500</div>
                <p className="text-gray-600">One-time purchase</p>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name *
                  </label>
                  <Input
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Enter your full name"
                    className="h-12 border-green-300 focus:border-green-500 focus:ring-green-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address *
                  </label>
                  <Input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address"
                    className="h-12 border-green-300 focus:border-green-500 focus:ring-green-500"
                    required
                  />
                </div>
              </div>

              <Button
                onClick={handleProceedToPayment}
                className="w-full h-12 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg"
              >
                Proceed to Payment
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  if (step === 'loading') {
    return (
      <div className="min-h-screen bg-green-50 flex items-center justify-center">
        <Card className="w-full max-w-sm border-green-200">
          <CardContent className="p-8 text-center">
            <Loader2 className="w-12 h-12 animate-spin text-green-600 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-green-800 mb-2">Processing...</h3>
            <p className="text-green-600">Preparing payment account details</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (step === 'payment') {
    return (
      <>
        <div className="min-h-screen bg-green-50">
          {/* Header */}
          <div className="bg-green-600 px-4 py-4 shadow-sm">
            <div className="flex items-center space-x-3">
              <button
                onClick={() => setStep('form')}
                className="p-2 hover:bg-green-700 rounded-full transition-colors"
              >
                <ArrowLeft className="w-6 h-6 text-white" />
              </button>
              <h1 className="text-xl font-semibold text-white">Make Payment</h1>
            </div>
          </div>

          <div className="px-4 py-6 flex items-center justify-center">
            <Card className="w-full max-w-sm border-green-200 shadow-lg">
              <CardContent className="p-4 space-y-3">
                <div className="text-center">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <div className="w-6 h-6 bg-green-600 rounded flex items-center justify-center">
                      <div className="w-3 h-1 bg-white rounded"></div>
                    </div>
                  </div>

                  <h2 className="text-lg font-semibold text-green-800 mb-2">Make Payment</h2>
                  <p className="text-green-600 text-sm mb-4">Transfer to the account below</p>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between items-center p-2 bg-green-50 rounded">
                    <div>
                      <p className="text-xs text-gray-600">Account Number</p>
                      <p className="font-semibold text-sm">6056823731</p>
                    </div>
                    <button
                      onClick={handleCopyAccountNumber}
                      className="p-2 hover:bg-green-100 rounded-full transition-colors"
                    >
                      <Copy className="w-4 h-4 text-green-600" />
                    </button>
                  </div>

                  <div className="flex justify-between items-center p-2 bg-green-50 rounded">
                    <div>
                      <p className="text-xs text-gray-600">Bank</p>
                      <p className="font-semibold text-sm">MONIEPOINT MFB</p>
                    </div>
                  </div>

                  <div className="flex justify-between items-center p-2 bg-green-50 rounded">
                    <div>
                      <p className="text-xs text-gray-600">Account Name</p>
                      <p className="font-semibold text-sm">Lovelyn Fyneboy</p>
                    </div>
                  </div>
                </div>

                <div className="p-2 bg-green-50 border border-green-200 rounded">
                  <p className="text-xs text-gray-600">Fee</p>
                  <p className="text-xl font-bold text-green-600">7,500</p>
                </div>

                {/* NEW: Upload Image (required) */}
                <div className="p-3 bg-green-50 border border-dashed border-green-300 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <ImageIcon className="w-5 h-5 text-green-700" />
                      <p className="text-sm font-medium text-green-800">Upload payment screenshot <span className="text-red-600">*</span></p>
                    </div>
                    {receiptImage && (
                      <button
                        type="button"
                        onClick={handleRemoveImage}
                        className="inline-flex items-center gap-1 text-xs px-2 py-1 rounded-md bg-green-100 hover:bg-green-200 text-green-800"
                        aria-label="Remove image"
                      >
                        <X className="w-3 h-3" />
                        Remove
                      </button>
                    )}
                  </div>

                  <div className="mt-3">
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleFileChange}
                      // "required" is here for semantics; logic below actually enforces it.
                      required
                    />
                    {!receiptImage ? (
                      <button
                        type="button"
                        onClick={handleChooseImage}
                        className="w-full flex items-center justify-center gap-2 rounded-md border border-green-300 bg-green-100 hover:bg-green-200 px-3 py-2 text-sm text-green-800"
                      >
                        <Upload className="w-4 h-4" />
                        Choose image
                      </button>
                    ) : (
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-xs text-green-800">
                          <CheckCircle className="w-4 h-4 text-green-600" />
                          <span>{receiptImage.name}</span>
                        </div>
                        {receiptPreview && (
                          <img
                            src={receiptPreview}
                            alt="Receipt preview"
                            className="w-full max-h-56 object-cover rounded-md border border-green-200"
                          />
                        )}
                      </div>
                    )}
                    <p className="mt-2 text-[11px] text-green-700">
                      Upload: your payment receipt for fast verification.
                    </p>
                  </div>
                </div>

                <Button
                  onClick={handlePaymentConfirm}
                  className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-full text-sm disabled:opacity-60 disabled:cursor-not-allowed"
                  disabled={!receiptImage}
                >
                  I have paid
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Transfer Notice Dialog */}
        <Dialog open={showTransferNotice} onOpenChange={() => {}}>
          <DialogContent className="max-w-sm mx-auto">
            <div className="text-center py-4 space-y-4">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center">
                  <div className="w-4 h-4 bg-white rounded-full"></div>
                </div>
              </div>

              <h2 className="text-xl font-semibold">Pay NGN 7,500.00</h2>
              <p className="text-gray-600">Before you make this transfer</p>

              <div className="space-y-3 text-left">
                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                  <div>
                    <p className="font-semibold text-orange-600">Transfer only the exact amount</p>
                    <p className="text-sm text-gray-600">Do not transfer an incorrect amount.</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                  <div>
                    <p className="font-semibold text-orange-600">Do not dispute any transactions made to our account</p>
                    <p className="text-sm text-gray-600">It can cause restrictions and other impacts.</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                  <div>
                    <p className="font-semibold text-orange-600">Avoid using Opay bank for your payment</p>
                    <p className="text-sm text-gray-600">This can lead to delays is verifying your payment.</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3 p-3 bg-blue-50 rounded">
                  <input type="checkbox" className="mt-1" defaultChecked />
                  <p className="text-sm">I understand these instructions.</p>
                </div>
              </div>

              <Button
                onClick={handleContinuePayment}
                className="w-full bg-green-600 hover:bg-green-700 text-white"
              >
                Continue Payment
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </>
    );
  }

  if (step === 'confirm') {
    return (
      <div className="min-h-screen bg-green-50 flex items-center justify-center">
        <Card className="w-full max-w-sm border-green-200">
          <CardContent className="p-8 text-center">
            <Loader2 className="w-12 h-12 animate-spin text-green-600 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-green-800 mb-2">Confirming...</h3>
            <p className="text-green-600">Confirming your payment please wait..</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (step === 'declined') {
    return (
      <div className="min-h-screen bg-green-50">
        {/* Header */}
        <div className="bg-red-600 px-4 py-4 shadow-sm">
          <div className="flex items-center space-x-3">
            <button
              onClick={onBack}
              className="p-2 hover:bg-red-700 rounded-full transition-colors"
            >
              <ArrowLeft className="w-6 h-6 text-white" />
            </button>
            <h1 className="text-xl font-semibold text-white">Payment Status</h1>
          </div>
        </div>

        <div className="px-4 py-6">
          <Card className="border-red-200 shadow-lg">
            <CardContent className="p-8 text-center">
              <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-red-600 mb-4">Payment Not Confirmed</h3>
              <p className="text-gray-700 mb-6">
                Payment not confirmed. Please don't dispute any transfer to us. Contact support instead.
              </p>
              <Button
                onClick={onBack}
                variant="outline"
                className="border-red-300 text-red-600 hover:bg-red-50"
              >
                Go Back
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return null;
};

export default BuyFaircodeModal;
