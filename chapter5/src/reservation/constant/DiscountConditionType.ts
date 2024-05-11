export const DiscountConditionType = {
    Sequence: 'SEQUENCE',
    Period: 'PERIOD',
} as const;
export type DiscountConditionType = typeof DiscountConditionType[keyof typeof DiscountConditionType];