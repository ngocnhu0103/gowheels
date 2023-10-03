

export const formartVnd = (money) => new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(money * 1000);