export interface LenderProfile {
    id?: string;
    name: string;
    category: string;
    description: string;
    email: string;
    mobile: number;
    physicalAddress: string;
    postalAddress: string;
}

export interface LenderAccount {
    accountNumber?: string;
    description: string;
    amount: number;
    startDate: Date;
    contractEndDate: Date;
    actualEndDate: Date;
    monthlyInterest: number;
    totalPayable: number;
    repaymentSchedule: string;
    repaymentAmount: number;
    lenderProfileId?: string;
}
