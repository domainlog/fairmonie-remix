import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious, type CarouselApi } from '@/components/ui/carousel';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Eye, EyeOff, AlertCircle, MessageCircle } from 'lucide-react';
import ErrorNotification from '@/components/ErrorNotification';
import LiveChat from '@/components/LiveChat';
import { ForgotPasswordModal } from './ForgotPasswordModal';

interface AuthProps {
  onLogin: (user: { name: string; email: string }) => void;
}

const Auth: React.FC<AuthProps> = ({ onLogin }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [loginData, setLoginData] = useState({ email: '', password: '' });
  const [signupData, setSignupData] = useState({ name: '', email: '', password: '', confirmPassword: '' });
  const [isLoading, setIsLoading] = useState(false);
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [showAuth, setShowAuth] = useState(false);
  const [showErrorPopup, setShowErrorPopup] = useState(false);
  const [showErrorNotification, setShowErrorNotification] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [error, setError] = useState('');
  const [showLiveChat, setShowLiveChat] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);

  const bannerImages = [
    '/lovable-uploads/71c7fb43-72c3-40b3-bf50-df56bcc98e34.png', // New FairMoney logo as first image
    '/lovable-uploads/118ee324-9173-4a01-b482-2b552172fb0b.png',
    '/lovable-uploads/7d8d2599-e7d4-4a89-99ed-be70bd2900f7.png',
    '/lovable-uploads/c5f6a93a-b51e-4e1b-9bdd-99be4139b397.png',
    '/lovable-uploads/75577f5c-b7be-4047-a4ca-a8ba05df9bab.png',
    '/lovable-uploads/0e383b6b-27d1-448b-acf2-41ebeac44b9e.png',
    '/lovable-uploads/81708208-cfcb-4017-87ca-de2fb211b9a4.png',
    '/lovable-uploads/c25170f2-ebbf-42c0-a8de-4936e530ec52.png',
    '/lovable-uploads/40215c09-c6f9-4d2c-af14-e141b137c0b2.png',
    '/lovable-uploads/f1edd580-b9dd-4b28-b2d8-01c503af340c.png',
    '/lovable-uploads/05876cc6-a87a-48f3-b83e-4d4d8ca1585a.png',
    '/lovable-uploads/56604a59-7124-43a2-b11a-bfa4e41db3be.png'
  ];

  // Check for existing user session on mount
  useEffect(() => {
    const savedSession = localStorage.getItem('currentUser');
    if (savedSession) {
      const user = JSON.parse(savedSession);
      onLogin(user);
    } else {
      setShowAuth(true);
    }
  }, [onLogin]);

  useEffect(() => {
    if (!api) {
      return;
    }

    setCurrent(api.selectedScrollSnap());

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap());
    });

    // Auto-scroll functionality
    const interval = setInterval(() => {
      if (api) {
        const nextIndex = (api.selectedScrollSnap() + 1) % bannerImages.length;
        api.scrollTo(nextIndex);
      }
    }, 3000);

    return () => clearInterval(interval);
  }, [api, bannerImages.length]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Check if user exists in localStorage
    const savedUsers = JSON.parse(localStorage.getItem('registeredUsers') || '[]');
    const user = savedUsers.find((u: any) => u.email === loginData.email && u.password === loginData.password);
    
    setTimeout(() => {
      if (user) {
        // Save current session
        localStorage.setItem('currentUser', JSON.stringify({ name: user.name, email: loginData.email }));
        onLogin({ name: user.name, email: loginData.email });
      } else {
        setErrorMessage("Incorrect login details. Please sign up if you haven't registered yet.");
        setShowErrorNotification(true);
        setShowErrorPopup(false); // Hide old error popup
      }
      setIsLoading(false);
    }, 1500);
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateSignup()) {
      return;
    }
    
    setIsLoading(true);
    
    // Save user to localStorage
    const savedUsers = JSON.parse(localStorage.getItem('registeredUsers') || '[]');
    const newUser = {
      name: signupData.name,
      email: signupData.email,
      password: signupData.password
    };
    savedUsers.push(newUser);
    localStorage.setItem('registeredUsers', JSON.stringify(savedUsers));
    
    // Save current session
    localStorage.setItem('currentUser', JSON.stringify({ name: signupData.name, email: signupData.email }));
    
    setTimeout(() => {
      onLogin({ name: signupData.name, email: signupData.email });
      setIsLoading(false);
    }, 1500);
  };

  const validateSignup = () => {
    if (signupData.password !== signupData.confirmPassword) {
      setErrorMessage('Passwords did not match. Please try again.');
      setShowErrorNotification(true);
      setError('Password did not match');
      return false;
    }
    if (signupData.password.length < 6) {
      setErrorMessage('Password must be at least 6 characters long.');
      setShowErrorNotification(true);
      setError('Password must be at least 6 characters');
      return false;
    }
    return true;
  };

  if (!showAuth) {
    return null; // Show nothing while checking for existing session
  }

  return (
    <div className="min-h-screen gradient-green flex flex-col items-center justify-center p-4 relative overflow-hidden">
      {/* Error Notification */}
      <ErrorNotification 
        message={errorMessage}
        isVisible={showErrorNotification}
        onClose={() => setShowErrorNotification(false)}
      />

      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 w-32 h-32 bg-white rounded-full blur-xl"></div>
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-white rounded-full blur-xl"></div>
        <div className="absolute top-1/2 left-1/3 w-24 h-24 bg-white rounded-full blur-lg"></div>
      </div>

      {/* Banner Carousel - Reduced Height */}
      <div className="w-full max-w-md mb-6 relative z-10">
        <Carousel className="w-full" setApi={setApi}>
          <CarouselContent>
            {bannerImages.map((image, index) => (
              <CarouselItem key={index}>
                <div className="p-1">
                  <Card className="border-0 shadow-lg overflow-hidden">
                    <CardContent className="p-0">
                      <img 
                        src={image} 
                        alt={`FairMoney Banner ${index + 1}`}
                        className="w-full h-40 object-cover"
                      />
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>

      <Card className="w-full max-w-md relative z-10 shadow-2xl border-0 bg-white/95 backdrop-blur-sm animate-fadeIn">
        <CardHeader className="text-center pb-6">
          <CardTitle className="text-3xl font-bold gradient-green bg-clip-text text-transparent mb-2">
            FairMonie Pay
          </CardTitle>
        </CardHeader>

        <CardContent className="px-6 pb-8">
          <Tabs defaultValue="login" className="space-y-6">
            <TabsList className="grid w-full grid-cols-2 bg-gray-100">
              <TabsTrigger value="login" className="data-[state=active]:bg-green-600 data-[state=active]:text-white">
                LOGIN
              </TabsTrigger>
              <TabsTrigger value="signup" className="data-[state=active]:bg-green-600 data-[state=active]:text-white">
                CREATE ACCOUNT
              </TabsTrigger>
            </TabsList>

            <TabsContent value="login" className="space-y-6">
              <form onSubmit={handleLogin} className="space-y-6">
                <div>
                  <Input
                    type="email"
                    placeholder="Email address"
                    value={loginData.email}
                    onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
                    required
                    className="h-14 border-gray-200 focus:border-green-500 focus:ring-green-500"
                  />
                </div>
                <div className="relative">
                  <Input
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Password"
                    value={loginData.password}
                    onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                    required
                    className="h-14 border-gray-200 focus:border-green-500 focus:ring-green-500 pr-12"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
                <div className="space-y-3">
                  <Button
                    type="submit"
                    className="w-full h-14 bg-green-600 hover:bg-green-700 text-white font-medium rounded-full transition-all duration-200 transform hover:scale-105"
                    disabled={isLoading}
                  >
                    {isLoading ? 'Signing in...' : 'LOGIN'}
                  </Button>
                  
                  <button
                    type="button"
                    onClick={() => setShowForgotPassword(true)}
                    className="w-full text-sm text-green-600 hover:text-green-700 transition-colors"
                  >
                    Forgot password?
                  </button>
                </div>
              </form>
            </TabsContent>

            <TabsContent value="signup" className="space-y-6">
              <form onSubmit={handleSignup} className="space-y-6">
                <div>
                  <Input
                    type="text"
                    placeholder="Full name"
                    value={signupData.name}
                    onChange={(e) => setSignupData({ ...signupData, name: e.target.value })}
                    required
                    className="h-14 border-gray-200 focus:border-green-500 focus:ring-green-500"
                  />
                </div>
                <div>
                  <Input
                    type="email"
                    placeholder="Email address"
                    value={signupData.email}
                    onChange={(e) => setSignupData({ ...signupData, email: e.target.value })}
                    required
                    className="h-14 border-gray-200 focus:border-green-500 focus:ring-green-500"
                  />
                </div>
                <div className="relative">
                  <Input
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Password"
                    value={signupData.password}
                    onChange={(e) => setSignupData({ ...signupData, password: e.target.value })}
                    required
                    className="h-14 border-gray-200 focus:border-green-500 focus:ring-green-500 pr-12"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
                <div>
                  <Input
                    type="password"
                    placeholder="Confirm password"
                    value={signupData.confirmPassword}
                    onChange={(e) => setSignupData({ ...signupData, confirmPassword: e.target.value })}
                    required
                    className="h-14 border-gray-200 focus:border-green-500 focus:ring-green-500"
                  />
                </div>
                <Button
                  type="submit"
                  className="w-full h-14 bg-green-600 hover:bg-green-700 text-white font-medium rounded-full transition-all duration-200 transform hover:scale-105"
                  disabled={isLoading}
                >
                  {isLoading ? 'Creating account...' : 'CREATE ACCOUNT'}
                </Button>
              </form>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Live Chat Button */}
      <button
        onClick={() => setShowLiveChat(true)}
        className="fixed bottom-6 right-6 w-14 h-14 bg-green-500 hover:bg-green-600 rounded-full shadow-lg flex items-center justify-center z-50 transition-all duration-200 transform hover:scale-110 animate-slow-bounce"
        aria-label="Open Live Chat"
      >
        <MessageCircle className="w-6 h-6 text-white" />
      </button>

      {/* Live Chat Modal */}
      {showLiveChat && (
        <div className="fixed inset-0 z-50">
          <LiveChat 
            onBack={() => setShowLiveChat(false)}
            user={{ name: 'Guest', email: 'guest@example.com' }}
          />
        </div>
      )}

      {/* Error Popup */}
      <Dialog open={showErrorPopup} onOpenChange={setShowErrorPopup}>
        <DialogContent className="max-w-sm mx-auto p-0 border-0 bg-transparent shadow-none">
          <div className="bg-white rounded-lg border border-gray-200 shadow-lg p-4">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-black rounded-full flex items-center justify-center flex-shrink-0">
                <AlertCircle className="w-5 h-5 text-white" />
              </div>
              <p className="text-gray-900 font-medium">Incorrect details. Sign up now</p>
            </div>
          </div>
        </DialogContent>
      </Dialog>
      
      {/* Forgot Password Modal */}
      <ForgotPasswordModal
        isOpen={showForgotPassword}
        onClose={() => setShowForgotPassword(false)}
      />
    </div>
  );
};

export default Auth;
