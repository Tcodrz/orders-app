import { OrdersState } from 'src/app/state/orders/orders.rducer';
import { DateRange } from './../../shared/models/date-range.model';
import { IOrder } from './../../shared/models/order.model';
import { FilterState } from './../filters/filter.reducer';

/**
 * Adds a new order to a list
 * @param orders List of orders
 * @param order Order to add to the list
 * @returns a new list containing the new order
 */
export const add = (orders: IOrder[], order: IOrder): IOrder[] => [...orders, order];

export const addMany = (orders: IOrder[], payload: IOrder[]): IOrder[] => orders.concat(payload);

export const remove = (orders: IOrder[], order: IOrder): IOrder[] => orders.filter(x => x.id !== order.id);

export const update = (orders: IOrder[], order: IOrder): IOrder[] => orders.map(o => o.id === order.id ? Object.assign({}, order) : o);

/**
 * Sort a list of Orders by date.
 * The first order will be the most recent order
 * @param orders Currently displayed orders
 * @returns Currently displayed orders sorted by date
 */
export const sortByDate = (orders: IOrder[]): IOrder[] => [...orders]
    .sort((a, b) => parseInt(b.date.split('/')[1], 10) - parseInt(a.date.split('/')[1], 10))
    .sort((a, b) => parseInt(b.date.split('/')[0], 10) - parseInt(a.date.split('/')[0], 10))
    .sort((a, b) => parseInt(b.date.split('/')[2], 10) - parseInt(a.date.split('/')[2], 10));

/**
 * Sort a list of Orders by date.
 * The first order will be the oldest order
 * @param orders Currently displayed orders
 * @returns  Currently displayed orders sorted by date
 */
export const sortByDateReverse = (orders: IOrder[]): IOrder[] => [...orders]
    .sort((a, b) => parseInt(a.date.split('/')[1], 10) - parseInt(b.date.split('/')[1], 10))
    .sort((a, b) => parseInt(a.date.split('/')[0], 10) - parseInt(b.date.split('/')[0], 10))
    .sort((a, b) => parseInt(a.date.split('/')[2], 10) - parseInt(b.date.split('/')[2], 10));

export const sortByPrice = (orders: IOrder[]): IOrder[] => [...orders].sort((a, b) => a.price.fullPrice - b.price.fullPrice);

export const sortByPriceReverse = (orders: IOrder[]): IOrder[] => [...orders].sort((a, b) => b.price.fullPrice - a.price.fullPrice);

export const sortByStatus = (orders: IOrder[]): IOrder[] => [...orders]
    .sort((a, b) => (a.status === 'closed' ? 1 : 0) - (b.status === 'closed' ? 1 : 0))
    .sort((a, b) => (a.status === 'signed and done' ? 1 : 0) - (b.status === 'signed and done' ? 1 : 0))
    .sort((a, b) => (a.status === 'done' ? 1 : 0) - (b.status === 'done' ? 1 : 0))
    .sort((a, b) => (a.status === 'open' ? 1 : 0) - (b.status === 'open' ? 1 : 0));

export const sortByStatusReverse = (orders: IOrder[]): IOrder[] => [...orders]
    .sort((a, b) => (a.status === 'open' ? 1 : 0) - (b.status === 'open' ? 1 : 0))
    .sort((a, b) => (a.status === 'done' ? 1 : 0) - (b.status === 'done' ? 1 : 0))
    .sort((a, b) => (a.status === 'signed and done' ? 1 : 0) - (b.status === 'signed and done' ? 1 : 0))
    .sort((a, b) => (a.status === 'closed' ? 1 : 0) - (b.status === 'closed' ? 1 : 0));


/**
 * Filters all currently displayed orders using the filter object provided by the user
 * @param orders Orders List
 * @param filterObj Object containing all filters and values
 * @returns filtered orders
 */
