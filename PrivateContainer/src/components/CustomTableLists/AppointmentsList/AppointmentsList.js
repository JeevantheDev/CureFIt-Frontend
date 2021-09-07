import { Button, IconButton } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import Skeleton from '@material-ui/lab/Skeleton';
import moment from 'moment';
import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';

import { FormContext } from '../../../app/context/form.context';
import { APPOINTMENT_FORMAT } from '../../../app/entity/constant';
import { PRIVATE_APPLICATION_URL } from '../../../app/router/ApplicationRoutes';
import { ProfileContext } from '../../../screens/profileScreen/context/profile.context';
import { UserContext } from '../../../screens/userScreen/context/user.context';
import PatientInfo from '../../PatientInfo/PatientInfo';
import ModalLayout from '../../shared/ModalLayout/ModalLayout';
import { CustomTableCell } from '../CustomTableCell';
import { CustomTableRow } from '../CustomTableRow';

export const AppointmentsList = () => {
  const history = useHistory();
  const {
    loaderState: [pageLoading],
    timeSlotState: [currentSlot, setCurrentSlot],
  } = useContext(ProfileContext);
  const {
    appointmentState: [appointments],
    deleteAppointmentAction,
  } = useContext(UserContext);
  const {
    editState: [isEditFlag, setIsEditFlag],
    patientState: [selectedPatient, setSelectedPatient],
  } = useContext(FormContext);

  const handleUpdateAppointment = (appointment) => {
    setCurrentSlot({
      id: appointment.clinic._id,
      date: appointment.appointment_date,
      slot: appointment.appointment_time,
    });
    setIsEditFlag(true);
    setSelectedPatient(appointment);
    history.push(
      PRIVATE_APPLICATION_URL.PUBLIC_PROFILES_SLUG_APPOINTMENT.replace(':slug', appointment.clinic.doc_profile_id),
    );
  };

  const handleDeleteAppointment = (appointmentId) => {
    confirm('Are you sure ?') && deleteAppointmentAction(appointmentId);
  };

  const handleCloseModal = () => {
    setSelectedPatient(null);
  };

  return (
    <>
      {!pageLoading && appointments && appointments.length === 0 && (
        <CustomTableRow>
          <p>No Appointments Found</p>
        </CustomTableRow>
      )}
      {(pageLoading || !appointments ? Array.from(new Array(10)) : appointments).map((appointment, idx) => (
        <CustomTableRow key={idx}>
          <CustomTableCell>
            {appointment ? (
              <img
                style={{ borderRadius: '50%' }}
                width="40"
                height="40"
                src={appointment.doc_user.avatar}
                alt="avatar"
              />
            ) : (
              <Skeleton variant="circle" width={50} height={50} />
            )}
          </CustomTableCell>
          <CustomTableCell>
            {appointment ? appointment.doc_user.user_name : <Skeleton variant="text" width={100} height={20} />}
          </CustomTableCell>
          <CustomTableCell>
            {appointment ? appointment.patient_name : <Skeleton variant="text" width={100} height={20} />}
          </CustomTableCell>
          <CustomTableCell>
            {appointment ? appointment.patient_age : <Skeleton variant="text" width={100} height={20} />}
          </CustomTableCell>
          <CustomTableCell>
            {appointment ? (
              moment(appointment.appointment_date).format('LL')
            ) : (
              <Skeleton variant="text" width={100} height={20} />
            )}
          </CustomTableCell>
          <CustomTableCell>
            {appointment ? appointment.appointment_time : <Skeleton variant="text" width={100} height={20} />}
          </CustomTableCell>
          <CustomTableCell>
            {appointment ? (
              APPOINTMENT_FORMAT[appointment.appointment_type]
            ) : (
              <Skeleton variant="text" width={100} height={20} />
            )}
          </CustomTableCell>
          <CustomTableCell>
            {appointment ? (
              <Button
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedPatient(appointment);
                }}
                color="secondary"
              >
                View
              </Button>
            ) : (
              <Skeleton variant="text" width={100} height={20} />
            )}
          </CustomTableCell>
          <CustomTableCell>
            {appointment ? (
              <IconButton
                onClick={(e) => {
                  e.stopPropagation();
                  handleUpdateAppointment(appointment);
                }}
                color="Primary"
                variant="text"
              >
                <EditIcon />
              </IconButton>
            ) : (
              <Skeleton variant="text" width={100} height={20} />
            )}
          </CustomTableCell>
          <CustomTableCell>
            {appointment ? (
              <IconButton
                onClick={(e) => {
                  e.stopPropagation();
                  handleDeleteAppointment(appointment._id);
                }}
                color="secondary"
                variant="text"
              >
                <DeleteIcon />
              </IconButton>
            ) : (
              <Skeleton variant="text" width={100} height={20} />
            )}
          </CustomTableCell>
        </CustomTableRow>
      ))}
      {selectedPatient && !isEditFlag && (
        <ModalLayout title="Patient Details" open={true} handleClose={handleCloseModal}>
          <PatientInfo infoFor="doc_user" />
        </ModalLayout>
      )}
    </>
  );
};
