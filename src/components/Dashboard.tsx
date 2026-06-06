import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious, type CarouselApi } from '@/components/ui/carousel';
import { 
  Plus, 
  ArrowUpRight, 
  ArrowDownLeft, 
  Eye, 
  History, 
  Users, 
  Building, 
  TrendingUp, 
  Smartphone, 
  Wifi, 
  Target, 
  Tv, 
  UserPlus, 
  MoreHorizontal,
  Headphones,
  Maximize,
  Bell,
  Gift,
  Loader2,
  ShieldCheck,
  MessageCircle,
  Mail,
  Bot,
  User,
  Info,
  Download,
  Play,
  CreditCard
} from 'lucide-react';
import AddMoneyModal from '@/components/AddMoneyModal';
import TransactionHistory from '@/components/TransactionHistory';
import JoinGroupPage from '@/components/JoinGroupPage';
import SupportPage from '@/components/SupportPage';
import LiveChat from '@/components/LiveChat';
import ProfileMenu from '@/components/ProfileMenu';
import InviteEarn from '@/components/InviteEarn';
import TVRechargePage from '@/components/TVRechargePage';
import BettingPage from '@/components/BettingPage';
import AboutPage from '@/components/AboutPage';
import ProfileInfoPage from '@/components/ProfileInfoPage';
import AirtimePage from '@/components/AirtimePage';
import DataPage from '@/components/DataPage';
import LoanPage from '@/components/LoanPage';
import WithdrawalPage from '@/components/WithdrawalPage';
import BuyFaircodeModal from '@/components/BuyFaircodeModal';
import BuyFaircodePage from '@/components/BuyFaircodePage';
import WhatsAppInviteModal from '@/components/WhatsAppInviteModal';
import WithdrawalNotifications from '@/components/WithdrawalNotifications';
import { toast } from '@/hooks/use-toast';
import WelcomeModal from '@/components/WelcomeModal';
import WhatsAppWithdrawalModal from '@/components/WhatsAppWithdrawalModal';

interface User {
  name: string;
  email: string;
}

interface DashboardProps {
  user: User;
  onAddMoney: () => void;
  onLogout?: () => void;
}

