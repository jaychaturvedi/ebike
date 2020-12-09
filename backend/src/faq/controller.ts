import { SupportError } from "../error";
import { createNewFaqQnA } from "../faqQnA/controller";
import Faq from "./service";


export async function initNewFaqCategory() {
  const faqs = FaqList.sections.map(async (item,index) =>{
    const newCategory = await Faq.createNew({ id: item.id, name: item.name, 
      icon: item.icon, active:item.active })
      return newCategory
  })
  return faqs;
}

type TFaq = {
  sections: {
    id: number,
    name: string,
    icon: string,
    active:boolean,
    faq: {
      id:number,
      faqId:number,
      Question: string,
      Answer: string
    }[]
  }[]
}

export const FaqList: TFaq = {
  "sections": [
    {
        "id": 1,
        "name": "My e-Bike",
        "icon": "https://zelp-motovolt-app-faq-images.s3.us-east-2.amazonaws.com/faq/eBikeIcon.png",
        "faq": [
            {
                "id": 1,
                "faqId":1,
                "Question": "What is fascinating about my Motovolt e-Bike?",
                "Answer": "Electric bikes are incredibly fun and convenient to ride. Electric bikes give you three modes to ride: Pedal, Motor and Pedal Assist. e-Bicycles are eco-friendly and they require less physical exertion compared to regular cycles. On top of this, you save money on fuel and maintenance.",
            },
            {
                "id": 2,
                "faqId":1,
                "Question": "I like riding my conventional bicycle, why would I need an electric bicycle?",
                "Answer": "You may find that adding an e-Bicycle to your line up of bikes expands what you can do with a bicycle. For instance, with an e-Bicycle you can take the kids to school, commute to work, pick up groceries, and enjoy a nice bike ride at the end of a long work day. e-Bicycles give you the option to cycling in the traditional form or using the motor. Thus, it lessens the physical exertion and saves time especially if you are using it to commute daily for work or errands. They are also built with more load bearing capacity than regular cycles."
            },
            {
                "id": 3,
                "faqId":1,
                "Question": "What is the difference between an Electric Bicycle and Electric Scooter?",
                "Answer": "Electric Bicycle are non-geared two-wheelers that work like a regular scooter on electricity. The components and other electrical parts all covered that give the rider a maximum speed of 25 kmph. However, e-cycles ride at a speed up to 25km/hr. One also does not need any license or any form of registration to ride a e-cycle."
            },
            {
                "id": 4,
                "faqId":1,
                "Question": "How much does an e-Bicycle weight? and how much weight it can carry?",
                "Answer": "Our e-Bicycle is weighing about 16 Kgs and able to carry additional 125 Kgs, including rider. (in case of HUM)."
            },
            {
                "id": 5,
                "faqId":1,
                "Question": "Can I retrofit any other motor or battery or modify my e-Bicycle?",
                "Answer": "No, you cannot do this type of modification on our e-Bicycle."
            },
            {
                "id": 6,
                "faqId":1,
                "Question": "In case tire puncture, can this be repaired by conventional way?",
                "Answer": "Yes, tires used in these e-Bicycles are similar to conventional cycle."
            },
            {
                "id": 7,
                "faqId":1,
                "Question": "What accessories are compatible with my e-bike?",
                "Answer": "Around 16 Accessories are readily available for use. Use our accessories section to choose them. Motovolt e-cycles come with a wide range of accessories to choose from as per your requirement. Visit the accessories section on our website or visit your nearest Motovolt Showroom to check them out."
            }
        ],
        "active": true,
    },
    {
        "id": 2,
        "name": "Legal",
        "icon": "https://zelp-motovolt-app-faq-images.s3.us-east-2.amazonaws.com/faq/legalIcon.png",
        "faq": [
            {
                "id": 8,
                "faqId":2,
                "Question": "Do I need to have driving license or any official documents to use this on Road?",
                "Answer": "No, our e-Bicycle do not warrant any official papers or license issue by the road authorities."
            },
            {
                "id": 9,
                "faqId":2,
                "Question": "Does e-Bicycle need registration?",
                "Answer": "No registration is required under the motor vehicle act."
            },
            {
                "id": 10,
                "faqId":2,
                "Question": "Is it legal for a minor to ride it on the roads?",
                "Answer": "Yes, it is just like a normal bicycle. However, care must be taken as this cycle is powered by battery and can reach speeds up to 25kmph."
            }
        ],
        "active": true,
    },
    {
        "id": 3,
        "name": "Service",
        "icon": "https://zelp-motovolt-app-faq-images.s3.us-east-2.amazonaws.com/faq/serviceIcon.png",
        "faq": [
            {
                "id": 11,
                "faqId":3,
                "Question": "How often does the Bike need servicing?",
                "Answer": "Unlike petrol based vehicles, this product doesn’t need any fixed servicing. One requires to maintain tyre pressure and greasing of the chain for smooth running like a regular cycle. Our e-Bicycle is maintenance Free. However, Health check-up are Scheduled."
            },
            {
                "id": 12,
                "faqId":3,
                "Question": "Does my e-Bicycle come with a user manual?",
                "Answer": "Yes, your e-Bicycle come with User manual, which gives you all the information related to vehicle use, ride, safety, service & warranty."
            },
            {
                "id": 13,
                "faqId":3,
                "Question": "In case of damage, where do I get spare parts?",
                "Answer": "Our spare parts will be available at our Dealer and Showrooms in addition to the convenience of online purchase."
            },
            {
                "id": 14,
                "faqId":3,
                "Question": "Can I wash my e-Bicycle with water?",
                "Answer": "Yes, you can wash your e-Bicycle with water but NO high pressure should be used."
            }
        ],
        "active": true,
    },
    {
        "id": 4,
        "name": "Safety",
        "icon": "https://zelp-motovolt-app-faq-images.s3.us-east-2.amazonaws.com/faq/safetyIcon.png",
        "faq": [
            {
                "id": 15,
                "faqId":4,
                "Question": "Does law mandate for a helmet to ride?",
                "Answer": "No, but for your safety, we strictly recommend that you wear when you ride."
            },
            {
                "id": 16,
                "faqId":4,
                "Question": "Can I ride my e-Bicycle in the monsoons?",
                "Answer": "Yes, you can ride your e-Bicycle in monsoon. You have to take some precautions like you should not ride in deep water. After riding, the e-Bicycle should be parked in a dry place or under covered place. After the ride, make sure the e-Bicycle and components are kept dry."
            },
            {
                "id": 17,
                "faqId":4,
                "Question": "How to trace e-Bicycle in the event of theft?",
                "Answer": "Our Telematics unit with GPS will detect the location of e-Bicycle."
            },
            {
                "id": 18,
                "faqId":4,
                "Question": "Will the lights still work if the battery is dead?",
                "Answer": "Yes. The battery management systems stop the motor from drawing power when the battery’s capacity reaches a certain point, but there is still power available to operate the lights."
            },
            {
                "id": 19,
                "faqId":4,
                "Question": "Is there a chance to get an electric shock while using this product or while charging the battery?",
                "Answer": "No there is no chance of electric shock while using the product."
            }
        ],
        "active": true,
    },
    {
        "id": 5,
        "name": "Ride",
        "icon": "https://zelp-motovolt-app-faq-images.s3.us-east-2.amazonaws.com/faq/rideIcon.png",
        "faq": [
            {
                "id": 20,
                "faqId":5,
                "Question": "Can I ride an e-bicycle as a regular cycle - without the electric power?",
                "Answer": "Yes. And it is easy to switch back and forth. For example, you might want to use the power only when you are going up hills."
            },
            {
                "id": 21,
                "faqId":5,
                "Question": "How do you turn the vehicle on/off?",
                "Answer": "Power switch on the side of the battery that serves as the on/off switch for the whole system."
            },
            {
                "id": 22,
                "faqId":5,
                "Question": "Throttle or Pedal Assist; which is the best?",
                "Answer": "It depends on your riding preference. Some people like throttle because it allows them to ride along with or without pedalling. Riding with Pedal assist provides additional acceleration and people who are used to riding conventional cycles tend to prefer this mode."
            },
            {
                "id": 23,
                "faqId":5,
                "Question": "What happens if I forget to switch off the vehicle?",
                "Answer": "Your e-Bike consumes very low Idle power while it is idle. But idling for long time can drain the battery. "
            },
            {
                "id": 24,
                "faqId":5,
                "Question": "Do I need to pedal an e-cycle?",
                "Answer": "All e-cycles come with the 3 riding options. The rider can choose to pedal like a regular cycle. He can also use the pedal-assist mode where he can pedal with the help of the moto or he can choose not to pedal and only depend on the motor to ride."
            },
            {
                "id": 25,
                "faqId":5,
                "Question": "What is pedal assist feature?",
                "Answer": "Pedal assist, is a mode on your e-cycle where you can take help of the power of the motor while pedalling physically. This ensures you get more speed but your physical exertion is less."
            },
            {
                "id": 26,
                "faqId":5,
                "Question": "Can I climb flyovers on my e-Bike?",
                "Answer": "Yes. The pedal assist mode and full throttle mode ensures ease of riding on any inclined path be it flyovers or uphill roads."
            }
        ],
        "active": true,
    },
    {
        "id": 6,
        "name": "Battery",
        "icon": "https://zelp-motovolt-app-faq-images.s3.us-east-2.amazonaws.com/faq/batteryIcon.png",
        "faq": [
            {
                "id": 27,
                "faqId":6,
                "Question": "How long does it take to recharge the battery?",
                "Answer": "Depends on the battery and charger size, it would be between 3 to 6 Hours."
            },
            {
                "id": 28,
                "faqId":6,
                "Question": "What sort of charging point do I need to recharge?",
                "Answer": "You can charge our e-Bicycle with 5 Amps Electrical wall socket."
            },
            {
                "id": 29,
                "faqId":6,
                "Question": "How much does it cost to charge the battery?",
                "Answer": "In general, it will cost you Rs.2 to Rs.3 to charge full an electric bike battery pack. This is considering Rs.5 per Electric unit. With this in mind, most employers will not mind if you change your battery at work. On an average, if you charge the battery 4 times (travel 100+ kms), you would incur an electricity bill of 1 unit (Rs5) which is quite less."
            },
            {
                "id": 30,
                "faqId":6,
                "Question": "Can I charge my battery off line? Can I remove the battery from the cycle to charge?",
                "Answer": "Yes, Battery can be charged off line on your office Desk. We have removable batteries for 2 of our models – HUM and KIVO. This battery can be charged anywhere – office/home/public spaces.  Ice however comes with a fixed battery."
            },
            {
                "id": 31,
                "faqId":6,
                "Question": "Can I charge the battery by pedalling?",
                "Answer": "No, it does not charge during pedalling., Pedalling is used normally to climb up hill and for increasing mileage."
            },
            {
                "id": 32,
                "faqId":6,
                "Question": "How often I should charge the battery?",
                "Answer": "Well, it depends upon your travel plan and state of charge. Otherwise, it is recommended to charge battery full once in a week if not in use."
            },
            {
                "id": 33,
                "faqId":6,
                "Question": "How many charge cycles can I get out of a battery?",
                "Answer": "Batteries can deliver up to 1000 charge cycles."
            },
            {
                "id": 34,
                "faqId":6,
                "Question": "Can I lock the battery?",
                "Answer": "Yes, the battery is locked to the bike and a key must be used to remove it."
            },
            {
                "id": 35,
                "faqId":6,
                "Question": "Should I completely drain the battery before charging?",
                "Answer": "Not required. It is recommended that you top up batteries even if you have travelled only 10 Kms."
            },
            {
                "id": 36,
                "faqId":6,
                "Question": "How long I can I keep the e-Bicycle Idle? ",
                "Answer": "e-Bicycle can be kept Idle about a month. Provided, charge the battery full before idling. Re Charge the battery again before resuming the drive after long Idle."
            },
            {
                "id": 37,
                "faqId":6,
                "Question": "Can I charge my e-Bicycle if I stay on the 1st Floor?",
                "Answer": "Yes, you can charge our e-Bicycle with extension box. If you are using HUM or KIVO you can remove the battery and carry it to your house or office to charge. In case of ICE the battery cannot be removed. However, being a foldable cycle it is easy to carry ICE inside and charge."
            },
            {
                "id": 38,
                "faqId":6,
                "Question": "What if I lose my battery key?",
                "Answer": "Battery replacement keys are available through your local Dealer / Show rooms."
            },
            {
                "id": 39,
                "faqId":6,
                "Question": "How does one take the battery out from inside the downtube?",
                "Answer": "Key off, unfold, lift the seat and pull through battery Handle. Refer user guide for more information."
            }
        ],
        "active": true,
    },
    {
        "id": 7,
        "name": "Smart Hacks",
        "icon": "https://zelp-motovolt-app-faq-images.s3.us-east-2.amazonaws.com/faq/smartHacksIcon.png",
        "faq": [
            {
                "id": 40,
                "faqId":7,
                "Question": "Take advantage of the Pedal Assist Mode",
                "Answer": "Pedalling is easier on an e-bike. Riding in pedalling assist mode makes you feel powerful and can help accelerate the bike. But, make sure you practice enough before accelerating. Great fun comes with greater responsibility!"
            },
            {
                "id": 41,
                "faqId":7,
                "Question": "With pedal assist, you seldom get tired",
                "Answer": "We assure you, you are going to start riding even more. If you have an e-cycle, you can continue riding along giving your exhausted legs the much-needed break. You can also go faster, which will not only save time but also brace you for longer trips."
            },
            {
                "id": 42,
                "faqId":7,
                "Question": "Your e-Bike keeps you fit",
                "Answer": "Get ready for healthier days. With your daily dose of exercise in check, you can look forward to potentially fewer sick days and improved mental and physical health. Practicing braking is essential. One should always slow down sooner in the starting, especially if you are getting used to riding an e-cycle. Because safety comes first, always!"
            },
            {
                "id": 43,
                "faqId":7,
                "Question": "A word of caution",
                "Answer": "Be mindful of your speed and your surroundings, more so when you are riding on a busy street. We need to remember the standard road rules continue to apply and stand true when you are riding an e-cycle. One of the most important rules, ALWAYS WEAR A HELMET!"
            }
        ],
        "active": true,
    }
]
}

