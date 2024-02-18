import './index.css';
import {useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/Auth/AuthContext';
import { useContext, useState } from 'react';
import logoWithName from '../../images/logoWithName.png';
import { ClipLoader } from 'react-spinners';

export const Dashboard = () => {
    const auth = useContext(AuthContext);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    
    const sair = async () => {
        setLoading(true);
        await auth.signout();
        setLoading(false);
        navigate('/');
    }

    const alterMode = () => {
        const slider = document.querySelector('input[name="theme"]');

        slider.addEventListener("change", function () {
            if (this.checked) {
                document.body.classList.add("dark");
            } else {
                document.body.classList.remove("dark");
            }

        });
    }
    return(
        <div>
            <nav>
                <div className="wrapper">
                    <div className="title">
                        <img src={logoWithName} alt="" className="right-login-img" />
                    </div>
                    <div className='teste'>
                        <div className="switch-btn">
                            <div className="switch-text">
                                <h3>Dark Mode</h3>
                            </div>
                            <div className="switch-slider">
                                <label className="switch">
                                    <input type="checkbox" onChange={alterMode} name="theme" />
                                    <span className="slider round"></span>
                                </label>
                            </div>
                        </div>
                        <div className="switch-btn">
                            <div className="switch-slider">
                                <div>
                                    <button onClick={sair} className='btn-sair'>
                                        {loading ? (
                                            <ClipLoader loading={true} size={10} aria-label="Loading Spinner" data-testid="loader" />
                                        ) : (
                                            'Sair'
                                        )}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>

            <section>
                <div className="background-top"></div>

                <div className="container">
                    <div className="card facebook-card">
                        <div className="card-title">
                            <div className="icon"></div>
                            <p>@{auth.user.name}</p>
                        </div>
                        <div className="card-content">
                            <h1>1987</h1>
                            <h3>Seguidores</h3>
                        </div>
                        <div className="card-footer">
                            <div className="footer-wrapper">
                                <div className="icon-up"></div>
                                <h4>12 Hoje</h4>
                            </div>
                        </div>
                    </div>

                    <div className="card twitter-card">
                        <div className="card-title">
                            <div className="icon"></div>
                            <p>@{auth.user.name}</p>
                        </div>
                        <div className="card-content">
                            <h1>1044</h1>
                            <h3>Seguidores</h3>
                        </div>
                        <div className="card-footer">
                            <div className="footer-wrapper">
                                <div className="icon-up"></div>
                                <h4>99 Hoje</h4>
                            </div>
                        </div>
                    </div>

                    <div className="card instagram-card">
                        <div className="card-title">
                            <div className="icon"></div>
                            <p>@{auth.user.name}</p>
                        </div>
                        <div className="card-content">
                            <h1>11k</h1>
                            <h3>Seguidores</h3>
                        </div>
                        <div className="card-footer">
                            <div className="footer-wrapper">
                                <div className="icon-up"></div>
                                <h4>1099 Hoje</h4>
                            </div>
                        </div>
                    </div>

                    <div className="card yt-card">
                        <div className="card-title">
                            <div className="icon"></div>
                            <p>@{auth.user.name}</p>
                        </div>
                        <div className="card-content">
                            <h1>8239</h1>
                            <h3>Seguidores</h3>
                        </div>
                        <div className="card-footer">
                            <div className="footer-wrapper">
                                <div className="icon-down"></div>
                                <h4>144 Hoje</h4>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section>
                <div className="container title">
                    <h2>Overview - Hoje</h2>
                </div>
            </section>

            <section>
                <div className="container marg">
                    <div className="card-two">
                        <div className="card-two-title">
                            <p>Página Views</p>
                            <div className="icon-face"></div>
                        </div>
                        <div className="card-two-content">
                            <h2>78</h2>
                            <div className="icon"></div>
                            <h4>3%</h4>
                        </div>
                    </div>

                    <div className="card-two">
                        <div className="card-two-title">
                            <p>Likes</p>
                            <div className="icon-face"></div>
                        </div>
                        <div className="card-two-content">
                            <h2>52</h2>
                            <h4 id="down">2%</h4>
                        </div>
                    </div>

                    <div className="card-two">
                        <div className="card-two-title">
                            <p>Likes</p>
                            <div className="icon-insta"></div>
                        </div>
                        <div className="card-two-content">
                            <h2>5462</h2>
                            <h4>2257%</h4>
                        </div>
                    </div>

                    <div className="card-two">
                        <div className="card-two-title">
                            <p>Página Views</p>
                            <div className="icon-insta"></div>
                        </div>
                        <div className="card-two-content">
                            <h2>52k</h2>
                            <h4>1357%</h4>
                        </div>
                    </div>

                    <div className="card-two">
                        <div className="card-two-title">
                            <p>Retweets</p>
                            <div className="icon-twitter"></div>
                        </div>
                        <div className="card-two-content">
                            <h2>177</h2>
                            <h4>303%</h4>
                        </div>
                    </div>

                    <div className="card-two">
                        <div className="card-two-title">
                            <p>Likes</p>
                            <div className="icon-twitter"></div>
                        </div>
                        <div className="card-two-content">
                            <h2>507</h2>
                            <h4>553%</h4>
                        </div>
                    </div>

                    <div className="card-two">
                        <div className="card-two-title">
                            <p>Página Views</p>
                            <div className="icon-yt"></div>
                        </div>
                        <div className="card-two-content">
                            <h2>78</h2>
                            <h4 id="down">19%</h4>
                        </div>
                    </div>

                    <div className="card-two">
                        <div className="card-two-title">
                            <p>Página Views</p>
                            <div className="icon-yt"></div>
                        </div>
                        <div className="card-two-content">
                            <h2>78</h2>
                            <h4 id="down">12%</h4>
                        </div>
                    </div>
                </div>
            </section>

            <footer>
                <p>Criado por  @AttilaTabory - Software Developer</p>
            </footer>
        </div>       
    );
}