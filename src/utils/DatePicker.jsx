import { useState } from "react";
import DatePicker from "react-date-picker";
import "react-date-picker/dist/DatePicker.css";
import "react-calendar/dist/Calendar.css";

// https://github.com/wojtekmaj/react-date-picker/blob/main/packages/react-date-picker/README.md

export const MyDatePicker = ({ name }) => {
  const [value, setValue] = useState(new Date());

  const onChange = (date) => {
    setValue(() => date);
  };

  return (
    <div>
      <DatePicker
        onChange={onChange}
        clearIcon={null}
        calendarIcon={null}
        // isOpen={true}
        name={name}
        value={value}
        locale="en-DE"
        format="dd/M/yyyy"
      />
    </div>
  );
};
