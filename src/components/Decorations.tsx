export function Arrow() { return <span aria-hidden="true">↗</span>; }
export function Flower({ className = '' }: {
    className?: string;
}) {
    return <svg className={className} viewBox="0 0 100 100" fill="currentColor" aria-hidden="true">{[0, 60, 120, 180, 240, 300].map(angle => <ellipse key={angle} cx="50" cy="27" rx="12" ry="24" transform={`rotate(${angle} 50 50)`}/>)}<circle cx="50" cy="50" r="8" fill="var(--cream)"/></svg>;
}
export function Branch({ className = '' }: {
    className?: string;
}) {
    return <svg className={className} viewBox="0 0 200 340" fill="none" aria-hidden="true"><path d="M100 330C122 240 60 110 123 12" stroke="currentColor" strokeWidth="2"/><g fill="currentColor"><path d="M101 284C29 286 17 233 23 201C63 206 97 236 101 284Z"/><path d="M105 245C168 231 192 189 177 157C132 168 104 205 105 245Z"/><path d="M92 198C35 187 22 140 32 111C72 129 90 160 92 198Z"/><path d="M94 149C143 142 174 104 165 75C125 81 100 107 94 149Z"/><path d="M102 91C69 68 78 28 98 14C116 43 111 65 102 91Z"/></g></svg>;
}
