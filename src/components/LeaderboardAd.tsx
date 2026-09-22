import React from 'react';
import GoogleAdSense from './GoogleAdSense';
import { UserProfile } from '../types';

interface LeaderboardAdProps {
  user: UserProfile;
  slot?: string;
  className?: string;
  triggerToast?: (msg: string) => void;
}

export default function LeaderboardAd({
  user,
  slot = '9329422615',
  className = '',
  triggerToast
}: LeaderboardAdProps) {
  if (user.premiumUser) return null;

  return (
    <div className={`leaderboard-ad-container w-full max-w-5xl mx-auto my-3 px-2 sm:px-4 ${className}`}>
      <GoogleAdSense
        premium={user.premiumUser}
        adFormat="leaderboard"
        adSlot={slot}
        triggerToast={triggerToast}
      />
    </div>
  );
}
