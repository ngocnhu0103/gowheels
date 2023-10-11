export const userLiked = (userLikes, bikeId) => {
    return [...userLikes].some(like => like === bikeId);
}