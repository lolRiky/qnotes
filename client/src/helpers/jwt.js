export const getJWT = () => {
    return `Baerer ${localStorage.getItem('jwt')}`;
}

export const logOut = () => {
    localStorage.removeItem('jwt');
    window.location.reload();
}