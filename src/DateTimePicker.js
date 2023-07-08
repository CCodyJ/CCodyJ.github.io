import React from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const DateTimePicker = ({ selected, onChange }) => {
  const handleDateTimeChange = (date) => {
    console.log("Selected DateTime:", date); 
    onChange(date);
  };

  return (
    <DatePicker
      selected={selected}
      onChange={handleDateTimeChange}
      showTimeSelect
      timeIntervals={5}
      dateFormat="MMMM d, yyyy"
      minDate={new Date()}
      timeFormat='h:m a'
    />
  );
};


export default DateTimePicker;
