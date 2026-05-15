import type { SiteLanguage } from "@/lib/site-language";

type NewsItem = {
    category: string;
    categoryColor: string;
    categoryBg: string;
    title: string;
    date: string;
    featured?: boolean;
};

type GalleryItem = {
    tag: string;
};

type VerticalCard = {
    n: string;
    to: "/kalagam" | "/assembly" | "/education";
    color: string;
    badgeBg: string;
    badge: string;
    title: string;
    desc: string;
    cta: string;
};

type SiteText = {
    nav: {
        home: string;
        about: string;
        news: string;
        gallery: string;
        kalagam: string;
        assembly: string;
        education: string;
        enquiry: string;
    };
    hero: {
        eyebrow: string;
        title: string;
        description: string;
        profileHighlights: Array<{ title: string; sub: string }>;
        ctas: { primary: string; secondary: string };
        stats: Array<{ value: string; label: string }>;
        serviceCards: Array<{ badge: string; title: string; content: string; link: string }>;
        about: { heading: string; description: string };
        news: { heading: string; items: NewsItem[] };
        gallery: { heading: string };
        enquiry: {
            heading: string;
            description: string;
            forms: {
                party: string;
                assembly: string;
                education: string;
            };
            labels: {
                name: string;
                mobile: string;
                email: string;
                request: string;
                submit: string;
                note: string;
            };
        };
    };
    aboutPage: {
        eyebrow: string;
        title: string;
        paragraphs: string[];
        careerTimelineHeading: string;
        timeline: Array<{ y: string; t: string }>;
        keyAchievementsHeading: string;
        achievements: string[];
    };
    assemblyPage: {
        eyebrow: string;
        title: string;
        paragraphs: string[];
        news: NewsItem[];
        formTitle: string;
        formDescription: string;
    };
    educationPage: {
        eyebrow: string;
        title: string;
        paragraphs: string[];
        news: NewsItem[];
        formTitle: string;
        formDescription: string;
    };
    kalagamPage: {
        eyebrow: string;
        title: string;
        paragraphs: string[];
        news: NewsItem[];
        formTitle: string;
        formDescription: string;
    };
    shared: {
        latestNews: string;
        viewAll: string;
        gallery: string;
        submitRequest: string;
        recentUpdates: string;
        contact: string;
        footerBottom: string;
        footerRights: string;
        footerDesigned: string;
        notFoundTitle: string;
        notFoundBody: string;
        notFoundCta: string;
        errorTitle: string;
        errorBody: string;
        tryAgain: string;
        goHome: string;
        allTab: string;
        loadingGallery: string;
    };
    pageMeta: {
        home: { title: string; description: string };
        about: { title: string; description: string };
        assembly: { title: string; description: string };
        education: { title: string; description: string };
        kalagam: { title: string; description: string };
        news: { title: string; description: string };
        gallery: { title: string; description: string };
    };
    verticals: VerticalCard[];
    gallery: GalleryItem[];
};

