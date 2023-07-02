import React, {useState} from "react";
import DatePicker from "react-datepicker";
import { Box } from "@chakra-ui/react";

import "react-datepicker/dist/react-datepicker.css";

function DateTimePicker () {
const [selectedDateTime, setSelectedDateTime] = useState(null)
  return (
    <Box>
      <DatePicker
        selected={selectedDateTime}
        onChange={date => setSelectedDateTime(date)}
        showTimeSelect
        minDate = {new Date()}
        showYearDropdown
        showMonthDropdown
        scrollableMonthYearDropdown
        isClearable
        />
    </Box>
  );
};

export default DateTimePicker;
