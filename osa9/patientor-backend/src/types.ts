export interface Diagnosis {
  code: string,
  name: string,
  latin?: string
}

export enum HealthCheckRating {
  "Healthy" = 0,
  "LowRisk" = 1,
  "HighRisk" = 2,
  "CriticalRisk" = 3
}

interface BaseEntry {
  id: string,
  date: string,
  specialist: string,
  description: string,
  diagnosisCodes?: string[],
}

interface OccupationalHealthCareEntry extends BaseEntry {
  type: "OccupationalHealthcare",
  employerName: string,
  sickLeave?: {
    startDate: string,
    endDate: string
  }
}

interface HospitalEntry extends BaseEntry {
  type: "Hospital",
  discharge: {
    date: string,
    criteria: string
  }
}

interface HealthCheckEntry extends BaseEntry {
  type: "HealthCheck",
  healthCheckRating: HealthCheckRating
}

export type Entry = OccupationalHealthCareEntry | HospitalEntry | HealthCheckEntry;

export enum Gender {
  Male = 'male',
  Female = 'female',
  Other = 'other'
}

export interface Patient {
  id: string;
  name: string;
  ssn: string;
  occupation: string;
  gender: Gender;
  dateOfBirth: string;
  entries: Entry[]
}

export type PublicPatient = Omit<Patient, 'ssn' | 'entries' >;

export type NewPatient = Omit<Patient, 'id'>;

export type PatientFormValues = Omit<Patient, "id" | "entries">;

export type NewEntryHospital = Omit<HospitalEntry, 'id'>;

export type NewEntryHealthCheck = Omit<HealthCheckEntry, 'id'>;

export type NewEntryOccupational = Omit<OccupationalHealthCareEntry, 'id'>;
