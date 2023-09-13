import { getAndShowAllCourses,prepareCreateCourseForm,createNewCourse,removeCourse } from "./func/Courses.js";
window.removeCourse = removeCourse
window.addEventListener("load",()=>{
    getAndShowAllCourses()
    prepareCreateCourseForm()
})
const SendCourse=document.querySelector("#send-course")
SendCourse.addEventListener("click",(event)=>{
    event.preventDefault();
    createNewCourse()
})


