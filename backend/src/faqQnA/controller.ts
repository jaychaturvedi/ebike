import { SupportError } from "../error";
import FaqQnA from "./service";
import {FaqList} from "../faq/controller"

export async function createNewFaqQnA(id: number,faqId: number, Question: string, Answer: string) {
  const newUpgrades = await FaqQnA.createNew({id,faqId,Question,Answer})
  if (!newUpgrades) throw new SupportError("Unable to create ")
  return newUpgrades;
}

export async function findAllUpgrades() {
  const allUpgrades = await FaqQnA.findAll()
  if (!allUpgrades) throw new SupportError("Unable to find all ")
  return allUpgrades;
}

export async function deleteUpgrade(id: number, faqId: number) {
  const allUpgrades = await FaqQnA.deleteWhere({id, faqId})
  if (!allUpgrades) throw new SupportError("Unable to delete user")
  return allUpgrades
}

export async function initNewFaqQnA() {
  const faqs = FaqList.sections.map(async (item) =>{
    const result = item.faq.map( async (item)=>{
      await createNewFaqQnA(item.id, item.faqId, item.Question, item.Answer)
      return
    })
    return item
  })
  // if (!faqs) throw new SupportError("Unable to create ")
  return faqs;
}