import TimePicker from "react-time-picker";
// https://github.com/wojtekmaj/react-time-picker/blob/main/packages/react-time-picker/README.md
export const MyTimePicker = ({ name, timeValue, setTimeValue }) => {
  return (
    <div>
      <TimePicker
        onChange={(time) => setTimeValue(time)}
        value={timeValue}
        clearIcon={null}
        maxDetail={"minute"}
        format={"HH:mm"}
        isOpen={true}
        clockIcon={null}
        locale="de-DE"
        disabled={false}
        name={name}
      />
    </div>
  );
};
