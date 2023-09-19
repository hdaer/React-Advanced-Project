import DatePicker from "react-date-picker";
import "react-date-picker/dist/DatePicker.css";
import "react-calendar/dist/Calendar.css";

// https://github.com/wojtekmaj/react-date-picker/blob/main/packages/react-date-picker/README.md

export const MyDatePicker = ({ dateValue, setDateValue }) => {
  return (
    <>
      <DatePicker
        onChange={(date) => setDateValue(date)}
        clearIcon={null}
        calendarIcon={null}
        value={dateValue}
        locale="en-DE"
        format="dd/MM/yyyy"
        name="date"
      />
    </>
  );
};
