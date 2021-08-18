import { State } from "./state";
import { Patient, Diagnosis } from "../types";

export type Action =
  | {
      type: "SET_PATIENT_LIST";
      payload: Patient[];
    }
  | {
      type: "ADD_PATIENT";
      payload: Patient;
    }
  | {
      type: "SET_SINGLE_PATIENT";
      payload: Patient;
  }
  | {
    type: "SET_DIAGNOSES";
    payload: Diagnosis[];
  };
 
export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "SET_PATIENT_LIST":
      return {
        ...state,
        patients: {
          ...action.payload.reduce(
            (memo, patient) => ({ ...memo, [patient.id]: patient }),
            {}
          ),
          ...state.patients
        }
      };
    case "ADD_PATIENT":
      return {
        ...state,
        patients: {
          ...state.patients,
          [action.payload.id]: action.payload
        }
      };
    case "SET_SINGLE_PATIENT":
      return {
        ...state,
        ...state.patients,
        singlePatient: action.payload
      };
    case "SET_DIAGNOSES":
      return {
        ...state,
        ...state.patients,
        diagnoses: action.payload
      };
    default:
      return state;
  }
};

export const setPatientList = (payload: Patient[]) => {
  return {type: "SET_PATIENT_LIST", payload} as const;
};

export const addPatient = (payload: Patient) => {
  return {type: "ADD_PATIENT", payload} as const;
};

export const setSinglePatient = (payload: Patient) => {
    return {type: "SET_SINGLE_PATIENT", payload} as const;
};

export const setDiagnoses = (payload: Diagnosis[]) => {
  return {type: "SET_DIAGNOSES", payload} as const;
};