const english: SiteText = {
    nav: {
        home: "Home",
        about: "About",
        news: "News",
        gallery: "Gallery",
        kalagam: "Kalagam",
        assembly: "Assembly",
        education: "Education",
        enquiry: "Enquiry",
    },
    hero: {
        eyebrow: "Tamilaga Vettri Kazhagam",
        title: "Serving Mylapore with Steady Leadership",
        description:
            "A people-first representative focused on public service, education, and constituency development.",
        profileHighlights: [
            { title: "TVK Party Treasurer", sub: "Tamilaga Vettri Kazhagam" },
            { title: "School Education Minister", sub: "Government of Tamil Nadu" },
            { title: "MLA — Mylapore Constituency", sub: "Chennai, Tamil Nadu" },
        ],
        ctas: { primary: "Register Your Request", secondary: "Learn More" },
        stats: [
            { value: "10+", label: "Years Service" },
            { value: "3", label: "Portfolios" },
        ],
        serviceCards: [
            {
                badge: "Party Work",
                title: "Kalagam Pani",
                content:
                    "Direct coordination with cadres, ward-level organisers, and party programme support.",
                link: "Request Registration →",
            },
            {
                badge: "Constituency Development",
                title: "Assembly Works",
                content:
                    "Roads, drinking water, drainage, welfare schemes, and local development work.",
                link: "View Details →",
            },
            {
                badge: "Education",
                title: "School Education",
                content:
                    "Improving government school quality, infrastructure, and student outcomes.",
                link: "Learn More →",
            },
        ],
        about: {
            heading: "People-First Service",
            description:
                "Transparent administration, practical constituency work, and public education reform remain the core focus.",
        },
        news: {
            heading: "Latest News",
            items: [
                {
                    category: "Assembly",
                    categoryColor: "#8B0000",
                    categoryBg: "rgba(139,0,0,0.08)",
                    title: "Drainage infrastructure approved for Mylapore North ward — ₹12 crore project",
                    date: "12 May 2026",
                    featured: true,
                },
                {
                    category: "Education",
                    categoryColor: "#15803D",
                    categoryBg: "rgba(21,128,61,0.08)",
                    title: "Mid-day meal quality audit launched across government schools",
                    date: "10 May 2026",
                },
                {
                    category: "TVK",
                    categoryColor: "#8B0000",
                    categoryBg: "rgba(255,204,0,0.18)",
                    title: "District-level cadre training programme concludes in Chennai",
                    date: "08 May 2026",
                },
            ],
        },
        gallery: { heading: "Gallery" },
        enquiry: {
            heading: "Submit an Enquiry",
            description:
                "Select the relevant category and submit your request. You will receive a WhatsApp confirmation on your mobile number shortly after submission.",
            forms: {
                party: "Party Enquiry",
                assembly: "Assembly Enquiry",
                education: "Education Enquiry",
            },
            labels: {
                name: "Name",
                mobile: "Mobile",
                email: "Email",
                request: "Request",
                submit: "Submit your request",
                note: "Your mobile number will receive a WhatsApp confirmation",
            },
        },
    },
    aboutPage: {
        eyebrow: "About P. Venkataramanan",
        title: "Public Service First.",
        paragraphs: [
            "P. Venkataramanan is the sitting Member of the Legislative Assembly for the Mylapore constituency in Chennai and serves as the School Education Minister of Tamil Nadu. He also holds the role of Party Treasurer for Tamilaga Vettri Kazhagam (TVK).",
            "His public work has centered on civic infrastructure, accessible education, and constituency service. His offices have handled citizen grievances and supported state resources reaching underserved wards.",
            "As School Education Minister, he oversees policy and operations for government schools across Tamil Nadu, with a focus on teacher welfare, student learning outcomes, mid-day meal quality, and digital classrooms.",
        ],
        careerTimelineHeading: "Career Timeline",
        timeline: [
            { y: "2014", t: "Began active public work in Mylapore at the grassroots level." },
            { y: "2016", t: "Expanded civic and sanitation advocacy in local wards." },
            { y: "2025", t: "Appointed Party Treasurer, Tamilaga Vettri Kazhagam (TVK)." },
            { y: "2026", t: "Elected MLA from Mylapore Constituency, Chennai." },
            { y: "2026", t: "Assumed office as School Education Minister, Government of Tamil Nadu." },
        ],
        keyAchievementsHeading: "Key Achievements",
        achievements: [
            "Government schools modernised under the Education Reform Mission",
            "12 major drainage and water projects sanctioned across Mylapore",
            "Mid-day meal nutrition audit covering several thousand schools statewide",
            "TVK cadre expansion to 240+ wards across Tamil Nadu",
        ],
    },
    assemblyPage: {
        eyebrow: "Mylapore · Assembly",
        title: "Assembly Works — Serving Mylapore",
        paragraphs: [
            "The MLA office for Mylapore handles constituency grievances spanning roads, drainage, water supply, sanitation, civic infrastructure, welfare schemes, and development projects.",
            "Citizens can directly raise infrastructure issues, welfare scheme follow-ups, or development requests for their ward. Each request is logged, tracked, and routed to the responsible department with weekly status reviews.",
            "For emergency civic issues, please also contact the local ward office. For long-form policy or development proposals, use the form below — every submission gets a WhatsApp confirmation.",
        ],
        news: [
            {
                category: "Assembly",
                categoryColor: "#8B0000",
                categoryBg: "rgba(139,0,0,0.08)",
                title: "New drainage infrastructure approved for Mylapore North ward — ₹12 crore project",
                date: "12 May 2026",
            },
            {
                category: "Assembly",
                categoryColor: "#8B0000",
                categoryBg: "rgba(139,0,0,0.08)",
                title: "Mylapore beach cleanliness drive completes 50th consecutive week",
                date: "05 May 2026",
            },
            {
                category: "Assembly",
                categoryColor: "#8B0000",
                categoryBg: "rgba(139,0,0,0.08)",
                title: "New community library inaugurated in Luz Corner, Mylapore",
                date: "14 Apr 2026",
            },
        ],
        formTitle: "Submit your request",
        formDescription: "Assembly request form",
    },
    educationPage: {
        eyebrow: "Tamil Nadu · Education",
        title: "School Education — Reforms for Every Child",
        paragraphs: [
            "The School Education Ministry of Tamil Nadu is responsible for the state's government schools, lakhs of teachers, and the learning journeys of millions of students across the state.",
            "Current focus areas include teacher welfare and housing, mid-day meal nutrition quality, digital classrooms, language learning, and improving learning outcomes through evidence-based assessment.",
            "Use this form for school-level requests, teacher transfer or welfare matters, policy suggestions, or to escalate concerns from parents and school management committees.",
        ],
        news: [
            {
                category: "Education",
                categoryColor: "#15803D",
                categoryBg: "rgba(21,128,61,0.08)",
                title: "Mid-day meal quality audit launched across government schools",
                date: "10 May 2026",
            },
            {
                category: "Education",
                categoryColor: "#15803D",
                categoryBg: "rgba(21,128,61,0.08)",
                title: "Tamil Nadu rolls out tablet-based assessments for high schools",
                date: "02 May 2026",
            },
            {
                category: "Education",
                categoryColor: "#15803D",
                categoryBg: "rgba(21,128,61,0.08)",
                title: "Teacher welfare board approves housing assistance for educators",
                date: "22 Apr 2026",
            },
        ],
        formTitle: "Submit your request",
        formDescription: "Education request form",
    },
    kalagamPage: {
        eyebrow: "TVK · Kalagam Pani",
        title: "Kalagam Pani — Strengthening the TVK Movement",
        paragraphs: [
            "Kalagam Pani is the cadre engine of Tamilaga Vettri Kazhagam. It coordinates ward-level workers, organises programmes, and channels grassroots feedback into party decision making.",
            "As Party Treasurer, P. Venkataramanan oversees the financial discipline and operational support for cadre activities across Mylapore and the wider Tamil Nadu network — covering training camps, district meets, and outreach drives.",
            "Use the form below for party programme requests, cadre coordination, training nominations, or to reach the Treasurer's office on TVK matters.",
        ],
        news: [
            {
                category: "TVK",
                categoryColor: "#8B0000",
                categoryBg: "rgba(255,204,0,0.18)",
                title: "District-level cadre training programme concludes in Chennai with 2,400 attendees",
                date: "08 May 2026",
            },
            {
                category: "TVK",
                categoryColor: "#8B0000",
                categoryBg: "rgba(255,204,0,0.18)",
                title: "TVK foundation day celebrated across 240+ wards statewide",
                date: "28 Apr 2026",
            },
            {
                category: "TVK",
                categoryColor: "#8B0000",
                categoryBg: "rgba(255,204,0,0.18)",
                title: "Treasurer's office publishes quarterly transparency report",
                date: "14 Apr 2026",
            },
        ],
        formTitle: "Submit your request",
        formDescription: "Party request form",
    },
    shared: {
        latestNews: "Latest News",
        viewAll: "View All →",
        gallery: "Gallery",
        submitRequest: "Submit Request",
        recentUpdates: "Recent updates",
        contact: "Contact",
        footerBottom: "Designed for the people of Mylapore.",
        footerRights: "© 2026 P. Venkataramanan. All rights reserved.",
        footerDesigned: "Service-first representation for Mylapore, Tamil Nadu, and the public education mission.",
        notFoundTitle: "Page not found",
        notFoundBody: "The page you're looking for doesn't exist or has been moved.",
        notFoundCta: "Go home",
        errorTitle: "This page didn't load",
        errorBody: "Something went wrong on our end. You can try refreshing or head back home.",
        tryAgain: "Try again",
        goHome: "Go home",
        allTab: "All",
        loadingGallery: "Loading gallery images...",
    },
    pageMeta: {
        home: {
            title: "P. Venkataramanan — MLA Mylapore · TVK · School Education Minister",
            description: "Official website of P. Venkataramanan, MLA Mylapore, School Education Minister of Tamil Nadu, and TVK Party Treasurer.",
        },
        about: {
            title: "About P. Venkataramanan — MLA Mylapore",
            description: "Biography, career timeline, and public service focus of P. Venkataramanan, MLA for Mylapore and School Education Minister of Tamil Nadu.",
        },
        assembly: {
            title: "Assembly Works — Mylapore Constituency · P. Venkataramanan",
            description: "Constituency grievances, infrastructure, welfare and development works across Mylapore.",
        },
        education: {
            title: "School Education — Tamil Nadu · P. Venkataramanan",
            description: "School policy, teacher welfare, student outcomes, and reforms across government schools in Tamil Nadu.",
        },
        kalagam: {
            title: "Kalagam Pani — TVK Party Work · P. Venkataramanan",
            description: "Tamilaga Vettri Kazhagam coordination, cadre training, and party programme requests.",
        },
        news: {
            title: "News — P. Venkataramanan, MLA Mylapore",
            description: "Latest updates from the office of the MLA for Mylapore and the Tamil Nadu School Education Ministry.",
        },
        gallery: {
            title: "Gallery — P. Venkataramanan, MLA Mylapore",
            description: "Photographs from constituency work, school visits, and TVK programmes.",
        },
    },
    verticals: [
        {
            n: "01",
            to: "/kalagam",
            color: "#8B0000",
            badgeBg: "rgba(139,0,0,0.10)",
            badge: "TVK Party",
            title: "Kalagam Pani",
            desc: "Party coordination, cadre training, and TVK programme requests across Mylapore and beyond.",
            cta: "Submit Request →",
        },
        {
            n: "02",
            to: "/assembly",
            color: "#1D4ED8",
            badgeBg: "rgba(29,78,216,0.10)",
            badge: "Constituency",
            title: "Assembly Works",
            desc: "Grievances, infrastructure, welfare, and development across the Mylapore Assembly seat.",
            cta: "Submit Request →",
        },
        {
            n: "03",
            to: "/education",
            color: "#15803D",
            badgeBg: "rgba(21,128,61,0.10)",
            badge: "Ministry",
            title: "School Education",
            desc: "School policy, teacher welfare, student outcomes, and reforms across government schools statewide.",
            cta: "Submit Request →",
        },
    ],
    gallery: [
        { tag: "TVK Event" },       // gallery_1
        { tag: "MLA Office" },      // gallery_2
        { tag: "School Visit" },    // gallery_3
        { tag: "Programme" },       // gallery_4
        { tag: "Meeting" },         // gallery_5
        { tag: "School" },          // gallery_6
        { tag: "Rally" },           // gallery_7
        { tag: "Photo" },           // gallery_8
        { tag: "Photo" },           // gallery_9
        { tag: "Photo" },           // gallery_10
        { tag: "Photo" },           // gallery_11
        { tag: "Inauguration" },    // gallery_extra_1
        { tag: "Cadre Meet" },      // gallery_extra_2
        { tag: "Press Briefing" },  // gallery_extra_3
        { tag: "Site Visit" },      // gallery_extra_4
        { tag: "Public Meeting" },  // gallery_extra_5
    ],
};

