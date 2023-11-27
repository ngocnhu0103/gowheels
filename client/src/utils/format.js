

export const formartVnd = (money) => new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(money);
export const formartDiscountMoney = (space, price, weekDiscount, monthDiscount) => {
    return space >= 30
        ? price * space * (monthDiscount / 100)
        : space >= 7
            ? price * space * (weekDiscount / 100)
            : 0
}