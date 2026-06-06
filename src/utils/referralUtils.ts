
// Utility function to credit referral bonus when a new user signs up
export const creditReferralBonus = (referralCode: string) => {
  if (!referralCode) return;
  
  // Find the referrer by their referral code
  const referrerEmail = findReferrerByCode(referralCode);
  if (!referrerEmail) return;
  
  // Get existing pending referrals for this code
  const pendingKey = `pendingReferrals_${referralCode}`;
  const existingPending = localStorage.getItem(pendingKey);
  const currentPending = existingPending ? parseInt(existingPending) : 0;
  
  // Add one more referral
  localStorage.setItem(pendingKey, (currentPending + 1).toString());
  
  console.log(`Referral bonus queued for referral code: ${referralCode}`);
};

// Helper function to find referrer email by referral code
const findReferrerByCode = (referralCode: string): string | null => {
  // Search through all stored user referral codes
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (key && key.startsWith('userReferralCode_')) {
      const storedCode = localStorage.getItem(key);
      if (storedCode === referralCode) {
        // Extract email from the key
        return key.replace('userReferralCode_', '');
      }
    }
  }
  return null;
};

// Function to be called when a new user registers with a referral code
export const handleNewUserSignup = (referralCode?: string) => {
  if (referralCode) {
    creditReferralBonus(referralCode);
  }
};
