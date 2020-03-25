//rsf component function
import React from 'react';
import { Link } from 'react-router-dom';
import { FiLogIn } from 'react-icons/fi';

import './styles.css';

import logoImg from '../../assets/logo.svg';
import heroesimg from '../../assets/heroes.png';

function Logon() {
    return (
        <div className="logon-container">
            <section className="form">
                <img src={ logoImg } alt="Be The Hero" />
                <form>
                    <h1>Faça seu logon</h1>
                    <input placeholder="Sua ID" type="text"/>
                    <button className="button" type="submit">Entrar</button>

                    <Link className="back-link" to="/register">
                        <FiLogIn size={16} color="#e02041" />
                        Não tenho cadastro
                    </Link>
                </form>
            </section>

            <img src={ heroesimg } alt="Heroes" />
        </div>
    );
}

export default Logon;