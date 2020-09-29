import FaqModel, { TFaq } from "./model"
import { BadRequestError } from "../error"

export default class Faq {

    static async findWhere(condition: any) {
        const user = await FaqModel.findOne({ where: { ...condition } })
        if (!user) throw new BadRequestError(`${condition} not found`)
        return user
    }

    static async findAll() {
        const faqs = await FaqModel.findAll()
        return faqs
    }

    static async createNew(faq: TFaq) {
        const { id, name } = faq;
        const existingFaqs = await FaqModel.findOne({ where: { id, name } })
        if (existingFaqs) { return await Faq.update(faq) }
        const newFaqs = await FaqModel.create(faq)
        if (!newFaqs) throw new BadRequestError("Unable to create new ")
        return newFaqs;
    }

    static async update(faq: TFaq) {
        await Faq.findWhere({ id: faq.id, name: faq.name })
        const [isUpdated, [result]] = await FaqModel.update(faq, {
            where: { id: faq.id, name: faq.name },
            returning: true
        })
        if (!isUpdated) throw new BadRequestError("No data to update")
        return result;
    }

    static async deleteWhere(condition: any) {
        const deleted = await FaqModel.destroy({
            where: { ...condition }
        });
        if (!deleted) throw new BadRequestError("No data available to delete ");
        return deleted
    }

    static async findAndCountAll(paginate: any, where: any) {
        const users = await FaqModel.findAndCountAll({ ...paginate, where })
        if (!users) throw new BadRequestError("Unable to find and count");
        return users
    }

}
