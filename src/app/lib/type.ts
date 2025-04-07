export type SLUG_TYPE = "Create" | number;
export interface OPTIONS {
  value: string | number;
  label: string;
}

export interface ProgramCode {
  Code: string;
  SelectedProgramId: number;
  EnrollmentCount: number;
  IsSelected: boolean;
  Strm: string;
  Career?: string;
}
