import { getAndShowAllComments,showCommentBody,acceptComment,rejectComment,removeComment,answerToComment } from "./func/comments.js";
window.showCommentBody=showCommentBody
window.acceptComment=acceptComment
window.rejectComment=rejectComment
window.removeComment=removeComment
window.answerToComment=answerToComment
window.addEventListener("load",()=>{
    getAndShowAllComments()
})