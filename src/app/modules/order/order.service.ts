import QueryBuilder from "../../../helpers/QueryBuilder";
import { TOrderData } from "./order.interface";
import { OrderModel } from "./order.modal";

const createOrderDB = async (order: TOrderData) => {

    console.log(order);

    const result = await OrderModel.create(order);
    return result
}

const getAllOrderDB = async (query: Record<string, unknown>) => {

    const searchableField = ['orderNumber']
    console.log(query);

    const orderQuery = new QueryBuilder(
        OrderModel.find(), query)
        .search(searchableField)
        .filter()
        .sort()
        .paginate()
        .fields();

    const result = await orderQuery.modelQuery;
    const meta = await orderQuery.countTotal()

    const ProcessingOrderCount = await OrderModel.countDocuments({ status: 'processing' });
    const shippedOrderCount = await OrderModel.countDocuments({ status: 'shipped' });
    const deliveredOrderCount = await OrderModel.countDocuments({ status: 'delivered' });
    const cancelledOrderCount = await OrderModel.countDocuments({ status: 'cancelled' });

    return {
        meta,
        ProcessingOrderCount,
        shippedOrderCount,
        deliveredOrderCount,
        cancelledOrderCount,
        result
    };

};

const changeOrderStatusDB = async (id: string, status: string) => {
    const result = await OrderModel.findByIdAndUpdate(
        { _id: id },
        { $set: { status } },
        { new: true }
    )
    return result;
}

export const orderServices = {
    createOrderDB,
    getAllOrderDB,
    changeOrderStatusDB
}