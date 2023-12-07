/* eslint-disable react/prop-types */

function Tag({ tag, selectTag, activeTag }) {
    return (
        <li
            onClick={() => {
                selectTag(tag.tagId);
            }}
            className={`${
                activeTag ? "bg-primary text-white" : ""
            } py-2 cursor-pointer flex justify-center items-center flex-col outline outline-1 outline-gray-400 rounded text-gray-500`}
        >
            <p>{tag.tagName}</p>
        </li>
    );
}

export default Tag;
