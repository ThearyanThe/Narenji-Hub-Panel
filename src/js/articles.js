import { getAndShowAllArticles,prepareCreateNewArticleForm,createNewArticle,removeArticle } from "./func/articles.js";
window.removeArticle=removeArticle
const SendArticle=document.querySelector("#SendArticle")
SendArticle.addEventListener("click",(event)=>{
    event.preventDefault()
    createNewArticle()
})
window.addEventListener("load",()=>{
    getAndShowAllArticles()
    prepareCreateNewArticleForm()
})