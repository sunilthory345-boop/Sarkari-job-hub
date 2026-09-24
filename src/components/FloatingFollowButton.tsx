import React from 'react';
import { UserPlus, Check, Bell, Users } from 'lucide-react';

interface FloatingFollowButtonProps {
  isFollowed: boolean;
  onOpenModal: () => void;
  followerCount: number;
  locale?: string;
}

export default function FloatingFollowButton({
  isFollowed,
  onOpenModal,
  followerCount,
  locale = 'hi'
}: FloatingFollowButtonProps) {
  const isHindi = locale === 'hi';

  const formatCount = (num: number) => {
    if (num >= 100000) {
      return `${(num / 1000).toFixed(0)}K`;
    }
    if (num >= 1000) {
      return `${(num / 1000).toFixed(1)}K`;
    }
    return num.toString();
  };

  return (
    <div className="fixed bottom-6 left-6 z-40 hidden sm:block animate-fade-in font-sans">
      <button
        type="button"
        onClick={onOpenModal}
        className={`group flex items-center gap-2 px-3.5 py-2.5 rounded-full font-bold text-xs shadow-xl transition-all duration-200 cursor-pointer border ${
          isFollowed
            ? 'bg-slate-900 hover:bg-slate-800 text-white border-slate-700 shadow-slate-900/30'
            : 'bg-gradient-to-r from-amber-400 via-amber-500 to-yellow-500 hover:brightness-105 text-slate-950 border-amber-300 shadow-amber-500/30 ring-2 ring-amber-300/40 hover:scale-105 active:scale-95'
        }`}
        title="Follow Job Sarkari Hub on official community channels"
      >
        {isFollowed ? (
          <>
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-500 text-white text-[10px]">
              <Check className="h-3.5 w-3.5 stroke-[3]" />
            </span>
            <span className="font-extrabold text-slate-100">
              {isHindi ? 'Following' : 'Following'}
            </span>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 border border-slate-700">
              {formatCount(followerCount)}
            </span>
          </>
        ) : (
          <>
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-slate-950 text-amber-300 text-[10px] animate-pulse">
              <UserPlus className="h-3 w-3 stroke-[2.5]" />
            </span>
            <span className="font-black text-slate-950 uppercase tracking-tight">
              {isHindi ? '+ Follow करें' : '+ Follow'}
            </span>
            <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-slate-950/20 text-slate-950">
              {formatCount(followerCount)}
            </span>
          </>
        )}
      </button>
    </div>
  );
}
