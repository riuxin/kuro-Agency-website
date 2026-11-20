/* ==========================================================================
   KURO PITCH DECK — EDITABLE CONTENT
   --------------------------------------------------------------------------
   Edit this file to fill the deck. Anything left as '' shows as a clearly
   marked placeholder on the slide.

   • Media paths are relative to this /deck/ folder, e.g. 'reels/reel-01.mp4'
     (put your files in deck/reels/ and deck/assets/).
   • Videos: MP4 (H.264) works everywhere. Keep each reel under ~15 MB.
   • Quick preview without editing: drag a video or image file straight onto
     any placeholder in the browser (preview only, not saved).
   ========================================================================== */

window.KURO_DECK = {

  /* ---------- Closing slide ---------- */
  contact: {
    website: 'kuro-agency-website.vercel.app',
    websiteUrl: 'https://kuro-agency-website.vercel.app/',   // the QR code points here
    email: 'team.kuroagency@hotmail.com',
    phone: '+91 870 026 8026',                                // shown as WhatsApp / call
    instagram: ''                                             // e.g. '@kuro.agency'
  },

  /* ---------- Slide: Clients (12 slots) ----------
     logo: transparent PNG/SVG works best (white or single-colour).
     region: 'India' or 'International'. */
  clients: [
    { name: 'Kourage Fitness', logo: 'assets/client-kourage-logo.png', region: 'India' },
    { name: '', logo: '', region: 'India' },
    { name: '', logo: '', region: 'India' },
    { name: '', logo: '', region: 'India' },
    { name: '', logo: '', region: 'India' },
    { name: '', logo: '', region: 'India' },
    { name: '', logo: '', region: 'International' },
    { name: '', logo: '', region: 'International' },
    { name: '', logo: '', region: 'International' },
    { name: '', logo: '', region: 'International' },
    { name: '', logo: '', region: 'International' },
    { name: '', logo: '', region: 'International' }
  ],

  /* ---------- Slides: Reel showcase (one slide each) ----------
     Only real KURO client work. format is the type of video. */
  reels: [
    { format: 'Talking-head video',     project: '', client: '', industry: '', challenge: '', approach: '', purpose: '', action: '', video: '', poster: '' },
    { format: 'Personal brand content', project: '', client: '', industry: '', challenge: '', approach: '', purpose: '', action: '', video: '', poster: '' },
    { format: 'Real estate promotion',  project: '', client: '', industry: '', challenge: '', approach: '', purpose: '', action: '', video: '', poster: '' },
    { format: 'Business & brand reel',  project: '', client: '', industry: '', challenge: '', approach: '', purpose: '', action: '', video: '', poster: '' },
    { format: 'Marketing short-form',   project: '', client: '', industry: '', challenge: '', approach: '', purpose: '', action: '', video: '', poster: '' },
    { format: 'Story-driven social',    project: '', client: '', industry: '', challenge: '', approach: '', purpose: '', action: '', video: '', poster: '' }
  ],

  /* ---------- Slides: Website case studies ---------- */
  websites: [
    {
      name: 'Kourage Fitness',
      status: 'Live',
      url: 'https://www.kouragefitness.in/',
      domain: 'kouragefitness.in',
      client: 'Kourage Fitness',
      location: 'Mulund West, Mumbai',
      built: 'Next.js',
      desktop: 'assets/kourage-desktop-scroll.webp',    // tall screenshot, scrolls inside the browser frame
      mobile: 'assets/kourage-mobile.webp',
      description: 'A custom website for a premium strength gym in Mumbai, live on its own domain. It brings the gym’s training zones, coaches and online physique competition into one fast, mobile-first site, with WhatsApp, call and Instagram one tap away.',
      features: [
        'Showcase of nine training zones and equipment',
        'Founder and coach profiles with awards',
        'Online physique competition with official rules',
        'One-tap WhatsApp, call and Instagram',
        'Facility locations with Google Maps',
        'Responsive, mobile-first layout'
      ]
    },
    {
      name: 'Drift Gaming Cafe',
      status: '',                 // e.g. 'Live'
      url: '',                    // e.g. 'https://driftgamingcafe.com'
      domain: '',
      client: '',
      location: '',
      built: '',
      desktop: '',                // tall desktop screenshot
      mobile: '',                 // mobile screenshot
      description: '',
      features: ['', '', '', '']
    }
  ],

  /* ---------- Slide: Intelligent systems (demos you will add) ---------- */
  automationDemos: [
    { title: '', media: '', note: 'Automation demo · video or screenshot' },
    { title: '', media: '', note: 'Automation demo · video or screenshot' }
  ],
  automationCase: { title: '', summary: '' }
};
