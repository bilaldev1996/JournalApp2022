import React from "react";
import { useForm } from "react-hook-form";
import swal from "sweetalert";

export default function FormApp() {

    //regex email
    const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    //regex password
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm();
    const onSubmit = (data) => {
        console.log(data);
        swal("Success!", "Your form has been submitted", "success");
        //clear form
       // document.querySelector("form").reset();
    }; //Si sale bien nos muestra los datos del formulario
    console.log(errors); // Si algo sale mal nos muestra los errores del formulario

    return (
        <div className="d-grid justify-content-center">
            <h1 className="text-primary text-center">Form with React hook</h1>
            <form onSubmit={handleSubmit(onSubmit)} className="w-100 form-group">
                <input 
                    className="form-control my-2"
                    type="text"
                    autoComplete="off"
                    placeholder="email@google.com"
                    {...register("Email", { 
                        required: 'Email is required', 
                        pattern: {
                            value: emailRegex,
                            message: 'Email is not valid'
                        } 
                    })}
                />
                {errors.Email && <p className="text-danger">{errors.Email.message}</p>}
                <input 
                    type="password" 
                    autoComplete="off"
                    className="form-control my-2" 
                    placeholder="********" 
                    {...register("Password", { 
                        required: 'Password is required', 
                        pattern: {
                            value: passwordRegex,
                            message: 'Password must be at least 8 characters, contain at least one number, one uppercase and one special character'
                        }
                    })} />
                {errors.Password && <p className="text-danger">{errors.Password.message}</p>}
                <input 
                    type="submit" 
                    className="btn btn-primary"
                    value="Register"
                />
                <button 
                    className="btn btn-primary mx-2"
                    onClick={()=>{
                        reset();
                    }}
                    type="button"

                >
                    Clear form
                </button>
            </form>
        </div>
  );
}