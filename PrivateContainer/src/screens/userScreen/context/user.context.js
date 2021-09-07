import PropTypes from 'prop-types';
import React, { useContext, useState } from 'react';

import {
  getAppontments,
  createAppointment,
  updateAppointment,
  deleteAppointment,
} from '../../../app/api/appointment.api';
import { FormContext } from '../../../app/context/form.context';
import { ProfileContext } from '../../profileScreen/context/profile.context';

export const UserContext = React.createContext();

const UserProvider = ({ children }) => {
  const {
    editState: [isEditFlag, setIsEditFlag],
    loaderState: [submitLoader, setSubmitLoader],
    formState: [formError, setFormError],
    patientState: [selectedPatient, setSelectedPatient],
  } = useContext(FormContext);
  const {
    loaderState: [pageLoading, setPageLoading],
  } = useContext(ProfileContext);

  const [appointments, setAppointments] = useState([]);

  const resetAppointmentState = () => {
    setAppointments(null);
  };

  const getAppointmentsAction = async (queryObj) => {
    setPageLoading(true);
    const res = await getAppontments(queryObj);
    setAppointments(res.data ? res.data : []);
    setPageLoading(false);
  };

  const createUpdateAppointmentAction = async (appintmentObj) => {
    setFormError('');
    setSubmitLoader(true);
    try {
      const res = appintmentObj.isEditFlag
        ? await updateAppointment(appintmentObj)
        : await createAppointment(appintmentObj);
      if (res.data) {
        const index = appointments.findIndex((x) => x._id === res.data._id);
        if (index !== -1) {
          const appointmentList = appointments;
          appointmentList[index] = res.data;
          setAppointments(appointmentList);
          setIsEditFlag(false);
        } else {
          setAppointments((prevList) => [...prevList, res.data]);
        }
        setSelectedPatient(null);
      } else {
        setFormError(res.error);
      }
      setSubmitLoader(false);
      return res.success || false;
    } catch (error) {
      setFormError(error.message || 'SOMETHING WENT WRONG');
    }
  };

  const deleteAppointmentAction = async (appointmentId) => {
    setFormError('');
    setSubmitLoader(true);
    const res = await deleteAppointment(appointmentId);
    if (res.data) {
      const index = appointments.findIndex((x) => x._id === res.data.id);
      if (index !== -1) {
        const appointmentList = appointments;
        appointmentList.splice(index, 1);
        setAppointments(appointmentList);
      }
    } else {
      setFormError(res.error || 'NETWORK ERROR');
    }
    setSubmitLoader(false);
  };

  return (
    <UserContext.Provider
      value={{
        appointmentState: [appointments, setAppointments],
        resetAppointmentState,
        getAppointmentsAction,
        createUpdateAppointmentAction,
        deleteAppointmentAction,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

UserProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

// eslint-disable-next-line import/no-default-export
export default UserProvider;
