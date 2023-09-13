import { getToken} from "../func/utils.js";
import { showSwal } from "../../js/func/utils.js";
let categoryID = null;
let status = "start";
let courseCover = null
const getAndShowAllCourses = async () => {

    const res = await fetch(`http://localhost:4000/v1/courses`);
    const result = await res.json();
  console.log(result);
    const trowWrapper=document.querySelector("#tbody-courses")
    let i=0
    result.forEach((course) => {
        i=i+1
        trowWrapper.insertAdjacentHTML("beforeend",`
        <tr class="">
        <td class="py-2" data-th="Movie Title">${i}</td>
        <td class="py-2" data-th="Genre">${course.name}</td>
        <td class="py-2" data-th="Year">${course.price==0?`رایگان`:`${course.price}`}</td>
        <td class="py-2" data-th="Gross">${course.registers}</td>
        <td class="py-2" data-th="Gross">${course.support}</td>
        <td class="py-2" data-th="Gross">${course.categoryID.title}</td>
        <td class="py-2" data-th="Gross">${course.courseAverageScore}</td>
        <td class="py-2" data-th="Gross">${course.status=="start"?"درحال برگزاری":"پیش فروش"}</td>
      </tr>
        
        
        `)
    });
    return result
}

const prepareCreateCourseForm  = async () => {

  const res = await fetch(`http://localhost:4000/v1/category`);
  const result = await res.json();
  console.log(result);
  const categoryWrapper=document.querySelector("#category-select")
  const courseStatusPresellElem = document.querySelector("#presell");
  const courseStatusStartElem = document.querySelector("#start");
  const courseCoverElem = document.querySelector("#course-cover");
 /*list of category */
  result.forEach((course) => {
      categoryWrapper.insertAdjacentHTML("beforeend",`
      <option class="" value="${course._id}"><li class="">  ${course.title}   </li></option>
      
      
      `)
  });
  /*select-categories */
  categoryWrapper.addEventListener(
    "change",
    (event) => {categoryID = event.target.value
      console.log(categoryID)
    }
 
  );
  /*select-status-course */
  courseStatusPresellElem.addEventListener(
    "change",
    (event) => {status = event.target.value
      console.log(status)
      
      
    })
  courseStatusStartElem.addEventListener(
    "change",
    (event) => {status = event.target.value
      console.log(status)
      
      
    }
   
  );
  /*select-cover */
  courseCoverElem.addEventListener('change', event => {
    
 courseCover=event.target.files[0]
 console.log(courseCover);
  })

  return result
}
const createNewCourse = async () => {
  const courseNameElem = document.querySelector("#course-name");
  const coursePriceElem = document.querySelector("#course-price");
  const courseDescriptionElem = document.querySelector("#course-description");
  const courseShortnameElem = document.querySelector("#course-shortname");
  const courseSupportElem = document.querySelector("#course-support");

  const formData = new FormData();
  formData.append("name", courseNameElem.value.trim());
  formData.append("price", coursePriceElem.value.trim());
  formData.append("description", courseDescriptionElem.value.trim());
  formData.append("shortName", courseShortnameElem.value.trim());
  formData.append("support", courseSupportElem.value.trim());
  formData.append("categoryID", categoryID);
  formData.append("status", status);
  formData.append("cover", courseCover);
  const res = await fetch(`http://localhost:4000/v1/courses`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${getToken()}`
    },
    body: formData
  })
  
  /*empty-inputs */

  /*show-sweetalert */


if (res.status === 400) {
    showSwal(
      "مقادیر نادرست است",
      "error",
      "تصحیح اطلاعات",
      () => { }
    );
  }
  
  else  {
window.onbeforeunload=()=>{

  return      showSwal(
    "ثبت نام با موفقیت انجام شد",
    "success",
    "ورود به پنل",
   ()=> { }
  );
}
  }
};
   export{getAndShowAllCourses,prepareCreateCourseForm,createNewCourse}