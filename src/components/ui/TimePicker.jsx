import { useState } from "react";
import TimePicker from "react-time-picker";

// https://github.com/wojtekmaj/react-time-picker/blob/main/packages/react-time-picker/README.md

export const MyTimePicker = ({ name }) => {
  const [value, setValue] = useState(new Date());

  const onChange = (time) => {
    setValue(() => time);
  };

  return (
    <div>
      <TimePicker
        onChange={onChange}
        value={value}
        clearIcon={null}
        maxDetail={"minute"}
        isOpen={true}
        clockIcon={null}
        locale="de-DE"
        name={name}
        disabled={false}
      />
    </div>
  );
};
