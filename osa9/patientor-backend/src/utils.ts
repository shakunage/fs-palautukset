import { NewPatient, Gender, Entry, HealthCheckRating, NewEntryHospital, NewEntryHealthCheck, NewEntryOccupational } from './types';

const isString = (text: unknown): text is string => {
    return typeof text === 'string' || text instanceof String;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isGender = (param: any): param is Gender => {
    return Object.values(Gender).includes(param);
  };

const isDate = (date: string): boolean => {
    return Boolean(Date.parse(date));
};

const parseName = (name: unknown): string => {
    if (!name || !isString(name)) {
      throw new Error('Incorrect or missing name');
    }
    return name;
};

const parseDob = (dateOfBirth: unknown): string => {
    if (!dateOfBirth || !isString(dateOfBirth) || !isDate(dateOfBirth)) {
        throw new Error('Incorrect or missing date of birth: ' + dateOfBirth);
    }
    return dateOfBirth;
  };

const parseSsn = (ssn: unknown): string => {
    if (!ssn || !isString(ssn)) {
      throw new Error('Incorrect or missing SSN');
    }
    return ssn;
};

const parseGender = (gender: unknown): Gender => {
    if (!gender || !isGender(gender)) {
      throw new Error('Incorrect or missing gender');
    }
    return gender;
};

const parseOccupation = (occupation: unknown): string => {
    if (!occupation || !isString(occupation)) {
      throw new Error('Incorrect or missing occupation');
    }
    return occupation;
};

const parseString = (string: unknown): string => {
  if (!string || !isString(string)) {
    throw new Error('Incorrect or missing property or properties');
  }
  return string;
};

const parseEntryTypeHospital = (type: unknown): "Hospital" => {
  if (!type || !isString(type)) {
    throw new Error('Incorrect or missing entry type');
  }
  if (type !== "Hospital") {
    throw new Error('Incorrect or missing entry type');
  }
  return type;
};

const parseEntryTypeHealthCheck = (type: unknown): "HealthCheck" => {
  if (!type || !isString(type)) {
    throw new Error('Incorrect or missing entry type');
  }
  if (type !== "HealthCheck") {
    throw new Error('Incorrect or missing entry type');
  }
  return type;
};

const parseEntryTypeOccupational = (type: unknown): "OccupationalHealthcare" => {
  if (!type || !isString(type)) {
    throw new Error('Incorrect or missing entry type');
  }
  if (type !== "OccupationalHealthcare") {
    throw new Error('Incorrect or missing entry type');
  }
  return type;
};



const parseEntries = (entries: unknown): Entry[] => {

  if (!entries || !Array.isArray(entries)) {
      throw new Error('Incorrect or missing entry type');
    }

  if (!entries.map(e => (isString(e)))) {
      throw new Error('Incorrect or missing entry type');
    }
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return entries;
};

const parseCodes = (codes: unknown): string[] => {

  if (!codes) {
    return [];
  }

  if (!Array.isArray(codes)) {
      throw new Error('Incorrect or missing codes');
    }

  if (!codes.map(e => (isString(e)))) {
      throw new Error('Incorrect or missing codes');
    }
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  return codes;
};

interface Discharge {
  date: string,
  criteria: string
}

const parseDischarge = (discharge: unknown): Discharge => {

  if (!discharge || !(Object.prototype.hasOwnProperty.call(discharge, "date")) || !(Object.prototype.hasOwnProperty.call(discharge, "criteria"))) {
      throw new Error('Incorrect or missing entry type');
    }

  return discharge as Discharge;
};

interface SickLeave {
  startDate: string,
  endDate: string
}

const parseSickLeave = (sickleave: unknown): SickLeave | undefined => {

  if (!sickleave) {
    return undefined;
  }

  if (!(Object.prototype.hasOwnProperty.call(sickleave, "startDate")) || !(Object.prototype.hasOwnProperty.call(sickleave, "endDate"))) {
      throw new Error('Incorrect or missing sick leave');
    }

  return sickleave as SickLeave;
};

const parseHealthCheckRating = (rating: unknown): HealthCheckRating => {

  if (!rating) {
      throw new Error('Missing health check rating type');
    }

    if (rating !== 0 && rating !== 1 && rating !== 2 && rating !== 3 ) {
      throw new Error('Incorrect or missing health check rating type');
    }

  return rating === 0
  ? HealthCheckRating.Healthy
  : rating === 1
  ? HealthCheckRating.LowRisk
  : rating === 2
  ? HealthCheckRating.HighRisk
  : HealthCheckRating.CriticalRisk;
};

type PatientFields = { name: unknown, dateOfBirth: unknown, ssn: unknown, gender: unknown, occupation: unknown, entries: unknown };

export const toNewPatientEntry = ({ name, dateOfBirth, ssn, gender, occupation, entries } : PatientFields): NewPatient => {

  const newEntry: NewPatient = {
    name: parseName(name),
    dateOfBirth: parseDob(dateOfBirth),
    ssn: parseSsn(ssn),
    gender: parseGender(gender),
    occupation: parseOccupation(occupation),
    entries: parseEntries(entries)
  };

  return newEntry;
};

type EntryFieldsHospital = { date: unknown, specialist: unknown, description: unknown, diagnosisCodes: unknown, type: unknown, discharge: unknown};

export const toNewHospitalEntry = ({ date, specialist, description, diagnosisCodes, type, discharge } : EntryFieldsHospital): NewEntryHospital => {

  const newEntry: NewEntryHospital = {
    date: parseDob(date),
    specialist: parseString(specialist),
    description: parseString(description),
    diagnosisCodes: parseCodes(diagnosisCodes),
    type: parseEntryTypeHospital(type),
    discharge: parseDischarge(discharge)
  };
  return newEntry;
};

type EntryFieldsHealthCheck = { date: unknown, specialist: unknown, description: unknown, diagnosisCodes: unknown, type: unknown, healthCheckRating: unknown};

export const toNewHealthCheckEntry = ({ date, specialist, description, diagnosisCodes, type, healthCheckRating } : EntryFieldsHealthCheck): NewEntryHealthCheck => {

  const newEntry: NewEntryHealthCheck = {
    date: parseDob(date),
    specialist: parseString(specialist),
    description: parseString(description),
    diagnosisCodes: parseCodes(diagnosisCodes),
    type: parseEntryTypeHealthCheck(type),
    healthCheckRating: parseHealthCheckRating(healthCheckRating)
  };
  return newEntry;
};

type EntryFieldsOccupational = { date: unknown, specialist: unknown, description: unknown, diagnosisCodes: unknown, type: unknown, employerName: unknown, sickLeave: unknown};

export const toOccupationalEntry = ({ date, specialist, description, diagnosisCodes, type, employerName, sickLeave } : EntryFieldsOccupational): NewEntryOccupational => {
  
  const newEntry: NewEntryOccupational = {
    date: parseDob(date),
    specialist: parseString(specialist),
    description: parseString(description),
    diagnosisCodes: parseCodes(diagnosisCodes),
    type: parseEntryTypeOccupational(type),
    employerName: parseString(employerName),
    sickLeave: parseSickLeave(sickLeave)
  };
  return newEntry;
};




  

  

  
