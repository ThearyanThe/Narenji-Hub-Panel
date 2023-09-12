


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
        <td class="py-2" data-th="Gross">${course.price}</td>
      </tr>
        
        
        `)
    });
    return result
}
const getCategory = async () => {

  const res = await fetch(`http://localhost:4000/v1/category`);
  const result = await res.json();
  console.log(result);
  const categoryWrapper=document.querySelector("#category-select")
 
  result.forEach((course) => {
      categoryWrapper.insertAdjacentHTML("beforeend",`
      <option class="" value="${course._id}"><li class="">  ${course.title}   </li></option>
      
      
      `)
  });
  return result
}
   export{getAndShowAllCourses,getCategory}