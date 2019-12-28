export const getJWT = () => {
    return `Baerer ${localStorage.getItem('jwt')}`;
}