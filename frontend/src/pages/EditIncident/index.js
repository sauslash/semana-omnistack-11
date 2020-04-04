import React, {useState, useEffect} from 'react';
import { Link, useHistory, useParams } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import NumberFormat from 'react-number-format';
import swal from 'sweetalert';
import api from '../../services/api';

import './styles.css';

import logoImg from '../../assets/logo.svg';

export default function EditIncident() {

    const history = useHistory();
    const { id } = useParams();

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [value, setValue] = useState('');

    const [error, setError] = useState('');
    const [incident, setIncident] = useState({});

    const ongId = localStorage.getItem('ongId');

    useEffect(() => {
      async function load() {
        try {
          const { data } = await api.get('/profile', {
            headers: {
              Authorization: ongId,
            },
          });
  
          const incident = data.find(incident => incident.id === Number(id));  
          setIncident(incident);
          
        } catch (error) {
          swal({
            title: "Erro ao carregar página!",
            text: "Tente novamente.",
            icon: "error",
            button: true,
            dangerMode: true,
        });
          history.push('/profile');
        }
      }
      load();
    }, [ongId, id, history]);

    async function handleEditIncident(e) {
      e.preventDefault();
  
      const obj = {
        title: incident.title,
        description: incident.description,
        value: incident.value,
      };
  
      const formatValue = value.replace(/\D*/, '').replace(',', '');
      const data = {
        title,
        description,
        value: Number(formatValue),
      };
  
      Object.keys(data).forEach(function(key) {
        if (!data[key]) {
          data[key] = obj[key];
        }
      });
      try {
        await api.put(`/incidents/${id}`, data, {
          headers: {
            Authorization: ongId,
          },
        });
  
        history.push('/profile');
      } catch (errors) {
        setError('');
  
        const data = {
          open: true,
          title: 'Erro ao editar caso!',
          info: 'Erro ao editar o cadastro, tente novamente!',
          action: 'handleClose',
          error: errors.toString(),
        };
  
        setError(data);
      }
    }

    const format = value =>
    new Intl.NumberFormat('pt-Br', {
      currency: 'BRL',
      style: 'currency',
    }).format(value);

    return (
        <div className="new-incident-container">
            <div className="content">
                <section>
                    <img src={logoImg} alt="Be The Hero" />

                    <h1>Editar caso</h1>
                    <p>Descreva o caso detalhadamente para encontrar um herói para resolver isso.</p>

                    <Link className="back-link" to="/profile">
                        <FiArrowLeft size={16} color="#e02041" />
                        Voltar para home
                    </Link>
                </section>
                
                <form onSubmit={handleEditIncident}>
                    <input 
                        placeholder={incident.title}
                        value={title}
                        onChange={e => setTitle(e.target.value)}
                    />
                    <textarea 
                        placeholder={incident.description}
                        value={description}
                        onChange={e => setDescription(e.target.value)}
                    />
                    <NumberFormat
                      placeholder={format(incident.value)}
                      value={value}
                      prefix="R$"
                      thousandSeparator
                      onChange={e => setValue(e.target.value)}
                    />

                    <button className="button" type="submit">Salvar</button>
                </form>                
            </div>
        </div>
    );
}