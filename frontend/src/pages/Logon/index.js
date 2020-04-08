//rsf component function
import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiLogIn } from 'react-icons/fi';
import swal from 'sweetalert';
import axios from '../../services/api';

import './styles.css';

import logoImg from '../../assets/logo.svg';
import heroesimg from '../../assets/heroes.png';

function Logon() {

    const [id, setId] = useState('');
    const history = useHistory();

    async function handleLogin(e) {
        e.preventDefault();

        try {
            const response = await axios.post('sessions', { id });
            localStorage.setItem('ongId', id);
            localStorage.setItem('ongName', response.data.name);
            history.push('/profile');
        }
        catch (err) {
            swal({
                title: "Falha ao fazer o login!",
                text: "Tente novamente.",
                icon: "error",
                button: true,
                dangerMode: true,
            });
        }

    }

    return (
        
        <div className="logo-container">
            <section className="form">
                <img className="logo" src={logoImg} alt="Be The Hero" />

                <form noValidate autoComplete="off" onSubmit={handleLogin}>
                    <h1>Faça seu logon</h1>

                    <input type="text" placeholder="Sua ID" value={id} onChange={e => setId(e.target.value)} />
                    <button className="button" type="submit" disabled={!id}>Entrar</button>

                    <Link className="back-link" to="/register"><FiLogIn size={26} color="#e02041" /> Não tenho cadastro</Link>
                </form>
            </section>

            <img className="heroes" src={heroesimg} alt="Heroes" />
        </div>
    );
}

export default Logon;