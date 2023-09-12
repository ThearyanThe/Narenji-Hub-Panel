import { getAndShowAllCourses,prepareCreateCourseForm,createNewCourse } from "./func/Courses.js";
window.addEventListener("load",()=>{
  
    getAndShowAllCourses()
    prepareCreateCourseForm()
    console.log(21);
 

})
const SendCourse=document.querySelector("#send-course")
SendCourse.addEventListener("click",(event)=>{
    event.preventDefault()
createNewCourse()

})