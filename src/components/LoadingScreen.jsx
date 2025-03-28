import React from 'react';
import { Loader2 } from 'lucide-react';

const LoadingScreen = () => {
  return (
    <div className="h-screen w-full bg-zinc-900 flex flex-col justify-center items-center text-white">
      <div className="animate-pulse">
        <Loader2 
          className="w-16 h-16 text-zinc-500 animate-spin" 
          strokeWidth={1.5}
        />
      </div>
      <div className="mt-6 text-xl font-semibold text-zinc-300">
        Loading users...
      </div>
      <div className="mt-2 text-zinc-500 text-sm">
        Please wait while data is being fetched
      </div>
    </div>
  );
};

export default LoadingScreen;