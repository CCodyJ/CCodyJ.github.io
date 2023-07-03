import React from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const DateTimePicker = ({ selected, onChange }) => {
  const handleDateTimeChange = (date) => {
    onChange(date); // Pass the selected date and time to the onChange function
  };

  return (
    <DatePicker
      selected={selected}
      onChange={handleDateTimeChange}
      showTimeSelect
      timeFormat="HH:mm"
      timeIntervals={5}
      timeCaption="Time"
      dateFormat="MMMM d, yyyy h:mm aa"
    />
  );
};


export default DateTimePicker;
