import './index.css';

import logo from '../../images/logo.png';
import logoWithName from '../../images/logoWithName.png';
import { TextFieldInput } from '../../components/input';
import { Link, useNavigate } from 'react-router-dom';
import { useContext, useState,  useEffect } from 'react';
import Swal from 'sweetalert2';
import { AuthContext } from '../../context/Auth/AuthContext';
import { ClipLoader } from 'react-spinners';
export const Login = () => {
    const auth = useContext(AuthContext);
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);


    const validateEmail = (email) => {
        const isValidEmail = email.includes('@');
        return isValidEmail;
    };

    const handleLogin = async () => {
        if (!validateEmail(email) || !password) {
            Swal.fire({
                position: "top-end",
                icon: "error",
                title: "Preencha um e-mail válido e senha!",
                showConfirmButton: false,
                timer: 2500
            });
            return;
        }
    
        setLoading(true);
        const isLogin = await auth.signin(email, password);
        setLoading(false);
    
        if (isLogin === undefined) {
            showErrorNotification("Erro - tente novamente mais tarde!");
            return;
        }
    
        if (isLogin.response?.status === 403 && isLogin.response.data?.emailValidation === false && isLogin.response.data.exist) {
            showErrorNotification(`Seu email ainda não foi confirmado, reenviamos a validação para o email ${email}!`);
            return;
        }
    
        if (isLogin.status === 200 || isLogin === true) {
            showSuccessNotification("Login realizado com sucesso!!!");
            // Agendar a execução do navigate('/') após 1.5 segundos
            setTimeout(() => navigate('/dashboard'), 1500);
        } else {
            showErrorNotification("Erro - Tente novamente!!!");
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
        <div className="main-login">
            <div className="left-login">
                <img src={logo} alt="" className="left-login-png" />
            </div>
            <div className="right-login">
                <div className="card-login">
                    <img src={logoWithName} alt="" className="right-login-img" />
                    <TextFieldInput value={email} label="Email" name="email" placeholder="Digite seu Email" className="textfield" type="text" setValue={setEmail} />
                    <TextFieldInput  value={password} label="Senha" name="password" placeholder="Digite sua senha" className="textfield" type="password"  setValue={setPassword}/>
                    <button
                        className={`btn-login ${(!email.trim() || !password.trim() || loading || !validateEmail(email) || email.length <= 6 || password.length <= 6) ? 'disabled' : ''}`}
                        onClick={handleLogin}
                        disabled={!email.trim() || !password.trim() || !validateEmail(email) || loading || email.length <= 6 || password.length <= 6}
                    >
                     {loading ? (<ClipLoader loading={true} size={10} aria-label="Loading Spinner" data-testid="loader" />) : ('Login')}
                    </button>
                    <Link to={'/register'}>
                        <button className="btn-registerr" >Cadastre-se</button>
                    </Link>
                </div>
            </div>
        </div>
    );
}