import { FormInput } from './FormInput';

export enum HistoryElementType {
  VISIT = 'visit',
  FILTER = 'filter',
}

export type HistoryElement = {
  id: number;
  type: HistoryElementType;
  content?: string | FormInput;
};