export const filter = (orders: IOrder[], filterObj: FilterState): IOrder[] => {
    const filteredOrders = orders
        .filter(order => (filterObj.orderNumber.length > 0) ? order.id === filterObj.orderNumber : order)
        .filter(order => (filterObj.customerName.length > 0) ? order.customer.name.toLowerCase() === filterObj.customerName.toLowerCase() : order)
        .filter(order => (filterObj.advertiserName.length > 0) ? order.advertiser.name.toLowerCase() === filterObj.advertiserName.toLowerCase() : order)
        .filter(order => (filterObj.fromAmount) ? order.price.fullPrice >= filterObj.fromAmount : order)
        .filter(order => (filterObj.toAmount) ? order.price.fullPrice <= filterObj.toAmount : order)
        .filter(order => {
            let match = false;
            if (!filterObj.narratorName) {
                return order;
            }
            const narrators = order.narrators;
            narrators.forEach(narr => {
                if (narr.name.includes(filterObj.narratorName)) {
                    match = true;
                }
            });
            return match ? order : false;
        })
        .filter(order => {
            if (filterObj.dates.fromDay || filterObj.dates.fromMonth || filterObj.dates.fromYear ||
                filterObj.dates.toDay || filterObj.dates.toMonth || filterObj.dates.toYear) {
                let o = [order];
                o = filterOrdersByDate(o, filterObj.dates);
                return o.length > 0 ? order : false;

            } else { return order; }
        });

    const finalOrders: IOrder[] = [];
    filteredOrders.forEach(order => {
        if (!finalOrders.includes(order)) {
            finalOrders.push(order);
        }
    });
    return finalOrders;
};

export const handleSortOrders = (state: OrdersState, action: { payload: { sortby: string; up: boolean } }): OrdersState => {
    if (action.payload.sortby === 'date') {
        if (action.payload.up) {
            return {
                orders: state.orders,
                filteredOrders: sortByDate(state.filteredOrders),
                selectedOrderId: state.selectedOrderId
            };
        } else {
            return {
                orders: state.orders,
                filteredOrders: sortByDateReverse(state.filteredOrders),
                selectedOrderId: state.selectedOrderId
            };
        }
    }
    if (action.payload.sortby === 'price') {
        if (action.payload.up) {
            return {
                orders: state.orders,
                filteredOrders: sortByPrice(state.filteredOrders),
                selectedOrderId: state.selectedOrderId
            };
        } else {
            return {
                orders: state.orders,
                filteredOrders: sortByPriceReverse(state.filteredOrders),
                selectedOrderId: state.selectedOrderId
            };
        }
    }
    if (action.payload.sortby === 'status') {
        if (action.payload.up) {
            return {
                orders: state.orders,
                filteredOrders: sortByStatus(state.filteredOrders),
                selectedOrderId: state.selectedOrderId
            };
        } else {
            return {
                orders: state.orders,
                filteredOrders: sortByStatusReverse(state.filteredOrders),
                selectedOrderId: state.selectedOrderId
            };
        }
    }
    return {
        orders: state.orders,
        filteredOrders: state.filteredOrders,
        selectedOrderId: state.selectedOrderId
    };
};

function filterOrdersByDate(orders: IOrder[], date: DateRange): IOrder[] {
    const base10 = 10;
    let fromDay = parseInt(date.fromDay, base10);
    let fromMonth = parseInt(date.fromMonth, base10);
    let fromYear = parseInt(date.fromYear, base10);
    let toDay = parseInt(date.toDay, base10);
    let toMonth = parseInt(date.toMonth, base10);
    let toYear = parseInt(date.toYear, base10);
    let filteredOrders = [];

    if (isNaN(fromDay) || isNaN(fromMonth) || isNaN(fromYear)) {
        fromDay = 0;
        fromMonth = 0;
        fromYear = 0;
    }

    if (isNaN(toDay) || isNaN(toMonth) || isNaN(toYear)) {
        toDay = 32;
        toMonth = 13;
        toYear = 3000;
    }

    filteredOrders = orders.filter(order => {
        const orderDay = parseInt(order.date.split('/')[1], base10);
        const orderMonth = parseInt(order.date.split('/')[0], base10);
        const orderYear = parseInt(order.date.split('/')[2], base10);
        if (orderYear > fromYear) {
            if (orderYear < toYear) { return order; }
            if (orderYear === toYear && orderMonth < toMonth) { return order; }
            if (orderYear === toYear && orderMonth === toMonth && orderDay >= fromDay && orderDay <= toDay) { return order; }
        }
        if (orderYear === fromYear) {
            if (orderYear === toYear) {
                if (orderMonth > fromMonth) {
                    if (orderMonth < toMonth) { return order; }
                    if (orderMonth === toMonth && orderDay <= toDay) { return order; }
                }
                if (orderMonth === fromMonth) {
                    if (orderMonth < toMonth) { return order; }
                    if (orderMonth === toMonth && orderDay >= fromDay && orderDay <= toDay) { return order; }
                }
            }
            if (orderYear < toYear) {
                if (orderMonth >= fromMonth && orderDay >= fromDay) { return order; }
            }
        }
        return;
    });
    return filteredOrders;
}
