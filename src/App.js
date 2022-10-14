import { useState } from 'react';
import { useForm } from 'react-hook-form';
import './App.css';

function App() {
  const [state, setState] = useState([]);
  const { register, handleSubmit, formState: { errors },reset } = useForm();

  function onSubmit(data) {
    const datas = {
      id: Math.floor(Math.random() * 1000),
      name: data.firstName,
      email: data.email,
      password: data.password
    }
    setState((dat => {
      return [datas, ...dat]
    }))
   reset();
    // console.log(datas)
  }

  function deleted(id) {
    setState((dat => dat.filter(dataa => dataa.id !== id)))
  }

  return (
    <div className="App">

      <form onSubmit={handleSubmit(onSubmit)}>

        <h2>Sign Up</h2>

        <div>
          <input
            type="text"
            placeholder='Name'
            {...register('firstName',
              { required: "Name required", minLength: { value: 4, message: "minimum 4 characters" } })} />
          {errors?.firstName && <p>{errors.firstName.message}</p>}
        </div>

        <div>
          <input
            type="email"
            placeholder='Email Address'
            {...register("email", { required: "Email required" })} />
          {errors?.email && <p>{errors.email.message}</p>}
        </div>

        <div>
          <input
            type="password"
            placeholder='password '
            {...register("password",
              { required: "Password required", minLength: { value: 4, message: "minimum 4 Characters" } })} />
          {errors?.password && <p>{errors.password.message}</p>}
        </div>

        <div>
          <input type="submit" value='Submit' />
        </div>

      </form>
      {state.map((dat, index) =>
        <div key={index} id="map">
          <span>{dat.name}</span>
          <span>{dat.email}</span>
          <span>{dat.password}</span>
          <button onClick={() => deleted(dat.id)}>delete</button>
        </div>)}
    </div>
  );
}

export default App;