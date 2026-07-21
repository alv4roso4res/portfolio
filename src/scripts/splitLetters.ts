export function splitLetters(selector: string): void {
    document.querySelectorAll<HTMLElement>(selector).forEach((el) => {
        const raw = el.textContent ?? '';
        const text = raw.replace(/^\s+/, '');
        if (!text) return;

        const tokens = text.match(/\S+|\s+/g) ?? [];

        el.innerHTML = tokens
            .map((token) => {
                if (/^\s+$/.test(token)) return ' ';

                const letters = token
                    .split('')
                    .map((ch) => `<span data-char="${ch}"></span>`)
                    .join('');

                return `<span class="word">${letters}</span>`;
            })
            .join('');
    });
}