const Dashboard: React.FC<DashboardProps> = ({ user, onAddMoney, onLogout }) => {
  const [balance, setBalance] = useState(0.00);
  const [showBalance, setShowBalance] = useState(true);
  const [showTransactionHistory, setShowTransactionHistory] = useState(false);
  const [showAddMoneyModal, setShowAddMoneyModal] = useState(false);
  const [showJoinGroup, setShowJoinGroup] = useState(false);
  const [showSupport, setShowSupport] = useState(false);
  const [showLiveChat, setShowLiveChat] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showInviteEarn, setShowInviteEarn] = useState(false);
  const [showTVRecharge, setShowTVRecharge] = useState(false);
  const [showBetting, setShowBetting] = useState(false);
  const [showAbout, setShowAbout] = useState(false);
  const [showProfileInfo, setShowProfileInfo] = useState(false);
  const [showAirtime, setShowAirtime] = useState(false);
  const [showData, setShowData] = useState(false);
  const [showLoan, setShowLoan] = useState(false);
  const [showWithdrawal, setShowWithdrawal] = useState(false);
  const [api, setApi] = useState<CarouselApi>();
  const [transactions, setTransactions] = useState<any[]>([]);
  const [showBuyFaircode, setShowBuyFaircode] = useState(false);
  const [showBuyFaircodePage, setShowBuyFaircodePage] = useState(false);
  const [showWhatsAppInvite, setShowWhatsAppInvite] = useState(false);
  const [hasReturnedFromSubPage, setHasReturnedFromSubPage] = useState(false);
  const [showNotifications, setShowNotifications] = useState(true);
  const [notificationKey, setNotificationKey] = useState(0);
  const [hasClaimedBonus, setHasClaimedBonus] = useState(false);
  const [showWelcomeModal, setShowWelcomeModal] = useState(false);
  const [showWhatsAppWithdrawal, setShowWhatsAppWithdrawal] = useState(false);
  const [lastWithdrawal, setLastWithdrawal] = useState<any>(null);
  const [showScrollCBN, setShowScrollCBN] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);

  // Get first name from user.name
  const firstName = user.name.split(' ')[0];

  // Promotional banners - Updated with new images
  const promoImages = [
    '/lovable-uploads/02ef7951-86d6-41f2-9741-99e91f4e5d95.png',
    '/lovable-uploads/a55e6b57-2776-41a6-8c33-c2a3a419fbe2.png',
    '/lovable-uploads/b28d4378-fba2-4204-ad40-3241cfb0f79d.png',
    '/lovable-uploads/1ff28574-03c0-4097-a1f7-ca4d6fd6ddea.png',
    '/lovable-uploads/1a0dfae0-5d6c-4c61-9895-7d179a6596ef.png',
    '/lovable-uploads/1f7c7b19-5489-4cb8-a681-df0a31422bad.png',
    '/lovable-uploads/af5add22-7daa-42ca-a917-9709af91e502.png'
  ];

  // Load balance and transactions from localStorage on component mount
  useEffect(() => {
    const savedBalance = localStorage.getItem(`userBalance_${user.email}`);
    if (savedBalance) {
      setBalance(parseFloat(savedBalance));
    }
    
    const savedTransactions = localStorage.getItem(`userTransactions_${user.email}`);
    if (savedTransactions) {
      setTransactions(JSON.parse(savedTransactions));
    }

    // Check if user has claimed bonus before
    const bonusClaimed = localStorage.getItem(`bonusClaimed_${user.email}`);
    if (bonusClaimed) {
      setHasClaimedBonus(true);
    }

    // Check for pending referral bonuses
    checkForReferralBonuses();
    
    // Show welcome modal on every app startup
    const welcomeTimer = setTimeout(() => {
      setShowWelcomeModal(true);
    }, 1000);
    
    return () => clearTimeout(welcomeTimer);
  }, [user.email]);

  // Function to check and credit referral bonuses
  const checkForReferralBonuses = () => {
    const userReferralCode = localStorage.getItem(`userReferralCode_${user.email}`);
    if (!userReferralCode) return;

    const pendingKey = `pendingReferrals_${userReferralCode}`;
    const pendingReferrals = localStorage.getItem(pendingKey);
    
    if (pendingReferrals) {
      const newReferrals = parseInt(pendingReferrals);
      const bonusAmount = newReferrals * 6500;
      
      // Credit the balance
      setBalance(prevBalance => prevBalance + bonusAmount);
      
      // Add transaction record
      const newTransaction = {
        id: Date.now(),
        type: 'credit',
        amount: bonusAmount,
        description: `Referral bonus (${newReferrals} referral${newReferrals > 1 ? 's' : ''})`,
        date: new Date().toISOString()
      };
      setTransactions(prev => [newTransaction, ...prev]);
      
      // Update referral data
      const savedReferralData = localStorage.getItem(`referralData_${user.email}`);
      const referralData = savedReferralData ? JSON.parse(savedReferralData) : { totalReferrals: 0, totalEarnings: 0 };
      referralData.totalReferrals += newReferrals;
      referralData.totalEarnings += bonusAmount;
      localStorage.setItem(`referralData_${user.email}`, JSON.stringify(referralData));
      
      // Clear pending referrals
      localStorage.removeItem(pendingKey);
    }
  };

  // Save balance to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem(`userBalance_${user.email}`, balance.toString());
  }, [balance, user.email]);

  // Save transactions to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem(`userTransactions_${user.email}`, JSON.stringify(transactions));
  }, [transactions, user.email]);

  // Auto-scroll carousel
  useEffect(() => {
    if (!api) {
      return;
    }

    const interval = setInterval(() => {
      if (api) {
        const nextIndex = (api.selectedScrollSnap() + 1) % promoImages.length;
        api.scrollTo(nextIndex);
      }
    }, 4000); // Change slide every 4 seconds

    return () => clearInterval(interval);
  }, [api, promoImages.length]);

  // Handle back navigation to prevent app exit
  useEffect(() => {
    const handleBackButton = (event: PopStateEvent) => {
      const isOnSubPage = showTransactionHistory || showJoinGroup || showSupport || 
                         showLiveChat || showProfileMenu || showInviteEarn || 
                         showTVRecharge || showBetting || showAbout || showProfileInfo || 
                         showAirtime || showData || showLoan || showWithdrawal;
      
      if (isOnSubPage) {
        event.preventDefault();
        
        setShowTransactionHistory(false);
        setShowJoinGroup(false);
        setShowSupport(false);
        setShowLiveChat(false);
        setShowProfileMenu(false);
        setShowInviteEarn(false);
        setShowTVRecharge(false);
        setShowBetting(false);
        setShowAbout(false);
        setShowProfileInfo(false);
        setShowAirtime(false);
        setShowData(false);
        setShowLoan(false);
        setShowWithdrawal(false);
        
        setHasReturnedFromSubPage(true);
        window.history.pushState(null, '', window.location.href);

        // Don't restart notifications when returning to dashboard - let them continue
        setShowNotifications(true);
        
        // Show WhatsApp invite modal after 3 seconds when returning from other pages
        setTimeout(() => {
          setShowWhatsAppInvite(true);
        }, 3000);
      }
    };

    window.history.pushState(null, '', window.location.href);
    window.addEventListener('popstate', handleBackButton);
    
    return () => window.removeEventListener('popstate', handleBackButton);
  }, [showTransactionHistory, showJoinGroup, showSupport, showLiveChat, 
      showProfileMenu, showInviteEarn, showTVRecharge, showBetting, 
      showAbout, showProfileInfo, showAirtime, showData, showLoan, showWithdrawal]);

  // Handle scroll to show/hide CBN text
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      if (currentScrollY < lastScrollY && currentScrollY > 100) {
        // Scrolling up and not at top
        setShowScrollCBN(true);
      } else {
        // Scrolling down or at top
        setShowScrollCBN(false);
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  const quickActions = [
    { title: 'Support', icon: Users, color: 'bg-green-100 text-green-600', onClick: () => setShowSupport(true) },
    { title: 'Groups', icon: Building, color: 'bg-green-100 text-green-600', onClick: () => setShowJoinGroup(true) },
    { title: 'Withdraw', icon: TrendingUp, color: 'bg-green-100 text-green-600', onClick: () => setShowWithdrawal(true) }
  ];

  const NairaIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <path d="M7 4h2v2h3V4h2v2h2v2h-2v4h2v2h-2v2h2v2h-2v2h2v-2H9v2H7v-2H5v-2h2v-2H5v-2h2V8H5V6h2V4zm2 4v4h3V8H9z"/>
    </svg>
  );

  const services = [
    { title: 'Airtime', icon: Smartphone, color: 'bg-green-100 text-green-600', onClick: () => setShowAirtime(true) },
    { title: 'Data', icon: Wifi, color: 'bg-green-100 text-green-600', onClick: () => setShowData(true) },
    { title: 'Betting', icon: Target, color: 'bg-green-100 text-green-600', onClick: () => setShowBetting(true) },
    { title: 'TV', icon: Tv, color: 'bg-green-100 text-green-600', onClick: () => setShowTVRecharge(true) },
    { title: 'Buy Faircode', icon: CreditCard, color: 'bg-green-100 text-green-600', onClick: () => setShowBuyFaircode(true) },
    { title: 'Loan', icon: NairaIcon, color: 'bg-green-100 text-green-600', onClick: () => setShowLoan(true) },
    { title: 'Invitation', icon: UserPlus, color: 'bg-green-100 text-green-600', onClick: () => setShowInviteEarn(true) },
    { title: 'More', icon: MoreHorizontal, color: 'bg-green-100 text-green-600', onClick: () => setShowProfileMenu(true) }
  ];

  const handleAddMoneyClick = () => {
    setShowAddMoneyModal(true);
  };

  const handleBonusClaimed = (amount: number) => {
    if (hasClaimedBonus) {
      toast({
        title: "Bonus Already Claimed",
        description: "You have already claimed your signup bonus.",
        duration: 3000,
      });
      return;
    }

    setBalance(prevBalance => prevBalance + amount);
    setHasClaimedBonus(true);
    localStorage.setItem(`bonusClaimed_${user.email}`, 'true');
    
    const newTransaction = {
      id: Date.now(),
      type: 'credit',
      amount: amount,
      description: 'Bonus claimed',
      date: new Date().toISOString()
    };
    setTransactions(prev => [newTransaction, ...prev]);
  };

  const handleWithdrawal = (amount: number) => {
    setBalance(prevBalance => prevBalance - amount);
    
    const newTransaction = {
      id: Date.now(),
      type: 'debit',
      amount: amount,
      description: 'Withdrawal',
      date: new Date().toISOString()
    };
    setTransactions(prev => [newTransaction, ...prev]);
    
    // Store withdrawal details for WhatsApp sharing
    setLastWithdrawal({
      amount: amount.toString(),
      bank: 'Bank Account',
      accountNumber: 'Your Account'
    });
  };

  const handleUpdateBalance = (amount: number) => {
    setBalance(prevBalance => prevBalance + amount);
    
    const newTransaction = {
      id: Date.now(),
      type: 'credit',
      amount: amount,
      description: 'Referral bonus',
      date: new Date().toISOString()
    };
    setTransactions(prev => [newTransaction, ...prev]);
  };

  const handleServiceClick = (service: any) => {
    if (service.onClick) {
      service.onClick();
    }
  };

  const handleQuickActionClick = (action: any) => {
    if (action.onClick) {
      action.onClick();
    }
  };

  const handleTransactionHistoryClick = () => {
    setShowTransactionHistory(true);
  };

  if (showTransactionHistory) {
    return <TransactionHistory onBack={() => setShowTransactionHistory(false)} transactions={transactions} />;
  }

  if (showWithdrawal) {
    return (
      <WithdrawalPage
        onBack={() => {
          setShowWithdrawal(false);
          setHasReturnedFromSubPage(true);
        }}
        balance={balance}
        onWithdraw={handleWithdrawal}
        onBuyFairCode={() => {
          setShowWithdrawal(false);
          setShowBuyFaircode(true);
        }}
      />
    );
  }

  if (showBuyFaircodePage) {
    return (
      <BuyFaircodePage
        onBack={() => {
          setShowBuyFaircodePage(false);
          setHasReturnedFromSubPage(true);
        }}
        user={user}
      />
    );
  }

  if (showBuyFaircode) {
    return <BuyFaircodeModal onBack={() => setShowBuyFaircode(false)} user={user} />;
  }

  if (showJoinGroup) {
    return <JoinGroupPage onBack={() => setShowJoinGroup(false)} />;
  }

  if (showSupport) {
    return (
      <SupportPage 
        onBack={() => setShowSupport(false)} 
        onLiveChat={() => {
          setShowSupport(false);
          setShowLiveChat(true);
        }} 
      />
    );
  }

  if (showLiveChat) {
    return (
      <LiveChat 
        onBack={() => setShowLiveChat(false)} 
        user={user} 
        balance={balance}
        transactions={transactions}
      />
    );
  }

  if (showProfileMenu) {
    return (
      <ProfileMenu 
        onBack={() => setShowProfileMenu(false)} 
        user={user}
        onLogout={onLogout}
        onProfileInfo={() => {
          setShowProfileMenu(false);
          setShowProfileInfo(true);
        }}
        onAbout={() => {
          setShowProfileMenu(false);
          setShowAbout(true);
        }}
      />
    );
  }

  if (showAbout) {
    return <AboutPage onBack={() => setShowAbout(false)} />;
  }

  if (showProfileInfo) {
    return <ProfileInfoPage onBack={() => setShowProfileInfo(false)} user={user} />;
  }

  if (showInviteEarn) {
    return <InviteEarn onBack={() => setShowInviteEarn(false)} user={user} onUpdateBalance={handleUpdateBalance} />;
  }

  if (showTVRecharge) {
    return <TVRechargePage onBack={() => setShowTVRecharge(false)} />;
  }

  if (showBetting) {
    return <BettingPage onBack={() => setShowBetting(false)} />;
  }

  if (showAirtime) {
    return <AirtimePage onBack={() => setShowAirtime(false)} />;
  }

  if (showData) {
    return <DataPage onBack={() => setShowData(false)} />;
  }

  if (showLoan) {
    return <LoanPage onBack={() => setShowLoan(false)} />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Withdrawal Notifications - always visible and continuous */}
      <WithdrawalNotifications isVisible={true} />

      {/* Header */}
      <div className="bg-white px-4 py-4 shadow-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Avatar className="w-10 h-10">
              <AvatarFallback className="bg-green-100 text-green-600 font-semibold">
                {firstName.charAt(0)}
              </AvatarFallback>
            </Avatar>
            <span className="text-lg font-medium text-gray-900">Hi, {firstName}</span>
          </div>
          <div className="flex items-center space-x-3">
            <button 
              onClick={() => setShowLiveChat(true)}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors animate-slow-bounce"
            >
              <Headphones className="w-6 h-6 text-gray-600" />
            </button>
            <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
              <Maximize className="w-6 h-6 text-gray-600" />
            </button>
            <button
              onClick={handleTransactionHistoryClick}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors relative"
            >
              <Bell className="w-6 h-6 text-gray-600" />
              {transactions.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {transactions.length > 9 ? '9+' : transactions.length}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>

      <div className="px-4 py-6 space-y-6">
        {/* Balance Card */}
        <Card className="gradient-green text-white border-0 shadow-lg animate-slideUp">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-2">
                <ShieldCheck className="w-5 h-5" />
                <span className="text-sm font-medium">Available Balance</span>
                <button
                  onClick={() => setShowBalance(!showBalance)}
                  className="p-1 hover:bg-white/20 rounded-full transition-colors"
                >
                  <Eye className="w-4 h-4" />
                </button>
              </div>
            </div>
            
            <div className="flex flex-col items-center justify-center text-center mb-6">
              <div className="text-3xl font-bold mb-4">
                {showBalance ? `₦${balance.toLocaleString()}.00` : '****'}
              </div>
              <Button
                onClick={handleAddMoneyClick}
                className="bg-white text-green-600 hover:bg-gray-50 rounded-full px-6 py-2 font-medium transition-all duration-200 transform hover:scale-105"
              >
                <Gift className="w-4 h-4 mr-2" />
                Claim Bonus 🎁
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <div className="grid grid-cols-3 gap-4">
          {quickActions.map((action, index) => (
            <div key={index} className="text-center cursor-pointer" onClick={() => handleQuickActionClick(action)}>
              <div className={`w-12 h-12 rounded-full ${action.color} flex items-center justify-center mx-auto mb-3`}>
                <action.icon className="w-6 h-6" />
              </div>
              <p className="text-sm font-medium text-gray-700">{action.title}</p>
            </div>
          ))}
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-4 gap-4">
          {services.map((service, index) => (
            <div key={index} className="text-center cursor-pointer" onClick={() => handleServiceClick(service)}>
              <div className={`w-10 h-10 rounded-full ${service.color} flex items-center justify-center mx-auto mb-2`}>
                <service.icon className="w-5 h-5" />
              </div>
              <p className="text-xs font-medium text-gray-700">{service.title}</p>
            </div>
          ))}
        </div>

        {/* Promotional Banner Carousel */}
        <div className="w-full">
          <Carousel className="w-full" setApi={setApi}>
            <CarouselContent>
              {promoImages.map((image, index) => (
                <CarouselItem key={index}>
                  <div className="p-1">
                    <Card className="border-0 shadow-lg overflow-hidden">
                      <CardContent className="p-0">
                        <img 
                          src={image} 
                          alt={`FairMoney Promo ${index + 1}`}
                          className="w-full h-32 object-cover"
                        />
                      </CardContent>
                    </Card>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </div>

        {/* CBN Verification - Only shows on scroll up */}
        {showScrollCBN && (
          <div className="text-center py-4 animate-fadeIn">
            <p className="text-green-600 font-semibold text-sm">
              ✓ Verified by CBN
            </p>
          </div>
        )}
      </div>

      {/* Modals */}
      <AddMoneyModal 
        isOpen={showAddMoneyModal} 
        onClose={() => setShowAddMoneyModal(false)}
        onBonusClaimed={handleBonusClaimed}
      />

      <WhatsAppInviteModal
        isOpen={showWhatsAppInvite}
        onClose={() => setShowWhatsAppInvite(false)}
        user={user}
      />

      <WelcomeModal
        isOpen={showWelcomeModal}
        onClose={() => {
          setShowWelcomeModal(false);
          // Show WhatsApp invite after welcome modal is closed + 5 seconds
          setTimeout(() => {
            setShowWhatsAppInvite(true);
          }, 5000);
        }}
        userName={firstName}
      />

      {/* Live Chat Button */}
      <button
        onClick={() => setShowLiveChat(true)}
        className="fixed bottom-6 right-6 w-14 h-14 bg-green-500 hover:bg-green-600 rounded-full shadow-lg flex items-center justify-center z-50 transition-all duration-200 transform hover:scale-110 animate-slow-bounce"
        aria-label="Open Live Chat"
      >
        <MessageCircle className="w-6 h-6 text-white" />
      </button>

      {lastWithdrawal && (
        <WhatsAppWithdrawalModal
          isOpen={showWhatsAppWithdrawal}
          onClose={() => setShowWhatsAppWithdrawal(false)}
          user={user}
          withdrawalDetails={lastWithdrawal}
        />
      )}
    </div>
  );
};

export default Dashboard;
