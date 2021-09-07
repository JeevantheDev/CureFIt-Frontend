import React, { useContext, useEffect } from 'react';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import Search from '@material-ui/icons/Search';
import { CustomTableLists } from '../../../components/CustomTableLists/CustomTableLists';
import { ServiceHeader } from '../../../components/shared/ServiceHeader/ServiceHeader';
import { AppContext } from '../../../app/context/app.context';
import { PatientsList } from '../../../components/CustomTableLists/PatientsList/PatientsList';
import { TABLE_ROWS } from '../../../app/entity/constant';
import { UserContext } from '../../userScreen/context/user.context';

const Patients = () => {
  const {
    userState: [currentAuthUser],
  } = useContext(AppContext);
  const { getAppointmentsAction } = useContext(UserContext);

  useEffect(() => {
    getAppointmentsAction({ by_doctor: currentAuthUser._id });
  }, []);

  return (
    <div>
      <ServiceHeader title="Your Patients">
        <TextField
          size="small"
          variant="outlined"
          color="secondary"
          placeholder="search name"
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
