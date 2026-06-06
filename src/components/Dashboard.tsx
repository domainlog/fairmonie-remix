import React, { useState, useEffect } from 'react';
import { Skeleton } from '@/components/ui/skeleton';
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
  const [isLoading, setIsLoading] = useState(true);

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

    // Simulate content loading so skeleton placeholders appear briefly
    const loadTimer = setTimeout(() => {
      setIsLoading(false);
    }, 900);

    return () => {
      clearTimeout(welcomeTimer);
      clearTimeout(loadTimer);
    };
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
    <div className="min-h-screen bg-slate-50">
      {/* Withdrawal Notifications - always visible and continuous */}
      <WithdrawalNotifications isVisible={true} />

      {/* Header — Official banking style */}
      <div className="bg-gradient-to-r from-emerald-800 via-emerald-700 to-emerald-800 px-4 pt-5 pb-20 shadow-md relative">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Avatar className="w-11 h-11 ring-2 ring-white/40">
              <AvatarFallback className="bg-white text-emerald-700 font-bold">
                {firstName.charAt(0)}
              </AvatarFallback>
            </Avatar>
            <div className="flex flex-col leading-tight">
              <span className="text-[11px] uppercase tracking-widest text-emerald-100/80">Welcome back</span>
              <span className="text-base font-semibold text-white">{firstName}</span>
            </div>
          </div>
          <div className="flex items-center space-x-1">
            <button
              onClick={() => setShowLiveChat(true)}
              className="p-2 hover:bg-white/10 rounded-full transition-colors"
              aria-label="Support"
            >
              <Headphones className="w-5 h-5 text-white" />
            </button>
            <button className="p-2 hover:bg-white/10 rounded-full transition-colors" aria-label="Scan">
              <Maximize className="w-5 h-5 text-white" />
            </button>
            <button
              onClick={handleTransactionHistoryClick}
              className="p-2 hover:bg-white/10 rounded-full transition-colors relative"
              aria-label="Notifications"
            >
              <Bell className="w-5 h-5 text-white" />
              {transactions.length > 0 && (
                <span className="absolute top-0 right-0 bg-red-500 text-white text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
                  {transactions.length > 9 ? '9+' : transactions.length}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Trust badge inline */}
        <div className="mt-4 inline-flex items-center gap-1.5 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-3 py-1">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-200" />
          <span className="text-[10px] font-medium text-white tracking-wide">CBN LICENSED · NDIC INSURED</span>
        </div>
      </div>

      <div className="px-4 pb-6 space-y-5 -mt-14">
        {/* Balance Card — Premium bank-card aesthetic */}
        <Card className="relative overflow-hidden border-0 shadow-2xl rounded-2xl animate-slideUp bg-gradient-to-br from-emerald-700 via-emerald-600 to-emerald-800 text-white">
          {/* Decorative pattern */}
          <div className="absolute inset-0 opacity-10 pointer-events-none">
            <div className="absolute -right-12 -top-12 w-48 h-48 rounded-full border-[20px] border-white"></div>
            <div className="absolute -right-4 bottom-0 w-32 h-32 rounded-full border-[12px] border-white"></div>
          </div>
          <CardContent className="p-5 relative">
            {isLoading ? (
              <div className="space-y-5">
                <div className="flex items-center justify-between">
                  <Skeleton className="h-4 w-28 bg-white/20 rounded" />
                  <Skeleton className="h-3 w-8 bg-white/20 rounded" />
                </div>
                <div className="space-y-2">
                  <Skeleton className="h-10 w-48 bg-white/20 rounded" />
                  <Skeleton className="h-3 w-32 bg-white/20 rounded" />
                </div>
                <div className="grid grid-cols-3 gap-2">
                  <Skeleton className="h-14 w-full bg-white/20 rounded-xl" />
                  <Skeleton className="h-14 w-full bg-white/30 rounded-xl" />
                  <Skeleton className="h-14 w-full bg-white/20 rounded-xl" />
                </div>
              </div>
            ) : (
              <>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-medium text-emerald-50/90 uppercase tracking-wider">Available Balance</span>
                    <button
                      onClick={() => setShowBalance(!showBalance)}
                      className="p-1 hover:bg-white/15 rounded-full transition-colors"
                      aria-label="Toggle balance"
                    >
                      <Eye className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  <span className="text-[10px] font-semibold tracking-widest text-emerald-100/80">NGN</span>
                </div>

                <div className="mt-3 mb-5">
                  <div className="text-4xl font-bold tracking-tight">
                    {showBalance ? `₦${balance.toLocaleString('en-NG', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}` : '₦ • • • • • •'}
                  </div>
                  <div className="mt-1 text-[11px] text-emerald-100/80">
                    Account · {user.email.slice(0, 2).toUpperCase()}••••{user.email.slice(-4)}
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-2">
                  <button
                    onClick={handleAddMoneyClick}
                    className="flex flex-col items-center justify-center gap-1 bg-white/15 hover:bg-white/25 backdrop-blur-sm rounded-xl py-2.5 transition-colors border border-white/10"
                  >
                    <Gift className="w-4 h-4" />
                    <span className="text-[11px] font-semibold">Claim Bonus</span>
                  </button>
                  <button
                    onClick={() => setShowWithdrawal(true)}
                    className="flex flex-col items-center justify-center gap-1 bg-white text-emerald-700 hover:bg-emerald-50 rounded-xl py-2.5 transition-colors shadow-md"
                  >
                    <ArrowUpRight className="w-4 h-4" />
                    <span className="text-[11px] font-semibold">Withdraw</span>
                  </button>
                  <button
                    onClick={handleTransactionHistoryClick}
                    className="flex flex-col items-center justify-center gap-1 bg-white/15 hover:bg-white/25 backdrop-blur-sm rounded-xl py-2.5 transition-colors border border-white/10"
                  >
                    <History className="w-4 h-4" />
                    <span className="text-[11px] font-semibold">History</span>
                  </button>
                </div>
              </>
            )}
          </CardContent>
        </Card>

        {/* Quick Actions — refined */}
        <Card className="border border-slate-200/70 shadow-sm rounded-2xl bg-white">
          <CardContent className="p-4">
            {isLoading ? (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Skeleton className="h-4 w-24 rounded" />
                  <Skeleton className="h-4 w-14 rounded-full" />
                </div>
                <div className="grid grid-cols-3 gap-3">
                  {[0, 1, 2].map((i) => (
                    <div key={i} className="flex flex-col items-center text-center py-2 gap-2">
                      <Skeleton className="h-11 w-11 rounded-xl" />
                      <Skeleton className="h-3 w-14 rounded" />
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <>
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-sm font-semibold text-slate-800">Quick Actions</h3>
                  <span className="text-[10px] font-medium text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">Secured</span>
                </div>
                <div className="grid grid-cols-3 gap-3">
                  {quickActions.map((action, index) => (
                    <button
                      key={index}
                      onClick={() => handleQuickActionClick(action)}
                      className="flex flex-col items-center text-center py-2 hover:bg-slate-50 rounded-xl transition-colors"
                    >
                      <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-emerald-50 to-emerald-100 text-emerald-700 flex items-center justify-center mb-2 shadow-sm">
                        <action.icon className="w-5 h-5" />
                      </div>
                      <p className="text-xs font-medium text-slate-700">{action.title}</p>
                    </button>
                  ))}
                </div>
              </>
            )}
          </CardContent>
        </Card>

        {/* Services Grid — refined */}
        <Card className="border border-slate-200/70 shadow-sm rounded-2xl bg-white">
          <CardContent className="p-4">
            {isLoading ? (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Skeleton className="h-4 w-20 rounded" />
                  <Skeleton className="h-3 w-20 rounded" />
                </div>
                <div className="grid grid-cols-4 gap-3">
                  {Array.from({ length: 8 }).map((_, i) => (
                    <div key={i} className="flex flex-col items-center text-center py-2 gap-1.5">
                      <Skeleton className="h-10 w-10 rounded-xl" />
                      <Skeleton className="h-3 w-12 rounded" />
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <>
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-sm font-semibold text-slate-800">Services</h3>
                  <span className="text-[11px] text-slate-500">Bills & More</span>
                </div>
                <div className="grid grid-cols-4 gap-3">
                  {services.map((service, index) => (
                    <button
                      key={index}
                      onClick={() => handleServiceClick(service)}
                      className="flex flex-col items-center text-center py-2 hover:bg-slate-50 rounded-xl transition-colors"
                    >
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-50 to-emerald-100 text-emerald-700 flex items-center justify-center mb-1.5 shadow-sm">
                        <service.icon className="w-4 h-4" />
                      </div>
                      <p className="text-[10.5px] font-medium text-slate-700 leading-tight">{service.title}</p>
                    </button>
                  ))}
                </div>
              </>
            )}
          </CardContent>
        </Card>

        {/* Promotional Banner Carousel */}
        <div className="w-full">
          {isLoading ? (
            <Card className="border border-slate-200/70 shadow-sm rounded-2xl overflow-hidden">
              <CardContent className="p-0">
                <Skeleton className="w-full h-32 rounded-none" />
              </CardContent>
            </Card>
          ) : (
            <Carousel className="w-full" setApi={setApi}>
              <CarouselContent>
                {promoImages.map((image, index) => (
                  <CarouselItem key={index}>
                    <div className="p-0.5">
                      <Card className="border border-slate-200/70 shadow-sm rounded-2xl overflow-hidden">
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
          )}
        </div>

        {/* Official trust footer */}
        <div className="flex flex-col items-center gap-2 pt-2 pb-4">
          <div className="flex items-center gap-2 text-slate-500">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span className="text-[11px] font-medium">Bank-grade 256-bit encryption</span>
          </div>
          <p className="text-[10px] text-slate-400 text-center max-w-xs">
            Fairmonie Pay is licensed by the Central Bank of Nigeria (CBN) and deposits are insured by NDIC up to ₦5,000,000.
          </p>
          {showScrollCBN && (
            <p className="text-emerald-700 font-semibold text-xs animate-fadeIn">✓ Verified by CBN</p>
          )}
        </div>
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
