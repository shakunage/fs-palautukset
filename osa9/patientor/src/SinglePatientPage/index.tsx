import React from "react";
import axios from "axios";
import { apiBaseUrl } from "../constants";
import { useParams } from "react-router-dom";
import { useStateValue, setSinglePatient, setDiagnoses } from "../state";
import { Icon, Card, Button } from "semantic-ui-react";
import { Patient, Entry, NewEntryFormValues } from "../types";
import AddEntryModal from "../AddEntryModal";



const DiagnosisCodes = ({entries}: {entries: string[] | undefined}) => {
  const [state, dispatch] = useStateValue();

  const fetchDiagnoses = async () => {
    try {
      const {data: diagnosesFromApi} = await axios.get<Patient>(
        `${apiBaseUrl}/api/diagnoses`
        );
        if (Array.isArray(diagnosesFromApi))
        dispatch(setDiagnoses(diagnosesFromApi));
    } catch (e) {
      console.error(e);
    }
  };
  React.useEffect(() => {
    void fetchDiagnoses();
  }, []);

  if (!entries || !Array.isArray(state.diagnoses)) {
    return ( null );
  }

  return (
    <p>
    {entries.map(e => (
      <li key={e}>{e} {(state.diagnoses.find(d => (d.code === e)))?.name}</li>
    ))}
    </p>
  );
};


const HospitalEntry = ({entry}: {entry: Entry | undefined}) => {

  if (!entry) {
    return null;
  }

  if (!(entry.type === "Hospital")) {
    return null;
  }

  return (
    <div>
      <Card>
      <h1>{entry.date} <Icon className="hospital"></Icon></h1>
      <p></p>
      <i>{entry.description}</i>
      <br></br>
      <DiagnosisCodes entries={entry.diagnosisCodes}/>
      </Card>
    </div>
  );
};

const HealthCheckEntry = ({entry}: {entry: Entry | undefined}) => {

  if (!entry) {
    return null;
  }

  if (!(entry.type === "HealthCheck")) {
    return null;
  }

  const color = (entry.healthCheckRating === 0)
  ? "green"
  : (entry.healthCheckRating === 1)
  ? "yellow"
  : (entry.healthCheckRating === 2)
  ? "orange"
  :"red";

  console.log(color);

  return (
    <div>
      <Card>
      <h1>{entry.date} <Icon className="doctor"></Icon></h1>
        <p></p>
        <i>{entry.description}</i>
        <p></p>
        <Icon color={color} className="heart"></Icon>
        <br></br>
        <DiagnosisCodes entries={entry.diagnosisCodes}/>
      </Card>
    </div>
  );
};

const OccupationlEntry = ({entry}: {entry: Entry | undefined}) => {

  if (!entry) {
    return null;
  }

  if (!(entry.type === "OccupationalHealthcare")) {
    return null;
  }



  return (
    <div>
      <Card>
      <h1>{entry.date} <Icon className="stethoscope"></Icon> {entry.employerName}</h1>
      <p></p>
      <i>{entry.description}</i>
      <br></br>
      <DiagnosisCodes entries={entry.diagnosisCodes}/>
      </Card>
    </div>
  );
};

const SingleEntry = ({entry}: {entry: Entry | undefined}) => {

  if (!entry) {
    return null;
  }

  switch(entry.type) {
    case "Hospital": 
      return <HospitalEntry entry={entry} />;
    case "HealthCheck":
      return <HealthCheckEntry entry={entry} />;
    case "OccupationalHealthcare":
      return <OccupationlEntry entry={entry} />;
    default:
      return null; 
  }
};

const SinglePatientPage = () => {
  const [state, dispatch] = useStateValue();

  const [modalOpen, setModalOpen] = React.useState<boolean>(false);
  const openModal = (): void => setModalOpen(true);

  const [error, setError] = React.useState<string | undefined>();

  const closeModal = (): void => {
    setModalOpen(false);
    setError(undefined);
  };  

  const { id } = useParams<{ id: string }>();

  React.useEffect(() => {
    const fetchPatient = async () => {
      try {
        const { data: patientFromApi } = await axios.get<Patient>(
          `${apiBaseUrl}/api/patients/${id}`
        );
        dispatch(setSinglePatient(patientFromApi));
        console.log('patient fetched!');
      } catch (e) {
        console.error(e);
      }
    };

    if (state.singlePatient === null) {
        void fetchPatient();
    }

    if (state.singlePatient !== null) {
        if (state.singlePatient.id !== id) {
            void fetchPatient();
        }
    }
    
  }, []);

  const submitNewEntry = async (values: NewEntryFormValues) => {
    if (!state.singlePatient) {
      console.log("Error, state.singlePatient is undefined");
    } else 
    try {
      console.log(values);
      const { data: updatedPatient } = await axios.post<Patient>(
        `${apiBaseUrl}/api/patients/${state.singlePatient.id}/entries`,
        values
      );
      dispatch(setSinglePatient(updatedPatient));
      closeModal();
    } catch (e) {
      console.error(e.response?.data || 'Unknown Error');
      setError(e.response?.data?.error || 'Unknown error');
    }
  };

  console.log(state.singlePatient);


  if (state.singlePatient) {
    
    const gender = (state.singlePatient.gender === "male")
    ? "mars"
    : (state.singlePatient.gender === "female")
    ? "venus"
    : "genderless";

    return ( 
    <div>
      <h1>{state.singlePatient.name} <Icon className={gender}></Icon> </h1>
      ssn: {state.singlePatient.ssn}
      <br></br>
      occupation: {state.singlePatient.occupation}
      <br></br>
      <h1>entries</h1>
      {state.singlePatient.entries.map(e => (
        <div key={e.id}>
          <SingleEntry entry={e}/>
        </div>
      ))}
      <AddEntryModal
        modalOpen={modalOpen}
        onSubmit={submitNewEntry}
        error={error}
        onClose={closeModal}
      />
      <Button onClick={() => openModal()}>Add New Entry</Button>
    </div>
    );
  } else return (<div>not found!</div>);
};


  export default SinglePatientPage;