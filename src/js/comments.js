import { getAndShowAllComments,showCommentBody } from "./func/comments.js";
window.showCommentBody=showCommentBody
window.addEventListener("load",()=>{
    getAndShowAllComments()
})