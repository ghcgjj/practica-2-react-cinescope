export default function ErrorState({ message, onRetry }) {
  return (
    <section className="error-state" role="alert">
      <span className="error-icon" aria-hidden="true">!</span>
      <div>
        <h3>Algo ha salido mal</h3>
        <p>{message}</p>
        {onRetry && <button type="button" className="secondary-button" onClick={onRetry}>Volver a intentarlo</button>}
      </div>
    </section>
  );
}
