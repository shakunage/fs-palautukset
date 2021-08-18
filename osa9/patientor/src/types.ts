export interface Diagnosis {
  code: string;
  name: string;
  latin?: string;
}

export enum Gender {
  Male = "male",
  Female = "female",
  Other = "other"
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

export interface Patient {
  id: string;
  name: string;
  occupation: string;
  gender: Gender;
  ssn?: string;
  dateOfBirth?: string;
  entries: Entry[];
}

export type PatientFormValues = Omit<Patient, "id" | "entries">;

/*
type NewEntryHospital = Omit<HospitalEntry, 'id'>;

type NewEntryHealthCheck = Omit<HealthCheckEntry, 'id'>;
*/

type NewEntryOccupational = Omit<OccupationalHealthCareEntry, 'id'>;

export type NewEntryFormValues = NewEntryOccupational;