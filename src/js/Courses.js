import { getAndShowAllCourses,prepareCreateCourseForm,createNewCourse } from "./func/Courses.js";
window.addEventListener("load",()=>{
  
    getAndShowAllCourses()
    prepareCreateCourseForm()
 
 

})
const SendCourse=document.querySelector("#send-course")
SendCourse.addEventListener("click",(event)=>{
    event.preventDefault();
createNewCourse()


  

})