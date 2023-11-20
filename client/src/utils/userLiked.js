export const userLiked = (userLikes = [], bikeId) => {
    console.log(userLikes);
    return [...userLikes].some(like => like.bikeId === bikeId);
}