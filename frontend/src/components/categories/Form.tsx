// import {useState} from 'react'
// import { axiosInstance } from '@/lib/axiosInstance';
// import styles from "@/styles/components/categories/FormCategory.module.css";
// import { ICategoryForm } from '@/types/categories';

// export default function FormCategory() {
//     const [formData, setFormData] = useState<ICategoryForm>({} as ICategoryForm);

    

//     return <form className={styles["form"]}>
//         <div className={styles["form-group"]}>
//             <label htmlFor="#name">Nom</label>
//             <input type="text" name="name" value={formData.name}/>
//         </div>
//         <button type="submit">Créer</button>
//     </form>
// }

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { ErrorMessage } from '@hookform/error-message';
import * as yup from "yup";
import { axiosInstance } from '@/lib/axiosInstance';

const schema = yup
  .object({
    name: yup.string().required(),
  })
  .required()

export default function Form() {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  })
  const onSubmit = ( data: any) => {
    console.log('data ==>', data);

    axiosInstance.post("/categoriers/create", data)
    .then((response) => console.log(response))
    .catch((err) => {
      console.log('catch error: ', err)
    })
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
        <input {...register("nomErrorInput", { required: "Le champ est requis." })} />
        {/* // <input {...register("singleErrorInput", { required: "This is required." })} /> */}
        <ErrorMessage errors={errors} name="nomErrorInput" />



        <input {...register("singleErrorInput", { required: "This is required." })} />
        <ErrorMessage errors={errors} name="singleErrorInput" />
        
        <ErrorMessage
            errors={errors}
            name="singleErrorInput"
            render={({ message }) => <p>{message}</p>}
      />

      <input type="submit" />
    </form>
  )
}