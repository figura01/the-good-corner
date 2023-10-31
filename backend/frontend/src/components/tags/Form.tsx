import { axiosInstance } from "@/lib/axiosInstance";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const schema = yup
  .object({
    name: yup.string().required(),
  })
  .required()

export default function Form() {
    // form validation rules 
    const validationSchema = yup.object().shape({
        name: yup.string().min(5, 'Nombre minimum de Carataire est de 5').required('Le nom est requis!')
    });
    const formOptions = { resolver: yupResolver(validationSchema) };    

    // get functions to build form with useForm() hook
    const { register, handleSubmit, setError, formState } = useForm(formOptions);
    const { errors, isSubmitting } = formState;

    const onSubmit = ( data: any) => {
        console.log(data)

        axiosInstance.post("/tags/create", data)
        .then((response: any) => console.log(response))
        .catch((err: any) => {
            console.log('catch from error: ', err)
        })
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <input type="text" {...register('name')} className={`form-control ${errors.name ? 'is-invalid' : ''}`} />
            <div className="invalid-feedback">{errors.name?.message}</div>

            <input type="submit" />
        </form>
    )
}

