
import React from 'react';
import { ArrowLeft } from 'lucide-react';

interface YouTubeWatchPageProps {
  onBack: () => void;
}

const YouTubeWatchPage: React.FC<YouTubeWatchPageProps> = ({ onBack }) => {
  // Extract video ID from the YouTube Shorts URL
  const videoId = 'x8rmRxY-qbc';
  const embedUrl = `https://www.youtube.com/embed/${videoId}`;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white px-4 py-4 shadow-sm">
        <div className="flex items-center space-x-3">
          <button
            onClick={onBack}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <ArrowLeft className="w-6 h-6 text-gray-600" />
          </button>
          <h1 className="text-xl font-semibold text-gray-900">Watch Tutorial</h1>
        </div>
      </div>

      <div className="px-4 py-6">
        {/* Video Player */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-6">
          <div className="aspect-video">
            <iframe
              src={embedUrl}
              title="Fairmonie Pay Tutorial"
              className="w-full h-full"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
          </div>
        </div>

        {/* Video Info */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-2">
            Fairmonie Pay Tutorial
          </h2>
          <p className="text-gray-600 text-sm mb-4">
            Learn how to use Fairmonie Pay effectively with this comprehensive tutorial video.
          </p>
          <div className="flex items-center space-x-4 text-sm text-gray-500">
            <span>Tutorial Video</span>
            <span>•</span>
            <span>Fairmonie Pay</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default YouTubeWatchPage;
