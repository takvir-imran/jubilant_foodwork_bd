export interface Announcement {
    id: string;
    icon: 'award' | 'outlet' | 'townhall' | 'huddle' | 'earning';
    title: string;
    subtitle: string;
    description: string;
    category: string;
    date: string;
    author?: string;
    image?: string;
    fullContent: string;
    highlights?: string[];
    tags: string;
    accent: string;
    accentHex: string;
}

export const announcements: Announcement[] = [
    {
        id: 'award-best-retailer',
        icon: 'award',
        title: 'Awards',
        subtitle: 'Dominos Pizza Bangladesh',
        description: 'The best retailer in bangladesh',
        category: 'Recognition',
        date: 'March 10, 2026',
        author: 'Corporate Communications',
        tags: 'Award',
        accent: 'from-yellow-400 to-orange-400',
        accentHex: '#F59E0B',
        fullContent: `We are thrilled to announce that Domino's Pizza Bangladesh has been honored with the prestigious "Best Retailer in Bangladesh" award at the Annual Retail Excellence Summit 2026.`,
        highlights: [
            'Recognized at the Annual Retail Excellence Summit 2026',
            'Awarded for exceptional customer service and innovation',
            'Celebrated for maintaining highest quality standards',
            'Acknowledged for successful digital transformation',
            'Honored for locally-inspired menu innovations',
        ],
    },
    {
        id: '40th-outlet-chattogram',
        icon: 'outlet',
        title: '40th Outlet',
        subtitle: 'Dominos Pizza Bangladesh',
        description: 'We have opened our 40th outlet at Chattogram Jamal khan.',
        category: 'Expansion',
        date: 'March 5, 2026',
        author: 'Expansion Team',
        tags: 'Expansion',
        accent: 'from-blue-500 to-cyan-400',
        accentHex: '#0056A3',
        fullContent: `Jubilant FoodWorks Bangladesh is excited to announce a significant milestone – the opening of our 40th Domino's Pizza outlet in Chattogram at the prestigious Jamal Khan area.`,
        highlights: [
            'Strategic location in Chattogram Jamal Khan',
            'Modern facility with 50-seat dining capacity',
            'Advanced digital ordering and payment systems',
            'Employs 25+ local team members',
            'Special promotional offers for grand opening',
        ],
    },
    {
        id: 'q3-2025-townhall',
        icon: 'townhall',
        title: 'Townhall',
        subtitle: 'Upcoming Q3, 2025 Townhall',
        description: 'Join us for the quarterly townhall meeting with leadership team.',
        category: 'Corporate',
        date: 'March 15, 2026',
        author: 'HR Department',
        tags: 'Corporate',
        accent: 'from-purple-500 to-indigo-400',
        accentHex: '#7C3AED',
        fullContent: `We are pleased to invite all team members to our upcoming Q3 2025 Townhall Meeting, scheduled for March 25, 2026.`,
        highlights: [
            'Date: March 25, 2026',
            'Led by senior leadership team',
            'Q3 performance review and recognition',
            'Strategic initiatives announcement',
            'Interactive Q&A session with leadership',
            'Hybrid format: In-person and virtual',
        ],
    },
    {
        id: 'huddle-goal-50',
        icon: 'huddle',
        title: 'Huddle',
        subtitle: 'The Goal is 50',
        description: 'Team collaboration session to achieve our milestone targets.',
        category: 'Team Event',
        date: 'March 12, 2026',
        author: 'Operations Team',
        tags: 'Team',
        accent: 'from-green-400 to-emerald-500',
        accentHex: '#10B981',
        fullContent: `The Operations Team is organizing an energizing team huddle session titled "The Goal is 50" – our ambitious target to reach 50 Domino's outlets across Bangladesh by end of 2026.`,
        highlights: [
            'Target: 50 outlets by end of 2026',
            'Cross-functional team collaboration',
            'Best practices sharing from successful outlets',
            'Workshops on operational excellence',
            'Strategic planning for accelerated growth',
        ],
    },
    {
        id: 'earning-q2-fy25',
        icon: 'earning',
        title: 'Earning Q2',
        subtitle: "Earning report of Q2 FY'25",
        description: 'Quarterly financial results and performance metrics released.',
        category: 'Financial',
        date: 'March 8, 2026',
        author: 'Finance Department',
        tags: 'Finance',
        accent: 'from-cyan-400 to-blue-500',
        accentHex: '#00B0E6',
        fullContent: `Jubilant FoodWorks Bangladesh is pleased to release our Q2 FY'25 financial results, demonstrating strong performance across all key metrics.`,
        highlights: [
            '28% year-over-year revenue growth',
            'EBITDA margins improved to 18.5%',
            '65% of sales through digital channels',
            '15% same-store sales growth',
            '5 new outlets opened in Q2',
        ],
    },
    {
        id: 'earning-q2-fy25',
        icon: 'earning',
        title: 'Earning Q2',
        subtitle: "Earning report of Q2 FY'25",
        description: 'Quarterly financial results and performance metrics released.',
        category: 'Financial',
        date: 'March 8, 2026',
        author: 'Finance Department',
        tags: 'Finance',
        accent: 'from-cyan-400 to-blue-500',
        accentHex: '#00B0E6',
        fullContent: `Jubilant FoodWorks Bangladesh is pleased to release our Q2 FY'25 financial results, demonstrating strong performance across all key metrics.`,
        highlights: [
            '28% year-over-year revenue growth',
            'EBITDA margins improved to 18.5%',
            '65% of sales through digital channels',
            '15% same-store sales growth',
            '5 new outlets opened in Q2',
        ],
    },
];