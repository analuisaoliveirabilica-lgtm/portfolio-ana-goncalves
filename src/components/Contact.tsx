import { Arrow, Flower } from './Decorations';
export function Contact() {
    return <section className="contact section container" id="contato" aria-labelledby="contact-title"><Flower className="contact-flower"/><p className="eyebrow">04 / VAMOS CONVERSAR</p><h2 id="contact-title">Boas ideias começam<br />com uma <em>boa conversa.</em></h2><p>Tem um projeto em mente ou quer trocar ideias sobre design?<br />Vou adorar conhecer sua história.</p><a className="button" href="mailto:analuisaoliveiragon@gmail.com">Me escreva <Arrow /></a><a className="email-link" href="mailto:analuisaoliveiragon@gmail.com">analuisaoliveiragon@gmail.com</a></section>;
}
