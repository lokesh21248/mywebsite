export const PRODUCTS = [
    {
        id: "prod-001",
        name: "Organic Cotton T-Shirt Basic",
        producer: "EcoTextiles Ltd.",
        category: "Apparel",
        status: "Published",
        lastUpdated: "2023-10-15T14:30:00Z",
        description: "Standard weight organic cotton t-shirt produced in specialized facility.",
        evidenceCount: 3,
        disclosure: {
            declaredBy: "Sarah Jenkins, Compliance Officer",
            declarationDate: "2023-10-15",
            attributes: [
                { label: "Material", value: "100% GOTS Certified Organic Cotton" },
                { label: "Origin", value: "Maharashtra, India" },
                { label: "Water Usage", value: "2400 Liters / kg" },
                { label: "Dye Process", value: "Low-impact reactive dyes" }
            ]
        },
        history: [
            { version: "v1.2", date: "2023-10-15", action: "Disclosure Published", user: "S. Jenkins" },
            { version: "v1.1", date: "2023-10-12", action: "Evidence Attached", user: "S. Jenkins" },
            { version: "v1.0", date: "2023-10-10", action: "Draft Created", user: "M. Chen" }
        ]
    },
    {
        id: "prod-002",
        name: "Recycled Polyester Fleece",
        producer: "PolyCycle Inc.",
        category: "Textiles",
        status: "Submitted",
        lastUpdated: "2023-11-02T09:15:00Z",
        description: "Heavyweight fleece fabric made from post-consumer PET bottles.",
        evidenceCount: 1,
        disclosure: {
            declaredBy: "David Ross, Production Manager",
            declarationDate: "2023-11-01",
            attributes: [
                { label: "Material", value: "100% rPET" },
                { label: "Source", value: "Taiwan" },
                { label: "Recycle Standard", value: "GRS 4.0" }
            ]
        },
        history: [
            { version: "v0.9", date: "2023-11-02", action: "Submitted for Review", user: "D. Ross" },
            { version: "v0.1", date: "2023-10-28", action: "Draft Initiated", user: "D. Ross" }
        ]
    },
    {
        id: "prod-003",
        name: "Hemp/Cotton Blend Canvas",
        producer: "Natural Weaves Co.",
        category: "Textiles",
        status: "Draft",
        lastUpdated: "2023-11-05T16:45:00Z",
        description: "Durable canvas fabric suitable for bags and upholstery.",
        evidenceCount: 0,
        disclosure: {
            declaredBy: "Elena Rodriguez, Director",
            declarationDate: null,
            attributes: [
                { label: "Material", value: "55% Hemp, 45% Organic Cotton" },
                { label: "Weight", value: "12oz" }
            ]
        },
        history: [
            { version: "v0.1", date: "2023-11-05", action: "Draft Updated", user: "E. Rodriguez" }
        ]
    },
    {
        id: "prod-004",
        name: "Bamboo Viscose Sheets",
        producer: "GreenSleep",
        category: "Home Goods",
        status: "Published",
        lastUpdated: "2023-09-20T11:20:00Z",
        description: "Soft, breathable bed sheets made from bamboo-derived viscose.",
        evidenceCount: 5,
        disclosure: {
            declaredBy: "Operations Team",
            declarationDate: "2023-09-20",
            attributes: [
                { label: "Material", value: "100% Bamboo Viscose" },
                { label: "Thread Count", value: "300" },
                { label: "Process", value: "Closed-loop Lyocell" }
            ]
        },
        history: [
            { version: "v1.0", date: "2023-09-20", action: "Disclosure Published", user: "Admin" }
        ]
    },
    {
        id: "prod-005",
        name: "Merino Wool Base Layer",
        producer: "Alpine Coordinates",
        category: "Apparel",
        status: "Published",
        lastUpdated: "2023-10-01T10:00:00Z",
        description: "Thermal base layer for cold weather activities.",
        evidenceCount: 2,
        disclosure: {
            declaredBy: "James Wu",
            declarationDate: "2023-10-01",
            attributes: [
                { label: "Material", value: "100% Merino Wool" },
                { label: "Micron", value: "18.5" },
                { label: "Ethical Std", value: "RWS Certified" }
            ]
        },
        history: [
            { version: "v1.0", date: "2023-10-01", action: "Published", user: "J. Wu" }
        ]
    }
];

export const getProducts = () => {
    return new Promise((resolve) => setTimeout(() => resolve([...PRODUCTS]), 300)); // Simulate net lag
};

export const getProductById = (id) => {
    return new Promise((resolve) => {
        const product = PRODUCTS.find(p => p.id === id);
        setTimeout(() => resolve(product ? { ...product } : null), 200);
    });
};
