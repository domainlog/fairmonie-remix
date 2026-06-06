
import { useCallback, useRef } from 'react';

export const useTextToSpeech = () => {
  const hasUserInteracted = useRef(false);
  const isInitialized = useRef(false);
  const isSpeaking = useRef(false);

  const speak = useCallback((text: string) => {
    if (!('speechSynthesis' in window)) {
      console.log('Speech synthesis not supported');
      return;
    }

    // Prevent multiple simultaneous speech attempts
    if (isSpeaking.current) {
      console.log('Speech already in progress, skipping...');
      return;
    }

    // Cancel any ongoing speech
    window.speechSynthesis.cancel();
    isSpeaking.current = true;
    
    const utterance = new SpeechSynthesisUtterance(text);
    
    // Set basic properties
    utterance.lang = 'en-US';
    utterance.rate = 0.8;
    utterance.pitch = 1.0;
    utterance.volume = 1.0;
    
    // Reset speaking flag when done
    utterance.onend = () => {
      isSpeaking.current = false;
    };
    
    utterance.onerror = () => {
      isSpeaking.current = false;
    };
    
    // Function to actually speak
    const performSpeak = () => {
      try {
        // Initialize speechSynthesis for deployment
        if (!isInitialized.current) {
          // Create a silent utterance to initialize the API
          const initUtterance = new SpeechSynthesisUtterance('');
          initUtterance.volume = 0;
          window.speechSynthesis.speak(initUtterance);
          window.speechSynthesis.cancel();
          isInitialized.current = true;
        }

        // Enhanced Android deployment fix
        const speakWithAndroidFix = () => {
          // Force resume if paused (common Android issue)
          if (window.speechSynthesis.paused) {
            window.speechSynthesis.resume();
          }
          
          // Start speaking
          window.speechSynthesis.speak(utterance);
          
          // Android deployment: Force resume if paused after short delay
          setTimeout(() => {
            if (window.speechSynthesis.paused) {
              console.log('Android deployment: Resuming paused speech');
              window.speechSynthesis.resume();
            }
          }, 100);
        };

        speakWithAndroidFix();
        
      } catch (error) {
        console.log('Speech error:', error);
        isSpeaking.current = false;
      }
    };

    // Try to set voice if available
    const voices = window.speechSynthesis.getVoices();
    if (voices.length > 0) {
      // Find English voice
      const englishVoice = voices.find(voice => 
        voice.lang.startsWith('en') && 
        (voice.name.includes('Google') || voice.name.includes('Microsoft') || voice.default)
      ) || voices.find(voice => voice.lang.startsWith('en'));
      
      if (englishVoice) {
        utterance.voice = englishVoice;
      }
      
      performSpeak();
    } else {
      // Wait for voices with timeout
      let voiceTimeout;
      
      const handleVoicesLoaded = () => {
        clearTimeout(voiceTimeout);
        const newVoices = window.speechSynthesis.getVoices();
        
        if (newVoices.length > 0) {
          const englishVoice = newVoices.find(voice => 
            voice.lang.startsWith('en')
          );
          
          if (englishVoice) {
            utterance.voice = englishVoice;
          }
        }
        
        performSpeak();
      };
      
      // Listen for voices loaded event
      window.speechSynthesis.addEventListener('voiceschanged', handleVoicesLoaded, { once: true });
      
      // Fallback timeout - speak anyway after 1 second
      voiceTimeout = setTimeout(() => {
        console.log('Voice timeout - speaking without voice selection');
        performSpeak();
      }, 1000);
    }
  }, []);

  const stopSpeaking = useCallback(() => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      isSpeaking.current = false;
    }
  }, []);

  // Enable speech on first user interaction
  const enableSpeech = useCallback(() => {
    if ('speechSynthesis' in window) {
      hasUserInteracted.current = true;
      
      // Simple Android deployment initialization
      if (!isInitialized.current) {
        try {
          // Single initialization attempt
          const initVoices = () => {
            const silent = new SpeechSynthesisUtterance('');
            silent.volume = 0;
            window.speechSynthesis.speak(silent);
            setTimeout(() => window.speechSynthesis.cancel(), 10);
          };
          
          initVoices();
          
          // Handle voices loading if needed
          const voices = window.speechSynthesis.getVoices();
          if (voices.length === 0) {
            window.speechSynthesis.addEventListener('voiceschanged', () => {
              console.log('Voices loaded for Android deployment');
            }, { once: true });
          }
          
          isInitialized.current = true;
        } catch (error) {
          console.log('Speech initialization error:', error);
        }
      }
    }
  }, []);

  return { speak, stopSpeaking, enableSpeech };
};
