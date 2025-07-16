export type TTimeType = 'timestamp' | 'date';

export type TGetTimeType<GTime extends TTimeType = 'date'> = GTime extends 'date' ? Date : number;
