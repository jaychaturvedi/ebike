type TUpgrade = {
    name: string,
    icon: string,
    price: number
}[]

export const Upgrades: TUpgrade = [
    {
        name: "Find my Bike",
        icon: "https://zelp-motovolt-app-faq-images.s3.us-east-2.amazonaws.com/cycle.png",
        price: 25
    },
    {
        name: "Theft Detection",
        icon: "https://zelp-motovolt-app-faq-images.s3.us-east-2.amazonaws.com/theft.png",
        price: 75
    },
    {
        name: "Geo Fencing",
        icon: "https://zelp-motovolt-app-faq-images.s3.us-east-2.amazonaws.com/geo-fencing.png",
        price: 50
    },
    {
        name: "Ride Statistics",
        icon: "https://zelp-motovolt-app-faq-images.s3.us-east-2.amazonaws.com/ride-statistics.png",
        price: 50
    },
    {
        name: "Smart Inspection",
        icon: "https://zelp-motovolt-app-faq-images.s3.us-east-2.amazonaws.com/smart-inspection.png",
        price: 25
    },
    {
        name: "Remote Lock",
        icon: "https://zelp-motovolt-app-faq-images.s3.us-east-2.amazonaws.com/lock.png",
        price: 55
    },
    {
        name: "Battery Analytics",
        icon: "https://zelp-motovolt-app-faq-images.s3.us-east-2.amazonaws.com/battery-analytics.png",
        price: 35
    },
    {
        name: "Online Store",
        icon: "https://zelp-motovolt-app-faq-images.s3.us-east-2.amazonaws.com/online-store.png",
        price: 0
    }
]

type TFaq = {
    sections: {
        id: number,
        name: string,
        icon: string,
        faq: {
            Question: string,
            Answer: string
        }[]
    }[]
}

export const Faq: TFaq = {
    sections: [
        {
            id: 1,
            name: 'Service',
            icon: "https://zelp-motovolt-app-faq-images.s3.us-east-2.amazonaws.com/faq/service.png",
            faq: [
                {
                    Question: "string",
                    Answer: "string"
                }

            ]
        },
        {
            id: 2,
            name: 'Green Mile',
            icon: "https://zelp-motovolt-app-faq-images.s3.us-east-2.amazonaws.com/faq/greenMile.png",
            faq: [
                {
                    Question: "string",
                    Answer: "string"
                }

            ]
        },
        {
            id: 3,
            name: 'Battery',
            icon: "https://zelp-motovolt-app-faq-images.s3.us-east-2.amazonaws.com/faq/battery.png",
            faq: [
                {
                    Question: "string",
                    Answer: "string"
                }

            ]
        },
        {
            id: 4,
            name: 'Motor',
            icon: "https://zelp-motovolt-app-faq-images.s3.us-east-2.amazonaws.com/faq/motor.png",
            faq: [
                {
                    Question: "string",
                    Answer: "string"
                }

            ]
        },
        {
            id: 5,
            name: 'Premium',
            icon: "https://zelp-motovolt-app-faq-images.s3.us-east-2.amazonaws.com/faq/premium.png",
            faq: [
                {
                    Question: "What are the premium features?",
                    Answer: "string"
                },
                {
                    Question: "How do premium features work?",
                    Answer: "string"
                },
                {
                    Question: "How can I upgrade to premium?",
                    Answer: "You can upgrade to premium by making the payment for the required features in the upgrades page. Steps: More>Upgrades>Feature>Payment"
                },
                {
                    Question: "What is the cost of premium features?",
                    Answer: "string"
                },
                {
                    Question: "Premium upgrade is not reflecting on my account after payment",
                    Answer: "string"
                }

            ]
        },
        {
            id: 6,
            name: 'Payment',
            icon: "https://zelp-motovolt-app-faq-images.s3.us-east-2.amazonaws.com/faq/payment.png",
            faq: [
                {
                    Question: "string",
                    Answer: "string"
                }

            ]
        }

    ]
}
