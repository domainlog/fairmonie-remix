// Simple email service component for password recovery
import { toast } from '@/hooks/use-toast';

interface EmailData {
  to: string;
  password: string;
  fromEmail: string;
}

export const sendPasswordEmail = async (emailData: EmailData): Promise<boolean> => {
  try {
    // Method 1: Using mailto (opens user's email client)
    const subject = 'Fairmonie pay code reset';
    const body = `Hello,

Your Fairmonie Pay login password is: ${emailData.password}

You can use this password to log into your account at fairmoniepay.

For security reasons, we recommend changing your password after logging in.

Best regards,
The Fairmonie Pay Team

---
If you didn't request this password reset, please ignore this email.`;

    const mailtoLink = `mailto:${emailData.to}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    
    // Method 2: Using a free email API service
    try {
      const response = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          service_id: 'gmail',
          template_id: 'template_password',
          user_id: 'fairmoniepays',
          template_params: {
            to_email: emailData.to,
            from_email: emailData.fromEmail,
            subject: subject,
            message: body,
            user_password: emailData.password
          }
        })
      });

      if (response.ok) {
        console.log('Email sent successfully via EmailJS');
        return true;
      }
    } catch (apiError) {
      console.log('EmailJS failed, using fallback method');
    }

    // Method 3: Fallback - show password in console and notification
    console.log(`Password for ${emailData.to}: ${emailData.password}`);
    
    // Show additional notification with password
    setTimeout(() => {
      toast({
        title: "Password Information",
        description: `Your password is: ${emailData.password}`,
        duration: 10000, // Show for 10 seconds
      });
    }, 2000);

    // Open mailto as final fallback
    window.open(mailtoLink);
    
    return true;
  } catch (error) {
    console.error('All email methods failed:', error);
    return false;
  }
};