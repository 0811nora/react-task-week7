import { useForm } from "react-hook-form";
import { postSignin } from "../api/Api";
import { successNotify } from "../components/Toast";
import { errorNotify } from "../components/Toast";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from 'axios';




// macaron@demo.com
// 11112222

const Login = () => {

    const navigate = useNavigate();
    const [ loginData , setLoginData ] = useState(null);

    
    const { 
        register,
        handleSubmit,
        reset,
        formState:{ errors }
    } = useForm({
        defaultValues: {
            username: "",
            password: ""
        }
    });

    useEffect(() => {
        if(loginData){
            const { token , expired } = loginData
            axios.defaults.headers.common['Authorization'] = token;
            document.cookie = `admToken=${token};expires=${new Date(expired)};path=/;`;
        }
    },[loginData])
    


    const onSubmit = async(data) => {
        try{
            const res = await postSignin(data);;
            successNotify(res.data.message);
            setLoginData(res.data)
            reset();

            setTimeout(()=>{
                navigate('/admin/product'); 
            },500)


        }catch(err){
            errorNotify(err.response.data.message);
        }

    }


    


    return(<>
    <div className="d-flex justify-content-center align-items-center w-100" style={{minHeight: '90vh'}}>
        <form className="login-form p-5" style={{maxWidth:"400px"}} onSubmit={handleSubmit(onSubmit)}>
            <div className="d-flex flex-column align-items-center">
                <div className="login-title ">管理者</div>

                <input className="login-input mb-1" 
                    name="username"     
                    placeholder="Email" 
                    type="email"  
                    {...register('username',{
                        required: {
                            value: true,
                            message: 'Email為必填'
                        }
                    })}
                />
                <span className="text-danger">{errors.username ? errors.username.message : ''}</span>

                <input className="login-input mt-4 mb-1" 
                    name="password" 
                    placeholder="Password" 
                    type="password" 
                    {...register('password',{required: true,})}
                />
                <span className="text-danger">{errors.password ? "請填寫密碼" : ''}</span>


                <button className="login-button-confirm" type="submit" >登入</button>
            </div>
        </form>
    </div>
    
    </>)
}

export default Login;