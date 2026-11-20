import React, { useState, useEffect } from 'react';

import logoImage from '../../assets/bonzi.png';
import { Link, useHistory } from 'react-router-dom';
import { FiPower, FiTrash2, FiEdit, FiBookOpen } from 'react-icons/fi';

import api from '../../services/api';

import './styles.css';

export default function Books() {
    const [books, setBooks] = useState([]);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);

    const history = useHistory();

    async function fetchMoreBooks() {
        if (loading || !hasMore) return;

        setLoading(true);

        try {
            const response = await api.get('book', {
                params: {
                    page: page
                }
            });

            const newBooks = response.data.books || [];

            setBooks(currentBooks => [...currentBooks, ...newBooks]);
            setPage(currentPage => currentPage + 1);

            if (newBooks.length === 0) {
                setHasMore(false);
            }
        } catch (err) {
            alert('Não foi possível carregar os livros. Tente novamente.');
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchMoreBooks();
        // eslint-disable-next-line
    }, []);

    function editBook(id) {
        history.push(`book/new/${id}`);
    }

    async function deleteBook(id) {
        const confirmDelete = window.confirm(
            'Tem certeza que deseja excluir este livro?'
        );

        if (!confirmDelete) return;

        try {
            await api.delete(`book/${id}`);

            setBooks(currentBooks =>
                currentBooks.filter(book => book.id !== id)
            );
        } catch (err) {
            alert('Não foi possível excluir o livro. Tente novamente.');
        }
    }

    return (
        <div className="book-container">

            <header className="book-header">

                <div className="brand">
                    <img src={logoImage} alt="Logo Bonzi" />

                    <div className="brand-text">
                        <strong>BOOK MANAGER</strong>
                        <span>LIBRARY OF BONZI</span>
                    </div>
                </div>

                <div className="header-actions">

                    <span className="welcome">
                        Bem-vindo, <strong>BONZI USER</strong>
                    </span>

                    <Link className="button add-button" to="book/new/0">
                        + Adicionar livro
                    </Link>

                    <button
                        className="logout-button"
                        type="button"
                        title="Sair"
                        aria-label="Sair"
                    >
                        <FiPower size={20} />
                    </button>

                </div>

            </header>

            <main>

                <section className="page-heading">
                    <div>
                        <span className="section-label">GERENCIAMENTO</span>
                        <h1>Livros cadastrados</h1>
                        <p>Visualize e gerencie os livros da sua biblioteca.</p>
                    </div>

                    <div className="book-counter">
                        <FiBookOpen size={22} />
                        <div>
                            <strong>{books.length}</strong>
                            <span>Livros exibidos</span>
                        </div>
                    </div>
                </section>

                {books.length === 0 && !loading ? (
                    <div className="empty-state">
                        <FiBookOpen size={42} />
                        <h2>Nenhum livro encontrado</h2>
                        <p>Adicione um novo livro para começar sua biblioteca.</p>
                        <Link className="button add-button" to="book/new/0">
                            Adicionar primeiro livro
                        </Link>
                    </div>
                ) : (
                    <ul className="book-list">

                        {books.map(book => (
                            <li className="book-card" key={book.id}>

                                <div className="book-card-header">
                                    <div className="book-icon">
                                        <FiBookOpen size={24} />
                                    </div>

                                    <div className="book-actions">

                                        <button
                                            className="edit-button"
                                            onClick={() => editBook(book.id)}
                                            type="button"
                                            title="Editar livro"
                                            aria-label={`Editar ${book.title}`}
                                        >
                                            <FiEdit size={18} />
                                        </button>

                                        <button
                                            className="delete-button"
                                            onClick={() => deleteBook(book.id)}
                                            type="button"
                                            title="Excluir livro"
                                            aria-label={`Excluir ${book.title}`}
                                        >
                                            <FiTrash2 size={18} />
                                        </button>

                                    </div>
                                </div>

                                <h2 className="book-title">{book.title}</h2>

                                <div className="book-information">

                                    <div className="info-item">
                                        <span>Autor</span>
                                        <strong>{book.author}</strong>
                                    </div>

                                    <div className="info-item">
                                        <span>Preço</span>
                                        <strong className="book-price">
                                            {Intl.NumberFormat('pt-BR', {
                                                style: 'currency',
                                                currency: 'BRL'
                                            }).format(book.price)}
                                        </strong>
                                    </div>

                                    <div className="info-item">
                                        <span>Data de lançamento</span>
                                        <strong>
                                            {book.launchDate
                                                ? Intl.DateTimeFormat('pt-BR').format(
                                                    new Date(book.launchDate)
                                                )
                                                : 'Não informada'}
                                        </strong>
                                    </div>

                                </div>

                            </li>
                        ))}

                    </ul>
                )}

                {hasMore && (
                    <div className="load-more-container">
                        <button
                            className="load-more-button"
                            onClick={fetchMoreBooks}
                            type="button"
                            disabled={loading}
                        >
                            {loading ? 'Carregando...' : 'Carregar mais livros'}
                        </button>
                    </div>
                )}

            </main>

        </div>
    );
}