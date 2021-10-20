import PropTypes from 'prop-types';
import React, { useContext, useState } from 'react';

import {
  createAppointment,
  deleteAppointment,
  getAppontments,
  updateAppointment,
} from '../../../app/api/appointment.api';
import { createReview, deleteReview, updateReview } from '../../../app/api/review.api';
import { getMyUserBills, getUserBillsBySeller } from '../../../app/api/product.api';
import { FormContext } from '../../../app/context/form.context';
import { ProfileContext } from '../../profileScreen/context/profile.context';

export const UserContext = React.createContext();

const UserProvider = ({ children }) => {
  const {
    editState: [isEditFlag, setIsEditFlag],
    loaderState: [submitLoader, setSubmitLoader],
    formState: [formError, setFormError],
    patientState: [selectedPatient, setSelectedPatient],
    reviewState: [selectedReview, setSelectedReview],
  } = useContext(FormContext);
  const {
    loaderState: [pageLoading, setPageLoading],
    reviewState: [reviews, setReviews],
  } = useContext(ProfileContext);

  const [appointments, setAppointments] = useState([]);
  const [orders, setOrders] = useState([]);

  const resetAppointmentState = () => {
    setAppointments(null);
  };

  // Appointment CRUD Actions
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

  // Review CRUD Actions
  const createUpdateReviewsAction = async (reviewObj) => {
    setFormError('');
    setSubmitLoader(true);
    try {
      const res = reviewObj.isEditFlag ? await updateReview(reviewObj) : await createReview(reviewObj);
      if (res.data) {
        const index = reviews.findIndex((x) => x._id === res.data._id);
        if (index !== -1) {
          const reviewList = reviews;
          reviewList[index] = res.data;
          setReviews(reviewList);
          setIsEditFlag(false);
        } else {
          setReviews((prevList) => [...prevList, res.data]);
        }
        setSelectedReview(null);
      } else {
        setFormError(res.error);
      }
      setSubmitLoader(false);
      return res.success || false;
    } catch (error) {
      setFormError(error.message || 'SOMETHING WENT WRONG');
    }
  };

  const deleteReviewAction = async (reviewId) => {
    setFormError('');
    setSubmitLoader(true);
    const res = await deleteReview(reviewId);
    if (res.data) {
      const index = reviews.findIndex((x) => x._id === res.data.id);
      if (index !== -1) {
        const reviewList = reviews;
        reviewList.splice(index, 1);
        setReviews(reviewList);
      }
    } else {
      setFormError(res.error || 'NETWORK ERROR');
    }
    setSubmitLoader(false);
  };

  // Orders by User
  const getOrdersByUserAction = async (queryObj) => {
    setPageLoading(true);
    const res = await getMyUserBills(queryObj);
    setOrders(res.data ? res.data : []);
    setPageLoading(false);
  };

  return (
    <UserContext.Provider
      value={{
        appointmentState: [appointments, setAppointments],
        orderState: [orders, setOrders],
        resetAppointmentState,
        getAppointmentsAction,
        createUpdateAppointmentAction,
        deleteAppointmentAction,
        createUpdateReviewsAction,
        deleteReviewAction,
        getOrdersByUserAction,
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
