export const site = {
  name: "Bushey Amateur Swimming Club",
  shortName: "Bushey ASC",
  tagline: "Est. 1926, one hundred years of swimming",
  email: "info@busheyasc.org",
  welfareEmail: "welfare@busheyasc.org",
  address: "Bushey Grove Leisure Centre, Bushey, WD23 2TD",
  swimManagerUrl: "https://www.swimmanager.co.uk/",
  social: {
    tiktok: "https://www.tiktok.com/@busheysc",
    instagram: "https://www.instagram.com/busheyamateursc",
  },
};

export interface NavLink {
  label: string;
  href: string;
  description?: string;
}

export interface NavGroup {
  label: string;
  href: string;
  links: NavLink[];
}

export const nav: NavGroup[] = [
  {
    label: "Club",
    href: "/club",
    links: [
      { label: "About the club", href: "/club", description: "Who we are and what we stand for" },
      { label: "Centenary 1926–2026", href: "/club/centenary", description: "One hundred years in the water" },
      { label: "Committee", href: "/club/committee", description: "The volunteers who run BASC" },
      { label: "Volunteering", href: "/club/volunteering", description: "Every family plays a part" },
      { label: "Club kit", href: "/club/kit", description: "Hats, tees and team wear" },
      { label: "Policies & documents", href: "/club/policies", description: "Constitution, codes of conduct and more" },
    ],
  },
  {
    label: "Train",
    href: "/train/squads",
    links: [
      { label: "Squads", href: "/train/squads", description: "The pathway from Dolphins to Performance" },
      { label: "Coaches & teachers", href: "/train/coaches", description: "The team on poolside" },
      { label: "Training timetable", href: "/train/timetable", description: "Every session, every pool" },
      { label: "Pool locations", href: "/train/locations", description: "The five pools we train at" },
    ],
  },
  {
    label: "Compete",
    href: "/compete/fixtures",
    links: [
      { label: "Upcoming galas", href: "/compete/fixtures", description: "The galas and meets we race at each season" },
      { label: "Results", href: "/compete/results", description: "How we got on" },
      { label: "Competing guide", href: "/compete/guide", description: "Your first gala, explained" },
      { label: "Counties and Regionals", href: "/compete/counties", description: "Qualifying times and official links" },
    ],
  },
  {
    label: "Athlete Hub",
    href: "/athlete-hub",
    links: [
      { label: "Overview", href: "/athlete-hub", description: "Nutrition, sleep, strength and staying injury-free" },
      { label: "Nutrition", href: "/athlete-hub/nutrition", description: "What to eat around training and galas" },
      { label: "Sleep & recovery", href: "/athlete-hub/sleep-recovery", description: "Sleep, recovery and rest days" },
      { label: "Land training", href: "/athlete-hub/land-training", description: "Strength work that transfers to water" },
      { label: "Injury prevention", href: "/athlete-hub/injury-prevention", description: "Keep shoulders and knees happy" },
      { label: "Equipment guide", href: "/athlete-hub/equipment", description: "What kit you need and why" },
    ],
  },
];

export const flatNav: NavLink[] = [
  { label: "News", href: "/news" },
  { label: "Welfare", href: "/welfare" },
];
