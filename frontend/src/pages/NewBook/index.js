import React, { useState, useEffect } from 'react';
import { Link, useHistory, useParams } from 'react-router-dom';
import { FiArrowLeft, FiBookOpen, FiSave } from 'react-icons/fi';

import api from '../../services/api';
import logoImage from '../../assets/bonziface.png';

import './styles.css';

export default function NewBook() {
    const [id, setId] = useState(null);
    const [author, setAuthor] = useState('');
    const [title, setTitle] = useState('');
    const [launchDate, setLaunchDate] = useState('');
    const [price, setPrice] = useState('');

    const [loading, setLoading] = useState(false);
    const [saving, setSaving] = useState(false);

    const { bookId } = useParams();
    const history = useHistory();

    const isEditing = bookId !== '0';

    useEffect(() => {
        if (isEditing) {
            loadBook();
        }
        // eslint-disable-next-line
    }, [bookId]);

    async function loadBook() {
        setLoading(true);

        try {
            const response = await api.get(`book/${bookId}`);

            const book = response.data;

            const adjustedDate = book.launchDate
                ? book.launchDate.split('T')[0]
                : '';

            setId(book.id);
            setTitle(book.title || '');
            setAuthor(book.author || '');
            setPrice(book.price !== null && book.price !== undefined
                ? String(book.price)
                : '');
            setLaunchDate(adjustedDate);

        } catch (error) {
            alert('Não foi possível carregar os dados do livro.');
            history.push('/books');
        } finally {
            setLoading(false);
        }
    }

    async function saveOrUpdate(e) {
        e.preventDefault();

        if (!title.trim() || !author.trim() || !launchDate || price === '') {
            alert('Preencha todos os campos antes de continuar.');
            return;
        }

        const numericPrice = Number(price);

        if (!Number.isFinite(numericPrice) || numericPrice < 0) {
            alert('Informe um preço válido.');
            return;
        }

        const data = {
            title: title.trim(),
            author: author.trim(),
            launchDate,
            price: numericPrice,
        };

        setSaving(true);

        try {
            if (!isEditing) {
                await api.post('book', data);
            } else {
                data.id = id;
                await api.put('book', data);
            }

            alert(
                isEditing
                    ? 'Livro atualizado com sucesso!'
                    : 'Livro cadastrado com sucesso!'
            );

            history.push('/books');

        } catch (err) {
            alert(
                isEditing
                    ? 'Erro ao atualizar o livro. Verifique os dados e tente novamente.'
                    : 'Erro ao cadastrar o livro. Verifique os dados e tente novamente.'
            );
        } finally {
            setSaving(false);
        }
    }

    if (loading) {
        return (
            <div className="new-book-container">
                <div className="loading-card">
                    Carregando informações do livro...
                </div>
            </div>
        );
    }

    return (
        <div className="new-book-container">

            <div className="new-book-content">

                <header className="new-book-header">

                    <Link className="back-link" to="/books">
                        <FiArrowLeft size={19} />
                        Voltar para livros
                    </Link>

                    <div className="new-book-brand">
                        <img src={logoImage} alt="Logo Bonzi" />
                        <span>BOOK MANAGER</span>
                    </div>

                </header>

                <div className="new-book-main">

                    <section className="new-book-info">

                        <div className="form-icon">
                            <FiBookOpen size={30} />
                        </div>

                        <span className="form-label">
                            GERENCIAMENTO DE BIBLIOTECA
                        </span>

                        <h1>
                            {isEditing
                                ? 'Editar livro'
                                : 'Adicionar novo livro'}
                        </h1>

                        <p>
                            {isEditing
                                ? 'Atualize as informações do livro cadastrado na sua biblioteca.'
                                : 'Preencha os campos ao lado para adicionar um novo livro à sua biblioteca.'}
                        </p>

                        <div className="form-tip">
                            <strong>Importante</strong>
                            <span>
                                Confira as informações antes de salvar.
                                Todos os campos são obrigatórios.
                            </span>
                        </div>

                    </section>

                    <section className="new-book-form-section">

                        <div className="form-heading">
                            <h2>
                                Informações do livro
                            </h2>
                            <span>
                                Preencha os dados abaixo
                            </span>
                        </div>

                        <form onSubmit={saveOrUpdate}>

                            <div className="form-group">
                                <label htmlFor="title">
                                    Título do livro
                                </label>

                                <input
                                    id="title"
                                    type="text"
                                    placeholder="Ex: Clean Code"
                                    value={title}
                                    onChange={e => setTitle(e.target.value)}
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="author">
                                    Autor
                                </label>

                                <input
                                    id="author"
                                    type="text"
                                    placeholder="Digite o nome do autor"
                                    value={author}
                                    onChange={e => setAuthor(e.target.value)}
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="launchDate">
                                    Data de lançamento
                                </label>

                                <input
                                    id="launchDate"
                                    type="date"
                                    value={launchDate}
                                    onChange={e => setLaunchDate(e.target.value)}
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="price">
                                    Preço (R$)
                                </label>

                                <input
                                    id="price"
                                    type="number"
                                    placeholder="Ex: 59.90"
                                    min="0"
                                    step="0.01"
                                    value={price}
                                    onChange={e => setPrice(e.target.value)}
                                    required
                                />
                            </div>

                            <div className="form-buttons">

                                <Link
                                    className="cancel-button"
                                    to="/books"
                                >
                                    Cancelar
                                </Link>

                                <button
                                    className="save-button"
                                    type="submit"
                                    disabled={saving}
                                >
                                    <FiSave size={18} />

                                    {saving
                                        ? 'Salvando...'
                                        : isEditing
                                            ? 'Atualizar livro'
                                            : 'Cadastrar livro'}
                                </button>

                            </div>

                        </form>

                    </section>

                </div>

                <footer className="new-book-footer">
                    Book Manager · Sistema de gerenciamento de livros
                </footer>

            </div>

        </div>
    );
}