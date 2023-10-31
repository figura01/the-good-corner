export function ConvertPriceToFrEuro(price: number)  {
    return new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(price);
}