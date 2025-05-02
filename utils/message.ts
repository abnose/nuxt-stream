export const message = (toast: any, type: 'Success' | 'Warning' | 'Error', text: string, life: number = 3000) => {
    toast.add({
        severity: type.toLocaleLowerCase(),
        summary: `${type} Message`,
        detail: text,
        life: life,
    });
}