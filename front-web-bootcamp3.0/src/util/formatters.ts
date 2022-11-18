export const formatPrice = (price: number) => {
    const parans = {
        maximumFractionDigits: 2,
        minimumFractionDigits: 2,
    };

    return new Intl.NumberFormat('pt-BR', parans).format(price);
}