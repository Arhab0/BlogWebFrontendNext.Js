export type center = {
    label: string;
    value: string;
}

export type DivTagProps = {
    value: Date;
    bgColor: string;
    calendar: boolean;
    primaryColor: string;
    secondarycolor: string;
    heading?: string;
    hrBorder?: string;
    percentage?: string;
    dropdownField: boolean;
    dropdownValues?: center[];
    activeIdDropdown?: number;
    enrollment: number;
    attendance: number;
    region?: string;
    scannigHub?: string;
    absent:number;
    setValue?: (date: string) => void;
    setActiveCenter?: (id: number) => void;
}