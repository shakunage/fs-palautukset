import express from 'express';
import patientService from '../services/patientService';
import { toNewPatientEntry, toNewHospitalEntry, toNewHealthCheckEntry, toOccupationalEntry } from '../utils';

const router = express.Router();

router.get('/', (_req, res) => {
    res.send(patientService.getNonSensitiveEntries());
  });

router.get('/:id', (req, res) => {
  res.send(patientService.getById(req.params.id));
});

router.post('/', (req, res) => {
  try {
    const newPatientEntry = toNewPatientEntry(req.body);
    const addedPatient = patientService.addEntry(newPatientEntry);
    res.json(addedPatient);
  } catch (e) {
    res.status(400).send(e.message);
  }
});

router.post('/:id/entries', (req, res) => {
  if (req.body.type === "Hospital") {
    try {
      const newMedicalEntry = toNewHospitalEntry(req.body);
      const addedEntry = patientService.addHospitalRecord(newMedicalEntry, req.params.id);
      res.json(addedEntry);
    } catch (e) {
      res.status(400).send(e.message + JSON.stringify(req.body));
    }
  }

  if (req.body.type === "OccupationalHealthcare") {
    try {
      const newMedicalEntry = toOccupationalEntry(req.body);
      const addedEntry = patientService.addOccupationalRecord(newMedicalEntry, req.params.id);
      res.json(addedEntry);
    } catch (e) {
      res.status(400).send(e.message + JSON.stringify(req.body));
    }
  }

  if (req.body.type === "HealthCheck") {
    try {
      const newMedicalEntry = toNewHealthCheckEntry(req.body);
      const addedEntry = patientService.addHealthCheckRecord(newMedicalEntry, req.params.id);
      res.json(addedEntry);
    } catch (e) {
      res.status(400).send(e.message + JSON.stringify(req.body));
    }
  }

});

export default router;

//utils.ts:ään useampi toNewXXXEntry riippuen mikä on tiedon tyyppi