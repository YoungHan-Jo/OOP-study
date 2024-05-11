export const MovieType = {
    AmountDiscount: 'AMOUNT_DISCOUNT',
    PercentDiscount: 'PERCENT_DISCOUNT',
    NoneDiscount: 'NONE_DISCOUNT',
} as const;
export type MovieType = typeof MovieType[keyof typeof MovieType];
