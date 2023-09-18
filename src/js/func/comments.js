import { showSwal,getToken } from "./utils.js"
const getAndShowAllComments = async () => {
    const commentsListTableElem = document.querySelector('#tbody-comments')
    commentsListTableElem.innerHTML = ''

    const res = await fetch(`http://localhost:4000/v1/comments`)
    const comments = await res.json()
console.log(comments);
    comments.forEach((comment, index) => {
        commentsListTableElem.insertAdjacentHTML('beforeend', `
            <tr>
                <td class="${
                comment.answer === 1 ? "answer-comment" : "no-answer-comment"
                }">${index + 1}</td>
                <td>${comment.creator===null?"null":`${comment.creator.name}`}</td>
                <td>${comment.course}</td>
                <td>${comment.createdAt.slice(0, 10)}</td>
                <td>${comment.score}</td>
                <td>
                    <button type='button'  onclick="showCommentBody('${ comment.body }')" class='w-full py-1 cursor-pointer  rounded-sm text-slate-100 bg-orange-3'>مشاهده</button>
                </td>
                <td>
                    <button type='button' class='w-full py-1 cursor-pointer  rounded-sm text-slate-100 bg-orange-1'>پاسخ</button>
                </td>
                <td>
                    <button type='button'  onclick="acceptComment('${ comment._id}')" class='w-full py-1 cursor-pointer  rounded-sm text-slate-100 bg-orange-1'>تایید</button>
                </td>
                <td>
                    <button type='button'  onclick="rejectComment('${ comment._id }')" class='w-full py-1 cursor-pointer  rounded-sm text-slate-100 bg-orange-2'>رد</button>
                </td>
                <td>
                    <button type='button' class='w-full py-1 cursor-pointer  rounded-sm text-slate-100 bg-orange-3'>حذف</button>
                </td>
            </tr>
            <tr class="divider-row">
            <td  colspan="9"><hr class="border-gray-3"></td>
        </tr>
        `)
    })


}
const showCommentBody = (commentBody) => {
    showSwal(
        commentBody,
        undefined,
        "دیدم",
        () => {}
    )
}
const acceptComment = async (commentID) => {
    showSwal(
      "آیا از تایید کامنت اطمینان دارید؟",
      "warning",
      ["نه", "آره"],
      async (result) => {
        if (result) {
          const res = await fetch(
            `http://localhost:4000/v1/comments/accept/${commentID}`,
            {
              method: "PUT",
              headers: {
                Authorization: `Bearer ${getToken()}`,
              },
            }
          );
          if (res.ok) {
            showSwal(
              "کامنت مورد نظر با موفقیت تایید شد",
              "success",
              "خیلی هم عالی",
              () => {
                getAndShowAllComments();
              }
            );
          }
        }
      }
    );
  };
  
  const rejectComment = async (commentID) => {
  
      showSwal(
          "آیا از رد کامنت اطمینان دارید؟",
          "warning",
          ["نه", "آره"],
          async (result) => {
            if (result) {
              const res = await fetch(
                `http://localhost:4000/v1/comments/reject/${commentID}`,
                {
                  method: "PUT",
                  headers: {
                    Authorization: `Bearer ${getToken()}`,
                  },
                }
              );
              if (res.ok) {
                showSwal(
                  "کامنت مورد نظر با موفقیت رد شد",
                  "success",
                  "خیلی هم عالی",
                  () => {
                    getAndShowAllComments();
                  }
                );
              }
            }
          }
        );
  
  };
  
export {
    getAndShowAllComments,showCommentBody,acceptComment,rejectComment
}