
import React, { useState, useEffect } from 'react';
import { CheckCircle } from 'lucide-react';

interface WithdrawalNotification {
  name: string;
  amount: number;
}

interface WithdrawalNotificationsProps {
  isVisible?: boolean;
  onRestart?: () => void;
}

const WithdrawalNotifications: React.FC<WithdrawalNotificationsProps> = ({ isVisible = true, onRestart }) => {
  const [currentNotification, setCurrentNotification] = useState<WithdrawalNotification | null>(null);
  const [showNotification, setShowNotification] = useState(false);
  const [hasInitialDelay, setHasInitialDelay] = useState(false);

  // Enhanced list of Nigerian names with withdrawal amounts (180,000 - 250,000 mostly)
  const notifications: WithdrawalNotification[] = [
    { name: "Adebayo Ogundimu", amount: 187000 },
    { name: "Chioma Nwachukwu", amount: 195000 },
    { name: "Ibrahim Musa", amount: 182000 },
    { name: "Folake Adeyemi", amount: 203000 },
    { name: "Emeka Okafor", amount: 189000 },
    { name: "Aisha Bello", amount: 214000 },
    { name: "Tunde Bakare", amount: 198000 },
    { name: "Grace Okoro", amount: 221000 },
    { name: "Yusuf Aliyu", amount: 186000 },
    { name: "Ngozi Emenike", amount: 208000 },
    { name: "Babatunde Adegoke", amount: 193000 },
    { name: "Fatima Abdullahi", amount: 225000 },
    { name: "Chinedu Okoye", amount: 199000 },
    { name: "Blessing Ikechukwu", amount: 231000 },
    { name: "Hassan Mohammed", amount: 204000 },
    { name: "Kemi Oluwaseun", amount: 185000 },
    { name: "Victor Nnamdi", amount: 218000 },
    { name: "Amina Garba", amount: 192000 },
    { name: "Olumide Ajayi", amount: 207000 },
    { name: "Patience Eze", amount: 233000 },
    { name: "Segun Adebayo", amount: 192000 },
    { name: "Funmi Olaleye", amount: 218000 },
    { name: "Kelechi Nwosu", amount: 205000 },
    { name: "Maryam Yakubu", amount: 234000 },
    { name: "Chijioke Eze", amount: 187000 },
    { name: "Aminat Lawal", amount: 226000 },
    { name: "Biodun Fagbemi", amount: 198000 },
    { name: "Zainab Usman", amount: 242000 },
    { name: "Chuka Okonkwo", amount: 216000 },
    { name: "Hadiza Ibrahim", amount: 250000 },
    { name: "Olusegun Adeniyi", amount: 188000 },
    { name: "Kehinde Olayemi", amount: 201000 },
    { name: "Muhammed Saliu", amount: 195000 },
    { name: "Temitope Adesanya", amount: 223000 },
    { name: "Celestine Okafor", amount: 189000 },
    { name: "Rukayat Adamu", amount: 212000 },
    { name: "Adebola Olatunji", amount: 236000 },
    { name: "Chinenye Okwu", amount: 184000 },
    { name: "Suleiman Garba", amount: 229000 },
    { name: "Ifeoma Nzeribe", amount: 191000 },
    { name: "Damilola Adedeji", amount: 217000 },
    { name: "Hauwa Abdulrazaq", amount: 194000 },
    { name: "Oluwafemi Ogundipe", amount: 238000 },
    { name: "Ndidi Achebe", amount: 183000 },
    { name: "Aliyu Tanko", amount: 206000 },
    { name: "Adunni Olusanya", amount: 224000 },
    { name: "Chukwuma Okeke", amount: 197000 },
    { name: "Salamat Nuhu", amount: 245000 },
    { name: "Ebenezer Adeyemo", amount: 190000 },
    { name: "Chinelo Nnadi", amount: 213000 },
    { name: "Bashir Lawal", amount: 235000 },
    { name: "Adaora Nnamani", amount: 202000 },
    { name: "Gbenga Adebayo", amount: 219000 },
    { name: "Zulaihat Sani", amount: 186000 },
    { name: "Ikechukwu Obi", amount: 247000 },
    { name: "Bukola Adeoye", amount: 211000 },
    { name: "Nasiru Mohammed", amount: 188000 },
    { name: "Chidera Onyeka", amount: 230000 },
    { name: "Abdullahi Yusuf", amount: 199000 },
    { name: "Obianuju Okoro", amount: 222000 },
    { name: "Kayode Aderemi", amount: 196000 }
  ];

  useEffect(() => {
    if (!isVisible) return;

    // Load saved notification index from localStorage to continue where we left off
    const savedIndex = localStorage.getItem("withdrawalNotificationIndex");
    let currentIndex = savedIndex ? parseInt(savedIndex) : 0;
    
    // Ensure index is within bounds
    if (currentIndex >= notifications.length) {
      currentIndex = 0;
    }

    const displayNextNotification = () => {
      const currentIdx = parseInt(localStorage.getItem("withdrawalNotificationIndex") || "0");
      const notification = notifications[currentIdx];
      
      setCurrentNotification(notification);
      setShowNotification(true);

      // Hide notification after 4 seconds
      setTimeout(() => {
        setShowNotification(false);
      }, 4000);

      // Move to next notification and save index
      const nextIndex = (currentIdx + 1) % notifications.length;
      localStorage.setItem("withdrawalNotificationIndex", nextIndex.toString());
    };

    // Enhanced timing logic - delay initial notification when returning to dashboard
    const initialDelay = hasInitialDelay ? 8000 : 15000; // 8 seconds if already delayed, 15 seconds for first visit
    
    // Set initial delay flag
    if (!hasInitialDelay) {
      setHasInitialDelay(true);
    }

    // Show first notification after delay
    const initialTimeout = setTimeout(() => {
      displayNextNotification();
    }, initialDelay);

    // Then show notifications every 12 seconds (increased from 10)
    const delayedInterval = setTimeout(() => {
      const interval = setInterval(() => {
        displayNextNotification();
      }, 12000);

      return () => clearInterval(interval);
    }, initialDelay + 4000); // Start interval after first notification is shown

    return () => {
      clearTimeout(initialTimeout);
      clearTimeout(delayedInterval);
    };
  }, [isVisible, notifications.length, hasInitialDelay]);

  if (!currentNotification || !isVisible) return null;

  return (
    <div
      className={`fixed top-4 left-4 right-4 z-50 transform transition-all duration-500 ease-in-out ${
        showNotification 
          ? 'translate-y-0 opacity-100' 
          : '-translate-y-full opacity-0'
      }`}
    >
      <div className="bg-green-50 border border-green-200 rounded-lg shadow-lg p-3 mx-auto max-w-sm">
        <div className="flex items-center space-x-3">
          <div className="flex-shrink-0">
            <CheckCircle className="w-5 h-5 text-green-600" />
          </div>
          <div className="flex-1">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-green-800">
                Withdrawal Successful
              </p>
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            </div>
            <p className="text-xs text-green-700 mt-1">
              <span className="font-semibold">{currentNotification.name}</span> successfully withdrew{' '}
              <span className="font-bold">₦{currentNotification.amount.toLocaleString()}</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WithdrawalNotifications;
