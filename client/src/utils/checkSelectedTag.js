export const checkActived = (cuurentTags, tagId) => {
    return cuurentTags.some((t) => t === tagId)
}