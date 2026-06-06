import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Loader2, CheckCircle } from 'lucide-react';

interface AddMoneyModalProps {
  isOpen: boolean;
  onClose: () => void;
  onBonusClaimed: (amount: number) => void;
}

const AddMoneyModal: React.FC<AddMoneyModalProps> = ({ isOpen, onClose, onBonusClaimed }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [canClaim, setCanClaim] = useState(true);
  const [timeUntilNextClaim, setTimeUntilNextClaim] = useState('');

  useEffect(() => {
    // Check if user has already claimed the one-time bonus
    const hasClaimedBonus = localStorage.getItem('hasClaimedWelcomeBonus');
    if (hasClaimedBonus === 'true') {
      setCanClaim(false);
      setTimeUntilNextClaim('Upgrade your account for next claim');
    }
  }, [isOpen]);

  const playSuccessSound = () => {
    // Create a simple success sound using Web Audio API
    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    
    // Create a sequence of pleasant tones
    const playTone = (frequency: number, startTime: number, duration: number) => {
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);
      
      oscillator.frequency.setValueAtTime(frequency, startTime);
      oscillator.type = 'sine';
      
      gainNode.gain.setValueAtTime(0, startTime);
      gainNode.gain.linearRampToValueAtTime(0.1, startTime + 0.05);
      gainNode.gain.exponentialRampToValueAtTime(0.01, startTime + duration);
      
      oscillator.start(startTime);
      oscillator.stop(startTime + duration);
    };
    
    // Play a pleasant success melody
    const now = audioContext.currentTime;
    playTone(523.25, now, 0.2); // C5
    playTone(659.25, now + 0.15, 0.2); // E5
    playTone(783.99, now + 0.3, 0.3); // G5
  };

  const handleClaimBonus = async () => {
    if (!canClaim) return;

    setIsLoading(true);

    // 5 seconds loading
    await new Promise(resolve => setTimeout(resolve, 5000));

    setIsLoading(false);
    setShowSuccess(true);

    // Play success sound
    try {
      playSuccessSound();
    } catch (error) {
      console.log('Audio not supported or blocked');
    }

    // Add bonus to balance
    onBonusClaimed(250000);

    // Mark bonus as claimed permanently
    localStorage.setItem('hasClaimedWelcomeBonus', 'true');
    setCanClaim(false);
  };

  const handleClose = () => {
    setIsLoading(false);
    setShowSuccess(false);
    onClose();
  };

  const handleSuccessOk = () => {
    setShowSuccess(false);
    onClose();
  };

  if (showSuccess) {
    return (
      <Dialog open={isOpen} onOpenChange={handleClose}>
        <DialogContent className="sm:max-w-md mx-auto rounded-2xl border-0 p-0 overflow-hidden bg-white fixed left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <div className="p-6 text-center space-y-6">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle className="w-10 h-10 text-green-600" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Success!</h3>
              <p className="text-gray-600">
                Successfully claimed FairMonie bonus of ₦250,000 Naira
              </p>
            </div>
            <Button
              onClick={handleSuccessOk}
              className="w-full h-12 bg-green-600 hover:bg-green-700 text-white rounded-full"
            >
              OK
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md mx-auto rounded-2xl border-0 p-0 overflow-hidden bg-white fixed left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <div className="gradient-green-light p-6 text-white text-center">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold text-white">
              Claim Your Bonus
            </DialogTitle>
          </DialogHeader>
        </div>
        
        <div className="p-6 space-y-6">
          {isLoading ? (
            <div className="text-center space-y-4">
              <Loader2 className="w-12 h-12 animate-spin text-green-600 mx-auto" />
              <p className="text-gray-700 font-medium">Claiming bonus in progress...</p>
            </div>
          ) : (
            <>
              <div className="text-center space-y-4">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                  <span className="text-2xl">💰</span>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">Welcome Bonus</h3>
                  <p className="text-gray-600 text-sm">
                    Claim your one-time welcome bonus of ₦250,000!
                  </p>
                  {!canClaim && (
                    <p className="text-red-500 text-xs mt-2">
                      {timeUntilNextClaim}
                    </p>
                  )}
                </div>
              </div>

              <div className="flex space-x-3">
                <Button
                  onClick={handleClose}
                  variant="outline"
                  className="flex-1 h-12 rounded-full border-gray-200 text-gray-600 hover:bg-gray-50"
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleClaimBonus}
                  disabled={!canClaim}
                  className="flex-1 h-12 bg-green-600 hover:bg-green-700 text-white rounded-full transition-all duration-200 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {canClaim ? 'Claim Now' : 'Already Claimed'}
                </Button>
              </div>
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AddMoneyModal;
