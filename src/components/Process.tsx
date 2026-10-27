const steps = [
    ['01', 'Escutar', 'Entender as pessoas, suas necessidades e o contexto antes de desenhar soluções.', '/icons/process-notebook.svg'],
    ['02', 'Definir', 'Conectar descobertas e transformar perguntas em uma direção clara.', '/icons/process-pen.svg'],
    ['03', 'Explorar', 'Dar espaço às ideias, experimentar caminhos e criar possibilidades.', '/icons/process-palette.svg'],
    ['04', 'Construir', 'Prototipar, testar e refinar. Aprender com as pessoas faz parte do processo.', '/icons/process-rocket.svg'],
];
export function Process() {
    return <section className="process section container" id="processo" aria-labelledby="process-title"><div className="section-heading"><div><p className="eyebrow">02 / PROCESSO CRIATIVO</p><h2 id="process-title">Curiosidade primeiro.<br /><em>Design depois.</em></h2></div><p>Cada projeto tem seu caminho.<br />O meu começa com pessoas.</p></div><ol className="process-grid">{steps.map(([number, title, description, icon]) => <li key={number}><div className="step-top"><span className="step-icon" aria-hidden="true"><img src={icon} alt="" /></span><span className="step-number">{number}</span></div><h3>{title}</h3><p>{description}</p></li>)}</ol><p className="process-note"><span aria-hidden="true">↳</span> E voltar, descobrir, ajustar… criar também é recomeçar.</p></section>;
}
