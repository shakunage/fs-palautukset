import patients from '../../data/patients';
import { PublicPatient, NewPatient, Patient, NewEntryHospital, NewEntryOccupational, NewEntryHealthCheck } from '../types';
import {v1 as uuid} from 'uuid';

const getNonSensitiveEntries = (): PublicPatient[] => {
  return patients.map(({ id, name, gender, dateOfBirth, occupation }) => ({
    id,
    name,
    gender,
    dateOfBirth,
    occupation,
  }));
};

const getById = (id: string): Patient | undefined => {
  const patient =  patients.find(p => (p.id === id));
  return patient;
};

const addEntry = (entry: NewPatient): Patient => {
  const newPatientEntry = {
    id: uuid(),
    ...entry
  };
  patients.push(newPatientEntry);
  return newPatientEntry;
};

const addHospitalRecord = (entry: NewEntryHospital, id: string): Patient | undefined => {
  const patient = patients.find(p => (p.id === id));
  const newHospitalRecord = {
    id: uuid(),
    ...entry
  };
  patient?.entries.push(newHospitalRecord);
  if (patient) {
  return patient;
  } else return undefined;
};

const addHealthCheckRecord = (entry: NewEntryHealthCheck, id: string): Patient | undefined => {
  const patient = patients.find(p => (p.id === id));
  const newHealthCheckRecord = {
    id: uuid(),
    ...entry
  };
  patient?.entries.push(newHealthCheckRecord);
  if (patient) {
    return patient;
    } else return undefined;
};

const addOccupationalRecord = (entry: NewEntryOccupational, id: string): Patient | undefined => {
  const patient = patients.find(p => (p.id === id));
  const newOccupationalRecord = {
    id: uuid(),
    ...entry
  };
  patient?.entries.push(newOccupationalRecord);
  if (patient) {
    return patient;
    } else return undefined;
};

export default {
  getNonSensitiveEntries,
  addHospitalRecord,
  addOccupationalRecord,
  addHealthCheckRecord,
  addEntry,
  getById
};