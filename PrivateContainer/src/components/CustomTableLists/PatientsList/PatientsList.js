import React, { useContext } from 'react';
import { CustomTableRow } from '../CustomTableRow';
import { CustomTableCell } from '../CustomTableCell';
import Skeleton from '@material-ui/lab/Skeleton';
import { APPOINTMENT_FORMAT } from '../../../app/entity/constant';
import { Button } from '@material-ui/core';
import { ProfileContext } from '../../../screens/profileScreen/context/profile.context';
import moment from 'moment';
import { FormContext } from '../../../app/context/form.context';
import ModalLayout from '../../shared/ModalLayout/ModalLayout';
import PatientInfo from '../../PatientInfo/PatientInfo';
import { UserContext } from '../../../screens/userScreen/context/user.context';

export const PatientsList = () => {
  const {
    loaderState: [pageLoading],
  } = useContext(ProfileContext);
  const {
    appointmentState: [appointments],
  } = useContext(UserContext);
  const {
    patientState: [selectedPatient, setSelectedPatient],
  } = useContext(FormContext);

  const handleCloseModal = () => {
    setSelectedPatient(null);
  };

  return (
    <>
      {!pageLoading && appointments && appointments.length === 0 && (
        <CustomTableRow>
          <p>No Patients Found</p>
        </CustomTableRow>
      )}
      {(pageLoading || !appointments ? Array.from(new Array(10)) : appointments).map((patient, idx) => (
        <CustomTableRow key={idx}>
          <CustomTableCell>
            {patient ? patient.user.user_name : <Skeleton variant="text" width={100} height={20} />}
          </CustomTableCell>
          <CustomTableCell>
            {patient ? patient.patient_name : <Skeleton variant="text" width={100} height={20} />}
          </CustomTableCell>
          <CustomTableCell>
            {patient ? patient.patient_age : <Skeleton variant="text" width={100} height={20} />}
          </CustomTableCell>
          <CustomTableCell>
            {patient ? (
              moment(patient.appointment_date).format('LL')
            ) : (
              <Skeleton variant="text" width={100} height={20} />
            )}
          </CustomTableCell>
          <CustomTableCell>
            {patient ? patient.appointment_time : <Skeleton variant="text" width={100} height={20} />}
          </CustomTableCell>
          <CustomTableCell>
            {patient ? (
              APPOINTMENT_FORMAT[patient.appointment_type]
            ) : (
              <Skeleton variant="text" width={100} height={20} />
            )}
          </CustomTableCell>
          <CustomTableCell>
            {patient ? (
              <Button
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedPatient(patient);
                }}
                color="secondary"
                variant="text"
              >
                View
              </Button>
            ) : (
              <Skeleton variant="text" width={100} height={20} />
            )}
          </CustomTableCell>
        </CustomTableRow>
      ))}
      {selectedPatient && (
        <ModalLayout title="Patient Details" open={true} handleClose={handleCloseModal}>
          <PatientInfo infoFor="user" />
        </ModalLayout>
      )}
    </>
  );
};
