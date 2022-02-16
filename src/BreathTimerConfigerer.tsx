import {FormEvent, useState} from "react";
import BreathTimer, {props as breathtimeProps} from "./BreathTimer"


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
    return <form onSubmit={handleSubmit}>
      <label>
        Breath in:
        <input defaultValue={5} name="in_time"/>
      </label>
      <label>
        hold:
        <input defaultValue={1} name="in_hold"/>
      </label>
      <label>
        Breath out:
        <input defaultValue={5} name="out_time"/>
      </label>
      <label>
        Breath hold:
        <input defaultValue={1} name="out_hold"/>
      </label>
      <input type="submit" value="Start"/>
    </form>;
  } else {
    console.log(values);
    return <BreathTimer in_hold={values.in_hold} out_hold={values.out_hold} in_time={values.in_time}
                        out_time={values.out_time}/>
  }
}