// const jwt = require('jsonwebtoken');
import React from 'react';
import TableButton from '../../Components/TableButton';

const defaultState = {
  bookingHeader: ['User Email', 'Booking Id', 'Booking Date', 'Hotel Name', 'City', 'Check-in Date', 'Check-out Date', 'Amount', 'Number of rooms', 'Number of guests', 'Status', 'Cancel'],
  bookingData: [],
  bookingColumns: 'email.bookingid.bookingdate.hotelname.city.checkin.checkout.amount.numofrooms.numofguests.status.cancel',
};

const bookingReducer = (prevState = defaultState, action) => {
  switch (action.type) {
    case 'getBookings': {
      const dataWithStrings = action.payload.bookings;
      console.log('THE BOOKING DATA IS: ', action.payload.bookings);
      for (let i = 0; i < dataWithStrings.length; i += 1) {
        let cancelled = false;
        // console.log(dataWithStrings[i].status);
        dataWithStrings[i].status = dataWithStrings[i].status.toLowerCase();
        if (dataWithStrings[i].status === 'cancelled') cancelled = true;
        dataWithStrings[i].cancel = (
          <TableButton
            class="Cancel"
            disable={cancelled}
            email={dataWithStrings[i].bookingid}
            imgSrc="/cancel.png"
            alt="Cancel"
          />);
      }
      return {
        ...prevState,
        bookingData: dataWithStrings,
      };
    }
    case 'bookingCancel': {
      console.log('bookingcancel fired!');
      const modifiedData = prevState.bookingData.slice();
      for (let i = 0; i < prevState.bookingData.length; i += 1) {
        if (modifiedData[i].bookingid === action.payload.bookingId) {
          console.log('Booking id matched!');
          modifiedData[i].status = 'cancelled';
          // userData[i].suspended = 'true';
        }
      }
      console.log('Modifiedd data is: ', modifiedData);
      return {
        ...prevState,
        bookingData: modifiedData,
      };
    }
    default: {
      return prevState;
    }
  }
};
export default bookingReducer;
