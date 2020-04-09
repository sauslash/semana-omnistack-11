import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiPower, FiTrash2, FiEdit, FiSkipForward, FiSkipBack } from 'react-icons/fi';
import swal from 'sweetalert';

import './styles.css';
import logoImg from '../../assets/logo.svg';
import api from '../../services/api';

export default function Profile() {
    const history = useHistory();
    const [incidents, setIncidents] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPage, setTotalPage] = useState(0);

    const ongName = localStorage.getItem('ongName');
    const ongId = localStorage.getItem('ongId');

    
    

    useEffect( () => {
        async function loadIncidents() {
            const response = await api.get('profile', {
                headers: {
                    Authorization: ongId
                },
                params: { page }
            });
            setIncidents(response.data);
            let totalRegistros = parseInt(response.headers['x-total-count']);
            setTotalPage(Math.floor(Math.ceil(totalRegistros / 4)));
        }
        
        loadIncidents();
        // console.log("response",response);
        // console.log("page",page);
        // console.log("totalpage",response.headers['x-total-count']);
    }, [page, ongId, incidents, totalPage]);
    

    async function handleDeleteIncident(id) {
        try {
            await api.delete(`incidents/${id}`, {
                headers: {
                    Authorization: ongId
                }
            });

            setIncidents(incidents.filter(incident => incident.id !== id));
        }
        catch (err) {
            alert('Erro ao deletar');
        }
    }

    async function handleEditIncident(incident) {
        try {
            history.push(`/incident/edit/${incident.id}`);
        } catch (error) {
            swal({
                title: "Erro ao cadastrar!",
                text: "Tente novamente.",
                icon: "error",
                button: true,
                dangerMode: true,
            });
        }
    }

    function handleLogout() {
        localStorage.clear();
        history.push('/');
    }

    return (
        <div className="profile-container">
            <header>
                <img src={logoImg} alt="Be The Hero" />
                <span>Bem vindo(a), {ongName}</span>

                <Link className="button" to="/incidents/new">Cadastrar novo caso</Link>
                <button onClick={handleLogout} type="button">
                    <FiPower size={18} color="#e02041" />
                </button>
            </header>

            {incidents.length > 0 ? <h1>Casos cadastrados</h1> : null}

            <ul>
                {incidents.length > 0 ? (
                    incidents.map(incident => (
                        <li key={incident.id}>
                            <strong>CASO:</strong>
                            <p>{incident.title}</p>

                            <strong>DESCRIÇÃO:</strong>
                            <p>{incident.description}</p>

                            <strong>VALOR:</strong>
                            <p>{Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(incident.value)}</p>

                            <button onClick={() => handleDeleteIncident(incident.id)} type="button">
                                <FiTrash2 size={20} color="#a8a8b3" />
                            </button>
                            <button onClick={() => handleEditIncident(incident)} type="button">
                                <FiEdit size={20} />
                            </button>
                        </li>
                    ))) : (<h1>Nenhum caso registrado</h1>)
                }
            </ul>
            <div className="pageController">
                <button className="Button"
                    onClick={() => {
                        console.log(page);
                        if (page !== 1) {
                            setPage(page - 1);
                            console.log("teste", page);
                        }
                    }}
                >
                    <FiSkipBack size={24} color="#fff" />
                </button>
                <p>{page}</p>
                <button className="Button"
                    onClick={() => {
                        if (page !== totalPage) {
                            setPage(page + 1);
                        }
                    }}
                >
                    <FiSkipForward size={24} color="#fff" />
                </button>
            </div>
        </div>
    );
}