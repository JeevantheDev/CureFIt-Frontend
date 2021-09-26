import InputAdornment from '@material-ui/core/InputAdornment';
import TextField from '@material-ui/core/TextField';
import Search from '@material-ui/icons/Search';
import React, { useContext, useEffect, useState } from 'react';

import { AppContext } from '../../../app/context/app.context';
import { TABLE_ROWS } from '../../../app/entity/constant';
import { CustomTableLists } from '../../../components/CustomTableLists/CustomTableLists';
import { PatientsList } from '../../../components/CustomTableLists/PatientsList/PatientsList';
import { ServiceHeader } from '../../../components/shared/ServiceHeader/ServiceHeader';
import { UserContext } from '../../userScreen/context/user.context';

const Patients = () => {
  const {
    userState: [currentAuthUser],
  } = useContext(AppContext);
  const { getAppointmentsAction } = useContext(UserContext);

  const [patient_name, setPatientName] = useState('');

  useEffect(() => {
    getAppointmentsAction({ by_doctor: currentAuthUser._id, patient_name });
  }, [patient_name]);

  const handleKeyEnter = (event) => {
    event.preventDefault();
    if (event.key !== 'Enter') return;
    setPatientName(event.target.value);
  };

  return (
    <div>
      <ServiceHeader title="Your Patients">
        <TextField
          name="patient_name"
          size="small"
          variant="outlined"
          color="secondary"
          placeholder="search name"
          onKeyUp={handleKeyEnter}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search color="secondary" />
              </InputAdornment>
            ),
          }}
        />
      </ServiceHeader>
      <CustomTableLists tableRows={TABLE_ROWS.PATIENT_LIST}>
        <PatientsList />
      </CustomTableLists>
    </div>
  );
};

// eslint-disable-next-line import/no-default-export
export default Patients;
