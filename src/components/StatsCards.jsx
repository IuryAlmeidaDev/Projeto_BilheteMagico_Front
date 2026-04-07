export default function StatsCards({ historicoTotal, favoritosTotal, taxaOtimizacao }) {
  return (
    <div className="hero-stats" aria-label="Resumo do gerador">
      <div>
        <strong>{historicoTotal}</strong>
        <span>jogos criados</span>
      </div>
      <div>
        <strong>{favoritosTotal}</strong>
        <span>favoritos</span>
      </div>
      <div>
        <strong>{taxaOtimizacao}%</strong>
        <span>aprovados</span>
      </div>
    </div>
  );
}