const tamil: SiteText = {
    nav: {
        home: "முகப்பு",
        about: "எங்களை பற்றி",
        news: "செய்திகள்",
        gallery: "புகைப்படங்கள்",
        kalagam: "கழகப் பணி",
        assembly: "சட்டமன்றம்",
        education: "கல்வி",
        enquiry: "கோரிக்கை",
    },
    hero: {
        eyebrow: "தமிழக வெற்றி கழகம்",
        title: "மயிலாப்பூருக்கு நிலையான மக்கள் சேவை நேர்மையான தலைமை",
        description:
            "மயிலாப்பூர் மக்களின் நலனையும், கல்வி முன்னேற்றத்தையும், தொகுதி வளர்ச்சியையும் முதன்மையாகக் கொண்டு செயல்படும் மக்கள் பிரதிநிதி.",
        profileHighlights: [
            { title: "TVK கட்சி பொருளாளர்", sub: "தமிழக வெற்றி கழகம்" },
            { title: "பள்ளிக் கல்வித் துறை அமைச்சர்", sub: "தமிழ்நாடு அரசு" },
            { title: "மயிலாப்பூர் சட்டமன்ற உறுப்பினர்", sub: "சென்னை, தமிழ்நாடு" },
        ],
        ctas: { primary: "உங்கள் கோரிக்கையை பதிவு செய்யுங்கள்", secondary: "மேலும் அறிய" },
        stats: [
            { value: "10+", label: "ஆண்டுகள் மக்கள் சேவை" },
            { value: "3", label: "முக்கிய பொறுப்புகள்" },
        ],
        serviceCards: [
            {
                badge: "கட்சி பணி",
                title: "கழக மக்கள் பணி",
                content:
                    "மக்களுடன் நேரடி தொடர்பு கொண்டு, தொகுதி மற்றும் கழக வளர்ச்சிக்காக தொடர்ந்து செயல்படும் ஒருங்கிணைந்த பணிகள்.",
                link: "கோரிக்கை பதிவு →",
            },
            {
                badge: "தொகுதி வளர்ச்சி",
                title: "சட்டமன்ற வளர்ச்சி பணிகள்",
                content:
                    "சாலை, குடிநீர், மழைநீர் வடிகால், நலத்திட்டங்கள் போன்ற அடிப்படை வளர்ச்சி பணிகள்.",
                link: "விவரம் காண →",
            },
            {
                badge: "கல்வி",
                title: "கல்வி முன்னேற்ற திட்டங்கள்",
                content:
                    "அரசுப் பள்ளி மாணவர்களின் தரமான கல்வி, கட்டமைப்பு மற்றும் நலன்களை மேம்படுத்தும் முயற்சிகள்.",
                link: "மேலும் அறிய →",
            },
        ],
        about: {
            heading: "மக்கள் சேவையே முதன்மை",
            description:
                "வெளிப்படையான நிர்வாகம், செயல்முறை மக்கள் சேவை மற்றும் கல்வி முன்னேற்றத்தை அடிப்படையாகக் கொண்டு மயிலாப்பூர் தொகுதி வளர்ச்சிக்காக தொடர்ந்து செயல்பட்டு வருகிறார்.",
        },
        news: {
            heading: "சமீபத்திய செய்திகள்",
            items: [
                {
                    category: "Assembly",
                    categoryColor: "#8B0000",
                    categoryBg: "rgba(139,0,0,0.08)",
                    title: "மயிலாப்பூர் வடக்கு பகுதியில் ₹12 கோடி மதிப்பிலான மழைநீர் வடிகால் திட்டம் தொடக்கம்",
                    date: "12 மே 2026",
                    featured: true,
                },
                {
                    category: "Education",
                    categoryColor: "#15803D",
                    categoryBg: "rgba(21,128,61,0.08)",
                    title: "அரசுப் பள்ளிகளில் மதிய உணவு தர ஆய்வு தீவிரப்படுத்தப்பட்டது",
                    date: "10 மே 2026",
                },
                {
                    category: "TVK",
                    categoryColor: "#8B0000",
                    categoryBg: "rgba(255,204,0,0.18)",
                    title: "சென்னையில் மாவட்ட அளவிலான கழக நிர்வாகிகள் பயிற்சி முகாம் நடைபெற்றது",
                    date: "08 மே 2026",
                },
            ],
        },
        gallery: { heading: "புகைப்பட தொகுப்பு" },
        enquiry: {
            heading: "உங்கள் கோரிக்கையை பதிவு செய்யுங்கள்",
            description:
                "உங்கள் தேவைக்கேற்ற பிரிவைத் தேர்வு செய்து கோரிக்கையை பதிவு செய்யுங்கள். பதிவு செய்யப்பட்ட பிறகு உங்கள் மொபைல் எண்ணிற்கு உறுதிப்படுத்தல் தகவல் அனுப்பப்படும்.",
            forms: {
                party: "கழக தொடர்பான கோரிக்கை",
                assembly: "தொகுதி மக்கள் சேவை கோரிக்கை",
                education: "கல்வி தொடர்பான கோரிக்கை",
            },
            labels: {
                name: "பெயர்",
                mobile: "மொபைல் எண்",
                email: "மின்னஞ்சல்",
                request: "கோரிக்கை",
                submit: "கோரிக்கையை சமர்ப்பிக்கவும்",
                note: "உங்கள் மொபைல் எண்ணிற்கு WhatsApp உறுதிப்படுத்தல் அனுப்பப்படும்",
            },
        },
    },
    aboutPage: {
        eyebrow: "P. வெங்கட்ராமணன் பற்றி",
        title: "மக்கள் சேவையே முதன்மை",
        paragraphs: [
            "பி. வெங்கட்ராமணன் அவர்கள் சென்னை மயிலாப்பூர் தொகுதியின் தற்போதைய சட்டமன்ற உறுப்பினராகவும், தமிழ்நாடு அரசின் பள்ளிக் கல்வித் துறை அமைச்சராகவும் பணியாற்றி வருகிறார். மேலும், தமிழக வெற்றி கழகம் (TVK) கட்சியின் பொருளாளராகவும் முக்கிய பொறுப்பில் செயல்பட்டு வருகிறார்.",
            "அவரது மக்கள் சேவைப் பயணம், அடிப்படை குடிமக்கள் வசதிகள், தரமான கல்வி, மற்றும் தொகுதி மக்கள் நல சேவைகளை மையமாகக் கொண்டு தொடர்ந்து முன்னெடுக்கப்பட்டு வருகிறது.",
            "பள்ளிக் கல்வித் துறை அமைச்சராக, தமிழ்நாடு அரசுப் பள்ளிகளின் நிர்வாகம் மற்றும் கல்விக் கொள்கை அமலாக்கப் பணிகளை முன்னெடுத்து வருகிறார்.",
        ],
        careerTimelineHeading: "வாழ்க்கை வரலாறு",
        timeline: [
            { y: "2014", t: "மயிலாப்பூர் பகுதியில் அடிப்படை மக்கள் சேவை மற்றும் சமூக பணிகளில் தீவிரமாக ஈடுபட தொடங்கினார்." },
            { y: "2016", t: "உள்ளூர் வார்டுகளில் சுகாதாரம், தூய்மை மற்றும் குடிமக்கள் வசதிகள் தொடர்பான பணிகளை விரிவுபடுத்தினார்." },
            { y: "2025", t: "தமிழக வெற்றி கழகம் (TVK) கட்சியின் பொருளாளராக நியமிக்கப்பட்டார்." },
            { y: "2026", t: "சென்னை மயிலாப்பூர் தொகுதியின் சட்டமன்ற உறுப்பினராக தேர்ந்தெடுக்கப்பட்டார்." },
            { y: "2026", t: "தமிழ்நாடு அரசின் பள்ளிக் கல்வித் துறை அமைச்சராக பொறுப்பேற்றார்." },
        ],
        keyAchievementsHeading: "முக்கிய சாதனைகள்",
        achievements: [
            "கல்வி சீர்திருத்த இயக்கத்தின் கீழ் பல அரசுப் பள்ளிகள் நவீனமயமாக்கப்பட்டன.",
            "மயிலாப்பூரில் 12 முக்கிய மழைநீர் வடிகால் மற்றும் குடிநீர் திட்டங்களுக்கு அனுமதி வழங்கப்பட்டது.",
            "தமிழ்நாடு முழுவதும் ஆயிரக்கணக்கான பள்ளிகளில் மதிய உணவுத் திட்ட தர ஆய்வு முன்னெடுக்கப்பட்டது.",
            "தமிழக வெற்றி கழகத்தின் அமைப்பு 240க்கும் மேற்பட்ட வார்டுகளுக்கு விரிவுபடுத்தப்பட்டது.",
        ],
    },
    assemblyPage: {
        eyebrow: "மயிலாப்பூர் · சட்டமன்ற சேவை",
        title: "மயிலாப்பூருக்கான சட்டமன்ற சேவை",
        paragraphs: [
            "மயிலாப்பூர் சட்டமன்ற உறுப்பினர் அலுவலகம், தொகுதி மக்களின் சாலை வசதி, மழைநீர் வடிகால், குடிநீர் வழங்கல், தூய்மை பணிகள், அடிப்படை குடிமக்கள் வசதிகள், நலத்திட்டங்கள் மற்றும் வளர்ச்சி பணிகள் தொடர்பான கோரிக்கைகளை கவனித்து வருகிறது.",
            "மக்கள் தங்களது வார்டுகளில் உள்ள அடிப்படை கட்டமைப்பு பிரச்சினைகள், அரசு நலத்திட்ட உதவிகள், அல்லது வளர்ச்சி தொடர்பான தேவைகளை நேரடியாக பதிவு செய்யலாம்.",
            "அவசர பொதுமக்கள் பிரச்சினைகளுக்கு, அருகிலுள்ள வார்டு அலுவலகத்தையும் தொடர்பு கொள்ளலாம்.",
        ],
        news: [
            {
                category: "Assembly",
                categoryColor: "#8B0000",
                categoryBg: "rgba(139,0,0,0.08)",
                title: "மயிலாப்பூர் வடக்கு வார்டிற்கு ₹12 கோடி மதிப்பிலான புதிய மழைநீர் வடிகால் திட்டம் ஒப்புதல் பெற்றது",
                date: "12 மே 2026",
            },
            {
                category: "Assembly",
                categoryColor: "#8B0000",
                categoryBg: "rgba(139,0,0,0.08)",
                title: "மயிலாப்பூர் கடற்கரை தூய்மை இயக்கம் தொடர்ந்து 50வது வாரத்தை நிறைவு செய்தது",
                date: "05 மே 2026",
            },
            {
                category: "Assembly",
                categoryColor: "#8B0000",
                categoryBg: "rgba(139,0,0,0.08)",
                title: "லூஸ் கார்னர் பகுதியில் புதிய சமூக நூலகம் திறந்து வைக்கப்பட்டது",
                date: "14 ஏப்ரல் 2026",
            },
        ],
        formTitle: "உங்கள் கோரிக்கையை பதிவு செய்யுங்கள்",
        formDescription: "தொகுதி மக்கள் சேவை கோரிக்கை",
    },
    educationPage: {
        eyebrow: "தமிழ்நாடு · பள்ளிக் கல்வி",
        title: "ஒவ்வொரு மாணவரின் எதிர்காலத்திற்காக — தரமான கல்வி புரட்சி",
        paragraphs: [
            "தமிழ்நாடு பள்ளிக் கல்வித் துறை, அரசுப் பள்ளிகள், இலட்சக்கணக்கான ஆசிரியர்கள் மற்றும் கோடிக்கணக்கான மாணவர்களின் எதிர்காலத்தை வடிவமைக்கும் மிகப்பெரிய பொறுப்பை மேற்கொண்டு செயல்பட்டு வருகிறது.",
            "பள்ளிக் கல்வித் துறை அமைச்சராக பி. வெங்கட்ராமணன் அவர்கள், “ஒவ்வொரு குழந்தைக்கும் தரமான கல்வி” என்ற நோக்கத்துடன் பல்வேறு கல்வி சீர்திருத்த நடவடிக்கைகளை முன்னெடுத்து வருகிறார்.",
            "பள்ளி கட்டமைப்பு மேம்பாடு, ஆசிரியர் நலன், மாணவர் பாதுகாப்பு, பெற்றோர் கோரிக்கைகள் அல்லது கல்விக் கொள்கை தொடர்பான பரிந்துரைகளுக்கு கீழே உள்ள படிவத்தின் மூலம் நேரடியாக பதிவு செய்யலாம்.",
        ],
        news: [
            {
                category: "Education",
                categoryColor: "#15803D",
                categoryBg: "rgba(21,128,61,0.08)",
                title: "அரசுப் பள்ளிகளில் மதிய உணவுத் திட்ட தர ஆய்வு மாநிலம் முழுவதும் தொடங்கப்பட்டது",
                date: "10 மே 2026",
            },
            {
                category: "Education",
                categoryColor: "#15803D",
                categoryBg: "rgba(21,128,61,0.08)",
                title: "உயர்நிலைப் பள்ளிகளில் டேப்லெட் அடிப்படையிலான தேர்வு மற்றும் திறன் மதிப்பீட்டு திட்டம் அறிமுகம்",
                date: "02 மே 2026",
            },
            {
                category: "Education",
                categoryColor: "#15803D",
                categoryBg: "rgba(21,128,61,0.08)",
                title: "ஆசிரியர்களுக்கான வீட்டு வசதி உதவித் திட்டத்திற்கு கல்வி நல வாரியம் ஒப்புதல் வழங்கியது",
                date: "22 ஏப்ரல் 2026",
            },
        ],
        formTitle: "உங்கள் கல்வி தொடர்பான கோரிக்கையை பதிவு செய்யுங்கள்",
        formDescription: "பள்ளிகள் • ஆசிரியர்கள் • மாணவர்கள் • கல்விக் கொள்கைகள்",
    },
    kalagamPage: {
        eyebrow: "TVK · கழகப் பணி",
        title: "கழகப் பணி — தமிழக வெற்றி கழக இயக்கத்தை வலுப்படுத்தும் மக்கள் இயக்கம்",
        paragraphs: [
            "“கழகப் பணி” என்பது தமிழக வெற்றி கழகத்தின் அடித்தள அமைப்பு இயக்கமாகும். இது வார்டு அளவிலான நிர்வாகிகள் மற்றும் செயற்பாட்டாளர்களை ஒருங்கிணைத்து, மக்கள் கருத்துகளை கட்சியின் நிர்வாக முடிவுகளுடன் இணைக்கும் முக்கிய பொறுப்பை வகிக்கிறது.",
            "தமிழக வெற்றி கழகத்தின் பொருளாளராக உள்ள P. வெங்கட்ராமணன் அவர்கள், மயிலாப்பூர் மற்றும் தமிழ்நாடு முழுவதும் நடைபெறும் கழக நடவடிக்கைகளின் நிதி ஒழுங்கு மற்றும் நிர்வாக ஒருங்கிணைப்பை மேற்பார்வை செய்கிறார்.",
            "கட்சித் திட்டங்கள், நிர்வாகிகள் ஒருங்கிணைப்பு, பயிற்சி முகாம் பரிந்துரைகள் அல்லது கழக தொடர்பான கோரிக்கைகளுக்கு கீழே உள்ள படிவத்தை பயன்படுத்தலாம்.",
        ],
        news: [
            {
                category: "TVK",
                categoryColor: "#8B0000",
                categoryBg: "rgba(255,204,0,0.18)",
                title: "சென்னையில் நடைபெற்ற மாவட்ட அளவிலான நிர்வாகிகள் பயிற்சி முகாமில் 2,400க்கும் மேற்பட்டோர் பங்கேற்றனர்",
                date: "08 மே 2026",
            },
            {
                category: "TVK",
                categoryColor: "#8B0000",
                categoryBg: "rgba(255,204,0,0.18)",
                title: "தமிழகம் முழுவதும் 240க்கும் மேற்பட்ட வார்டுகளில் கழக தொடக்க நாள் விழா கொண்டாடப்பட்டது",
                date: "28 ஏப்ரல் 2026",
            },
            {
                category: "TVK",
                categoryColor: "#8B0000",
                categoryBg: "rgba(255,204,0,0.18)",
                title: "கழக பொருளாளர் அலுவலகம் காலாண்டு நிதி வெளிப்படைத்தன்மை அறிக்கையை வெளியிட்டது",
                date: "14 ஏப்ரல் 2026",
            },
        ],
        formTitle: "உங்கள் கோரிக்கையை பதிவு செய்யுங்கள்",
        formDescription: "கழக தொடர்பான கோரிக்கை",
    },
    shared: {
        latestNews: "சமீபத்திய செய்திகள்",
        viewAll: "அனைத்தையும் காண →",
        gallery: "புகைப்பட தொகுப்பு",
        submitRequest: "கோரிக்கையை சமர்ப்பிக்கவும்",
        recentUpdates: "சமீபத்திய புதுப்பிப்புகள்",
        contact: "தொடர்பு",
        footerBottom: "மக்களின் நலன் • நேர்மையான நிர்வாகம் • வளர்ச்சியடைந்த தமிழகம்",
        footerRights: "© 2026 பி. வெங்கட்ராமணன். அனைத்து உரிமைகளும் பாதுகாக்கப்பட்டவை.",
        footerDesigned: "மயிலாப்பூர் மக்களின் நலன், கல்வி முன்னேற்றம் மற்றும் மக்கள் சேவையை நோக்கமாகக் கொண்டு தொடர்ந்து செயல்படும் மக்கள் பிரதிநிதி.",
        notFoundTitle: "பக்கம் கிடைக்கவில்லை",
        notFoundBody: "நீங்கள் தேடும் பக்கம் இல்லை அல்லது இடமாற்றம் செய்யப்பட்டுள்ளது.",
        notFoundCta: "முகப்புக்கு செல்",
        errorTitle: "இந்த பக்கம் ஏற்றப்படவில்லை",
        errorBody: "எங்கள் பக்கத்தில் ஏதோ தவறு ஏற்பட்டது. நீங்கள் மீண்டும் முயற்சி செய்யலாம் அல்லது முகப்புக்கு திரும்பலாம்.",
        tryAgain: "மீண்டும் முயற்சி செய்யவும்",
        goHome: "முகப்புக்கு செல்",
        allTab: "அனைத்தும்",
        loadingGallery: "படங்கள் ஏற்றப்படுகின்றன...",
    },
    pageMeta: {
        home: {
            title: "பி. வெங்கட்ராமணன் — மயிலாப்பூர் சட்டமன்ற உறுப்பினர் · TVK · பள்ளிக் கல்வி அமைச்சர்",
            description: "பி. வெங்கட்ராமணன் அவர்களின் அதிகாரப்பூர்வ இணையதளம் — மயிலாப்பூர் சட்டமன்ற உறுப்பினர், தமிழ்நாடு பள்ளிக் கல்வித் துறை அமைச்சர், TVK கட்சி பொருளாளர்.",
        },
        about: {
            title: "பி. வெங்கட்ராமணன் பற்றி — மயிலாப்பூர் சட்டமன்ற உறுப்பினர்",
            description: "பி. வெங்கட்ராமணன் அவர்களின் வாழ்க்கை வரலாறு, சேவை பயணம், மற்றும் மக்கள் சேவை முன்னுரிமைகள்.",
        },
        assembly: {
            title: "சட்டமன்ற வளர்ச்சி பணிகள் — மயிலாப்பூர் தொகுதி · பி. வெங்கட்ராமணன்",
            description: "மயிலாப்பூர் தொகுதியில் குறைகள், கட்டமைப்பு, நலத்திட்டங்கள், மற்றும் வளர்ச்சி பணிகள்.",
        },
        education: {
            title: "பள்ளிக் கல்வி — தமிழ்நாடு · பி. வெங்கட்ராமணன்",
            description: "அரசுப் பள்ளிகளில் கல்விக் கொள்கை, ஆசிரியர் நலம், மாணவர் பெறுபேறுகள், மற்றும் சீர்திருத்தங்கள்.",
        },
        kalagam: {
            title: "கழகப் பணி — TVK கட்சி · பி. வெங்கட்ராமணன்",
            description: "தமிழக வெற்றி கழக ஒருங்கிணைப்பு, செயற்பாட்டாளர் பயிற்சி, மற்றும் கட்சி நிகழ்ச்சி கோரிக்கைகள்.",
        },
        news: {
            title: "செய்திகள் — பி. வெங்கட்ராமணன், மயிலாப்பூர் சட்டமன்ற உறுப்பினர்",
            description: "மயிலாப்பூர் சட்டமன்ற உறுப்பினர் அலுவலகம் மற்றும் தமிழ்நாடு பள்ளிக் கல்வித் துறையின் சமீபத்திய செய்திகள்.",
        },
        gallery: {
            title: "புகைப்படங்கள் — பி. வெங்கட்ராமணன், மயிலாப்பூர் சட்டமன்ற உறுப்பினர்",
            description: "தொகுதி பணிகள், பள்ளி பார்வைகள், மற்றும் TVK நிகழ்ச்சிகளின் புகைப்படங்கள்.",
        },
    },
    verticals: [
        {
            n: "01",
            to: "/kalagam",
            color: "#8B0000",
            badgeBg: "rgba(139,0,0,0.10)",
            badge: "TVK கட்சி",
            title: "கழக மக்கள் பணி",
            desc: "மயிலாப்பூர் மற்றும் அதற்கு வெளியே கட்சி ஒருங்கிணைப்பு, செயற்பாட்டாளர் பயிற்சி, மற்றும் TVK நிகழ்ச்சி கோரிக்கைகள்.",
            cta: "கோரிக்கை பதிவு →",
        },
        {
            n: "02",
            to: "/assembly",
            color: "#1D4ED8",
            badgeBg: "rgba(29,78,216,0.10)",
            badge: "தொகுதி",
            title: "சட்டமன்ற வளர்ச்சி பணிகள்",
            desc: "மயிலாப்பூர் சட்டமன்றத் தொகுதியில் குறைகள், கட்டமைப்பு, நலத்திட்டங்கள், மற்றும் வளர்ச்சி பணிகள்.",
            cta: "கோரிக்கை பதிவு →",
        },
        {
            n: "03",
            to: "/education",
            color: "#15803D",
            badgeBg: "rgba(21,128,61,0.10)",
            badge: "அமைச்சகம்",
            title: "பள்ளிக் கல்வி",
            desc: "அரசுப் பள்ளிகளில் கல்விக் கொள்கை, ஆசிரியர் நலம், மாணவர் பெறுபேறுகள், மற்றும் சீர்திருத்தங்கள்.",
            cta: "கோரிக்கை பதிவு →",
        },
    ],
    gallery: [
        { tag: "TVK நிகழ்வு" },           // gallery_1
        { tag: "அலுவலகம்" },              // gallery_2
        { tag: "பள்ளி பார்வை" },          // gallery_3
        { tag: "நிகழ்ச்சி" },             // gallery_4
        { tag: "கூட்டம்" },               // gallery_5
        { tag: "பள்ளி" },                 // gallery_6
        { tag: "பேரணி" },                 // gallery_7
        { tag: "புகைப்படம்" },            // gallery_8
        { tag: "புகைப்படம்" },            // gallery_9
        { tag: "புகைப்படம்" },            // gallery_10
        { tag: "புகைப்படம்" },            // gallery_11
        { tag: "திறப்பு விழா" },          // gallery_extra_1
        { tag: "நிர்வாகிகள் கூட்டம்" },  // gallery_extra_2
        { tag: "செய்தியாளர் சந்திப்பு" }, // gallery_extra_3
        { tag: "களப் பார்வை" },           // gallery_extra_4
        { tag: "பொதுக் கூட்டம்" },        // gallery_extra_5
    ],
};

export function getSiteContent(language: SiteLanguage) {
    return language === "ta" ? tamil : english;
}
