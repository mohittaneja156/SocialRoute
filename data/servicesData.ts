export type ServiceDetail = {
    id: string;
    title: string;
    description: string;
    goals: string[];
};

export const SERVICES: ServiceDetail[] = [
    {
        id: 'smm',
        title: 'Social Media Marketing',
        description: 'At Social Route, Social Media Marketing is a core service focused on building meaningful connections between brands and their audiences. The agency manages and promotes brands across platforms such as Instagram, Facebook, LinkedIn, X (Twitter), and YouTube through strategic content creation, community engagement, and paid advertising.',
        goals: [
            'Increase brand awareness and online presence',
            'Build strong audience engagement and interaction',
            'Drive targeted traffic to client websites',
            'Generate leads and boost sales through social platforms',
            'Create a loyal and active online community',
            'Strengthen customer communication and feedback management'
        ]
    },
    {
        id: 'seo',
        title: 'Search Engine Optimization',
        description: "Social Route's SEO services are designed to improve website visibility and ranking on search engines like Google. The agency uses a combination of keyword research, on-page optimization, technical SEO, content optimization, and link-building strategies to attract high-quality organic traffic.",
        goals: [
            'Improve search engine rankings for relevant keywords',
            'Increase organic and high-intent website traffic',
            'Enhance website authority and credibility',
            'Improve user experience and site structure',
            'Support long-term, cost-effective digital growth',
            'Increase leads and conversions through organic search'
        ]
    },
    {
        id: 'webdev',
        title: 'Web Development',
        description: 'At Social Route, web development focuses on creating high-performing, visually appealing, and user-friendly websites that serve as the foundation of all digital marketing efforts. The agency designs and develops responsive, fast, and secure websites that reflect brand identity.',
        goals: [
            'Build professional and brand-aligned websites',
            'Ensure mobile responsiveness and fast loading speed',
            'Improve navigation and user experience',
            'Support SEO and digital marketing campaigns',
            'Increase lead generation and conversions',
            'Maintain website security and performance'
        ]
    },
    {
        id: 'content',
        title: 'Content Creation',
        description: "Social Route's content creation services focus on producing high-quality, engaging, and valuable content tailored to the target audience. This includes social media content, blogs, website copy, videos, graphics, and marketing creatives.",
        goals: [
            'Deliver valuable and engaging content to audiences',
            'Strengthen brand authority and trust',
            'Support SEO and social media marketing efforts',
            'Increase audience engagement and shareability',
            'Nurture leads throughout the customer journey',
            'Communicate brand messages effectively'
        ]
    },
    {
        id: 'branding',
        title: 'Branding',
        description: 'Branding at Social Route is about creating a strong and memorable identity that sets businesses apart from competitors. The agency develops cohesive branding elements such as logos, color palettes, typography, tone of voice, and visual guidelines.',
        goals: [
            'Establish a clear and recognizable brand identity',
            'Differentiate clients from competitors',
            'Build trust and emotional connection with customers',
            'Maintain consistency across all digital channels',
            'Increase brand loyalty and customer retention',
            'Enhance overall brand value and reputation'
        ]
    },
    {
        id: 'strategy',
        title: 'Digital Marketing Strategy',
        description: "Social Route's digital marketing strategy services provide a clear roadmap for achieving business growth. The agency conducts market research, audience analysis, competitor study, and performance tracking to design customized strategies.",
        goals: [
            'Define clear marketing goals and KPIs',
            'Identify and target the right audience segments',
            'Integrate all digital marketing services effectively',
            'Optimize budget and resource allocation',
            'Improve campaign performance and ROI',
            'Enable data-driven and scalable growth'
        ]
    }
];
