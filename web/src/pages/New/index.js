import React, { useState, useMemo } from 'react';

import './styles.css';

import camera from '../../assets/camera.svg';

import api from '../../services/api';

export default function New({ history }) {
  const [company, setCompany] = useState('');
  const [techs, setTechs] = useState('');
  const [price, setPrice] = useState('');
  const [thumbnail, setThumbnail] = useState(null);

  const preview = useMemo(() => {
    return thumbnail ? URL.createObjectURL(thumbnail) : null;
  }, [thumbnail]);

  async function handleSubmit(event) {
    event.preventDefault();

    const formData = new FormData();
    formData.append('thumbnail', thumbnail);
    formData.append('company', company);
    formData.append('techs', techs);
    formData.append('price', price);

    const user_id = localStorage.getItem('user');

    await api.post('/spots', formData, {
      headers: { user_id }
    });

    history.push('/dashboard');
  }

  return (
    <form onSubmit={handleSubmit}>
      <label
        id="thumbnail"
        className={thumbnail ? 'has-thumbnail' : ''}
        style={{ backgroundImage: `url(${preview})` }}
      >
        <input
          type="file"
          onChange={event => setThumbnail(event.target.files[0])}
        />
        <img src={camera} alt="select img" />
      </label>

      <label htmlFor="company">EMPRESA *</label>
      <input
        id="company"
        type="text"
        placeholder="Sua empresa incrível"
        value={company}
        onChange={event => setCompany(event.target.value)}
      />
      <label htmlFor="techs">
        TECNOLOGIAS *<span>(separadas por vírgula)</span>
      </label>
      <input
        id="techs"
        type="text"
        placeholder="Quais tecnologias usam"
        value={techs}
        onChange={event => setTechs(event.target.value)}
      />
      <label htmlFor="price">
        VALOR DA DIÁRIA *<span>(em branco para gratuito)</span>
      </label>
      <input
        id="price"
        type="number"
        placeholder="Valor cobrado por dia"
        value={price}
        onChange={event => setPrice(event.target.value)}
      />
      <button className="btn" type="submit">
        Cadastrar
      </button>
    </form>
  );
}
