import DatePicker from "react-date-picker";
import "react-date-picker/dist/DatePicker.css";
import "react-calendar/dist/Calendar.css";

// https://github.com/wojtekmaj/react-date-picker/blob/main/packages/react-date-picker/README.md

export const MyDatePicker = ({ dateValue, setDateValue }) => {
  const handleChange = (date) => {
    const day = (date.getDate() < 10 ? "0" : "") + date.getDate();
    const month = (date.getMonth() + 1 < 10 ? "0" : "") + (date.getMonth() + 1);
    const year = date.getFullYear();
    setDateValue(`${year}-${month}-${day}`);
  };

  return (
    <>
      <DatePicker
        onChange={handleChange}
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
