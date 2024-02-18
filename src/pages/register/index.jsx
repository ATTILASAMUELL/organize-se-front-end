import './index.css';

import logo from '../../images/logo.png';
import logoWithName from '../../images/logoWithName.png';
import { TextFieldInput } from '../../components/input';
import { Link, useNavigate } from 'react-router-dom';
import { useContext, useState } from 'react';
import Swal from 'sweetalert2';
import { AuthContext } from '../../context/Auth/AuthContext';
import { ClipLoader } from 'react-spinners';

export const Register = () => {
    const auth = useContext(AuthContext);
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const validateEmail = (email) => {
        const isValidEmail = email.includes('@');
        return isValidEmail;
    };

    const handleRegister = async () => {
        if(name && validateEmail(email) && password) {
            setLoading(true);
            const isRegister = await auth.register(name,email,password);
            setLoading(false);

            if(isRegister) {
                showSuccessNotification("Cadastro realizado com sucesso!!!");
                
                setTimeout(() => {
                    navigate('/');
                }, 1500);
                
            }else {
                showErrorNotification("Error - Tente novamente!!!");
               
            }
        }   
    }

    const showErrorNotification = (message) => {
        Swal.fire({
            position: "top-end",
            icon: "error",
            title: message,
            showConfirmButton: false,
            timer: 2500
        });
    }
    
    const showSuccessNotification = (message) => {
        Swal.fire({
            position: "top-end",
            icon: "success",
            title: message,
            showConfirmButton: false,
            timer: 1500
        });
    }

    return(
        <div className="main-register">
            <div className="left-register">
                <img src={logo} alt="" className="left-register-png" />
            </div>
            <div className="right-register">
                <div className="card-register">
                    <img src={logoWithName} alt="" className="right-register-img" />
                    <TextFieldInput value={name} label="Nome" name="name" placeholder="Digite seu Nome" className="textfield" type="text" setValue={setName}/>
                    <TextFieldInput value={email} label="Email" name="email" placeholder="Digite seu Email" className="textfield" type="text" setValue={setEmail} />
                    <TextFieldInput  value={password} label="Senha" name="password" placeholder="Digite sua senha" className="textfield" type="password"  setValue={setPassword}/>
                    <button
                        className={`btn-register ${(!name.trim() || !email.trim() || !password.trim() || loading || !validateEmail(email) || email.length <= 6 || password.length <= 6 || name.length <= 6) ? 'disabled' : ''}`}
                        onClick={handleRegister}
                        disabled={!name.trim() || !email.trim() || !password.trim() || !validateEmail(email) || loading || email.length <= 6 || password.length <= 6 || name.length <= 6}
                    >
                     {loading ? (<ClipLoader loading={true} size={10} aria-label="Loading Spinner" data-testid="loader" />) : ('Cadastre-se')}
                    </button>
                    <Link to={'/'}>
                        <button className="btn-loginn">Login</button>
                    </Link>
                </div>
            </div>
        </div>
    );
}