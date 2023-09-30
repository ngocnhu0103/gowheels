import React from "react";
import PublicIcon from "@mui/icons-material/Public";

function Tag({ tag, selectTag, activeTag }) {
    // console.log(tag, activeTag);
    return (
        <li
            onClick={() => {
                selectTag(tag.tagId);
            }}
            className={`${
                activeTag ? "bg-primary text-white" : ""
            } py-2 cursor-pointer flex justify-center items-center flex-col outline outline-1 outline-gray-400 rounded text-gray-500`}
        >
            <PublicIcon />
            <p>{tag.tagName}</p>
        </li>
    );
}

export default Tag;
