import {FormEvent, useState} from "react";
import BreathTimer, {props as breathtimeProps} from "./BreathTimer"
import "./BreathTimerConfigerer.css"


export default function BreathTimerConfigerer() {
  const [values, setValues] = useState<breathtimeProps | undefined>(undefined);

  function handleSubmit(event: FormEvent) {
    // TODO: validation and create custom type with correct data shape
    setValues({
      // @ts-ignore
      in_time: parseFloat(event.target.in_time.value),
      // @ts-ignore
      out_time: parseFloat(event.target.out_time.value),
      // @ts-ignore
      in_hold: parseFloat(event.target.in_hold.value),
      // @ts-ignore
      out_hold: parseFloat(event.target.out_hold.value)
    })
    event.preventDefault();
  }

  if (!values) {
    return <form onSubmit={handleSubmit} className="pretty_form">
      <span className="pretty_number_input">
      <label>
        Breath in:
        </label>
        <input defaultValue={5} name="in_time"/>
        </span>
      <label className="pretty_number_input">
        Hold:
        <input defaultValue={1} name="in_hold"/>
      </label>
      <label  className="pretty_number_input">
        Breath out:
        <input defaultValue={5} name="out_time"/>
      </label>
      <label className="pretty_number_input">
        Hold:
        <input defaultValue={1} name="out_hold"/>
      </label>
      <input type="submit" value="Start" className="pretty_button"/>
    </form>;
  } else {
    console.log(values);
    return <BreathTimer in_hold={values.in_hold} out_hold={values.out_hold} in_time={values.in_time}
                        out_time={values.out_time}/>
  }
}