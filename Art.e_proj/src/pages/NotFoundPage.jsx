import { Link } from 'react-router-dom';

export default function NotFoundPage() {
  return (
    <main className="not-found">
      <div className="not-found__container">
        <h1>Pagina non trovata</h1>
        <p>La risorsa che stai cercando potrebbe essere stata spostata o non esistere più.</p>
        <Link to="/" className="service-form__button service-form__button--secondary">
          Torna alla home
        </Link>
      </div>
    </main>
  );
}
