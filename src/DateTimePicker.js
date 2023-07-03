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
      timeFormat="HH:mm"
      timeIntervals={5}
      timeCaption="Time"
      dateFormat="MMMM d, yyyy"
    />
  );
};


export default DateTimePicker;
