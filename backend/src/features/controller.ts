import { SupportError } from "../error";
import Upgrades from "./service";

type TUpgrade = {
  name: string,
  icon: string,
  price: number
}[]
export async function createNewUpgrade(id: number, name: string, icon: string, price: number) {
  const newUpgrades = await Upgrades.createNew({ id, name, price, icon })
  if (!newUpgrades) throw new SupportError("Unable to create ")
  return newUpgrades;
}
export async function initNewUpgradeList() {
  const result = UpgradesList.map( async (item,index)=>{
    const newUpgrades = await Upgrades.createNew({ 
      id:index, 
      name:item.name, 
      price:item.price, 
      icon:item.icon })
    return newUpgrades
  })
  return result
}

export async function findAllUpgrades() {
  const allUpgrades = await Upgrades.findAll()
  if (!allUpgrades) throw new SupportError("Unable to find all ")
  return allUpgrades;
}

export async function deleteUpgrade(name: string) {
  const allUpgrades = await Upgrades.deleteWhere({ name })
  if (!allUpgrades) throw new SupportError("Unable to delete user")
  return allUpgrades
}
export const UpgradesList: TUpgrade = [
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