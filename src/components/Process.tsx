import { useRef } from 'react';
import { useStackDepth } from '../hooks/useStackDepth';

const steps = [
    ['01', 'Escutar', 'Entender as pessoas, suas necessidades e o contexto antes de desenhar soluções.', '/icons/process-notebook.svg'],
    ['02', 'Definir', 'Conectar descobertas e transformar perguntas em uma direção clara.', '/icons/process-pen.svg'],
    ['03', 'Explorar', 'Dar espaço às ideias, experimentar caminhos e criar possibilidades.', '/icons/process-palette.svg'],
    ['04', 'Construir', 'Prototipar, testar e refinar. Aprender com as pessoas faz parte do processo.', '/icons/process-rocket.svg'],
];
export function Process() {
    const stackRef = useRef<HTMLOListElement>(null);
    useStackDepth(stackRef);
    return <section className="process section container" id="processo" aria-labelledby="process-title"><div className="section-heading"><div className="reveal"><p className="eyebrow">02 / PROCESSO CRIATIVO</p><h2 id="process-title">Curiosidade primeiro.<br /><em>Design depois.</em></h2></div><p className="reveal">Cada projeto tem seu caminho.<br />O meu começa com pessoas.</p></div><ol className="stack" ref={stackRef}>{steps.map(([number, title, description, icon]) => <li className="stack-item" key={number}><div className="stack-card"><div className="stack-card-top"><span className="step-icon" aria-hidden="true"><img src={icon} alt="" /></span><span className="step-number">{number}</span></div><div className="stack-card-body"><h3>{title}</h3><p>{description}</p></div></div></li>)}</ol><p className="process-note reveal"><span aria-hidden="true">↳</span> E voltar, descobrir, ajustar… criar também é recomeçar.</p></section>;
}
