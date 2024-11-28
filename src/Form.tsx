import { useState } from "react";
import "./Form.css";

type FormProps = {
  onSubmit: (name: string, age: number) => void;
};

const Form = (props: FormProps) => {
  const [name, setName] = useState("");
  const [age, setAge] = useState(0);

  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    props.onSubmit(name, age);
  };

  return (
    <form className="forms" onSubmit={submit}>
      <div className="form">
        <label>Name: </label>
        <input 
          type={"text"}
          value={name}
          onChange={(e) => setName(e.target.value)}
        ></input>
      </div>
      <div className="form">
        <label>Age: </label>
        <input
          type={"number"}
          onChange={(e) => setAge(Number(e.target.value))}
        ></input>
      </div>
      <button className="post" type={"submit"}>POST</button>
    </form>
  );
};

export default Form;