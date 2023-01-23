export const input80characters = (() => {
    let text = '';
    for (let i = 0; i < 8; i++) {
        for(let y = 0; y < 10; y++) {
            text = `${text}${y}`;
        }
    }
    return text;
})();