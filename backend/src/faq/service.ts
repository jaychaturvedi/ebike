import FaqModel, { TFaq } from "./model"
import { BadRequestError } from "../error"
import FaqQnA from "../faqQnA/model"

export default class Faq {

    static async findWhere(condition: any) {
        const user = await FaqModel.findOne({ where: { ...condition } })
        if (!user) throw new BadRequestError(`faq id and name not found in record`)
        return user
    }

    static async findAll() {
        const faqs = await FaqModel.findAll({
          attributes: {exclude: ['updatedAt', 'createdAt']},
          order: [['id','ASC']],
          where:{active: true},
          include: [{
            model: FaqQnA,
            attributes: {exclude: ['updatedAt', 'createdAt', 'faqId']},
            separate:true,
            order: [['id','asc']],
            // required: true,
           }]
        })
        return faqs
    }

    static async createNew(faq: TFaq) {
        const { id, name } = faq;
        const existingFaqs = await FaqModel.findOne({ where: { id, name } })
        if (existingFaqs) { throw new BadRequestError("record with same id already exists") }
        let newFaqs
        try {

            newFaqs = await FaqModel.create(faq)
        }
        catch (e) {
            throw new BadRequestError("Unable to create record because of duplicate id or name")
        }
        // if (!newFaqs) throw new BadRequestError("Unable to create record because of duplicate id or name")
        return newFaqs;
    }

    static async update(faq: TFaq) {
        await Faq.findWhere({ id: faq.id})
        const [isUpdated, [result]] = await FaqModel.update(faq, {
            where: { id: faq.id },
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
