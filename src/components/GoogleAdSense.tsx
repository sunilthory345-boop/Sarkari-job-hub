import React, { useEffect } from 'react';

interface GoogleAdSenseProps {
  premium?: boolean;
}

export default function GoogleAdSense({ premium = false }: GoogleAdSenseProps) {
  useEffect(() => {
    if (premium) return;

    // Trigger the push for this ad unit slot safely
    try {
      const adsbygoogle = (window as any).adsbygoogle || [];
      adsbygoogle.push({});
    } catch (e) {
      console.warn('Google AdSense push warning (Expected in sandbox/local preview):', e);
    }
  }, [premium]);

  if (premium) return null;

  return (
    <div className="google-adsense-wrapper w-full overflow-hidden my-4 p-4 bg-slate-50/40 rounded-2xl border border-slate-200/60 flex flex-col items-center text-center">
      <span className="text-[9px] text-slate-450 font-mono uppercase tracking-wider mb-2 block">
        ADVERTISEMENT
      </span>
      <div className="w-full flex justify-center">
        {/* Real AdSense Unit Container */}
        <ins
          className="adsbygoogle"
          style={{ display: 'block', minHeight: '100px' }}
          data-ad-format="fluid"
          data-ad-layout-key="-fb+5w+4e-db+86"
          data-ad-client="ca-pub-3632365628717784"
          data-ad-slot="9329422615"
        />
      </div>
    </div>
  );
}
