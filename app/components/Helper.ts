export function getLocalStorage(key: string): string|null {
    return localStorage.getItem(key);
}

export function setLocalStorage(key: string, value: string): boolean|null|void {
    return localStorage.setItem(key, value);
}