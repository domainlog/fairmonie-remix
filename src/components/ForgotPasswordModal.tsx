import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Mail, Loader2, CheckCircle, AlertCircle } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface ForgotPasswordModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ForgotPasswordModal = ({ isOpen, onClose }: ForgotPasswordModalProps) => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [emailSent, setEmailSent] = useState(false);

  const handleRetrievePassword = async () => {
    if (!email.trim()) {
      toast({
        title: "Email Required",
        description: "Please enter your email address.",
        variant: "destructive",
      });
      return;
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast({
        title: "Invalid Email",
        description: "Please enter a valid email address.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    try {
      // Check if email exists in localStorage
      const users = JSON.parse(localStorage.getItem('registeredUsers') || '[]');
      const userExists = users.find((user: any) => user.email === email.toLowerCase());

      if (userExists) {
        // Create email content for manual sending
        const subject = encodeURIComponent('Fairmonie Pay - Password Reset');
        const body = encodeURIComponent(`Hello,

Your Fairmonie Pay login password is: ${userExists.password}

You can now use this password to log into your account.

Best regards,
Fairmonie Pay Team`);

        // Create mailto link
        const mailtoLink = `mailto:${email}?subject=${subject}&body=${body}`;
        
        // Try to open default email client
        try {
          const link = document.createElement('a');
          link.href = mailtoLink;
          link.click();
          
          setEmailSent(true);
          toast({
            title: "Email Client Opened",
            description: "Your email app should open with your password. Send the email to yourself.",
          });
        } catch (error) {
          // Fallback: Show password directly in a long-lasting toast
          setEmailSent(true);
          toast({
            title: "Your Password",
            description: `Password: ${userExists.password} (Save this information)`,
            duration: 15000, // 15 seconds
          });
        }
      } else {
        toast({
          title: "Email Not Found",
          description: "No account found with this email address.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error('Error retrieving password:', error);
      toast({
        title: "Error",
        description: "An error occurred. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    setEmail('');
    setEmailSent(false);
    setIsLoading(false);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Mail className="h-5 w-5 text-primary" />
            Forgot Password
          </DialogTitle>
        </DialogHeader>

        {!emailSent ? (
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Enter your email address and we'll send you your password.
            </p>
            
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isLoading}
              />
            </div>

            <div className="flex gap-2">
              <Button
                onClick={handleRetrievePassword}
                disabled={isLoading}
                className="flex-1"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    <Mail className="mr-2 h-4 w-4" />
                    Send Password
                  </>
                )}
              </Button>
              <Button variant="outline" onClick={handleClose} disabled={isLoading}>
                Cancel
              </Button>
            </div>
          </div>
        ) : (
          <div className="text-center space-y-4">
            <div className="flex justify-center">
              <CheckCircle className="h-16 w-16 text-green-500" />
            </div>
            <div>
              <h3 className="text-lg font-semibold">Password Retrieved!</h3>
              <p className="text-sm text-muted-foreground mt-2">
                Your password for <strong>{email}</strong> is being sent to your email. 
                Check your inbox in a few moments.
              </p>
            </div>
            <Button onClick={handleClose} className="w-full">
              Close
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};