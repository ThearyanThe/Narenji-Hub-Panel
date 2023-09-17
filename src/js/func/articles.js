import { getToken,showSwal } from './utils.js'
let articleBodyEditor = null;
let articleCover = null;
let articleCategoryID = "-1";
const prepareCreateNewArticleForm = async () => {
    const categoryListElem = document.querySelector("#category-list");
    const articleCoverFileUploader = document.querySelector("#file");
  
    // Handle Article Body CkEditor
    ClassicEditor.create(document.querySelector("#editor"), {
      language: "fa",
    })
      .then((editor) => {
        articleBodyEditor = editor;
      })
      .catch((error) => {
        console.error(error);
      });
  
    // Handle Category IDs select box
    const res = await fetch(`http://localhost:4000/v1/category`);
    const categories = await res.json();
  
    categories.forEach((category) => {
      categoryListElem.insertAdjacentHTML(
        "beforeend",
        `
              <option value=${category._id}>${category.title}</option>
          `
      );
    });
  
    categoryListElem.addEventListener(
      "change",
      (event) => (articleCategoryID = event.target.value)
    );
  
    //   Handle Cover Uploader
    articleCoverFileUploader.addEventListener(
      "change",
      (event) => (articleCover = event.target.files[0])
    );
  };
  
  const createNewArticle = async () => {
    const titleInputElem = document.querySelector("#title");
    const shortNameInputElem = document.querySelector("#shortName");
    const descriptionInputElem = document.querySelector("#description");
  
    const formData = new FormData();
  
    formData.append("title", titleInputElem.value.trim());
    formData.append("description", descriptionInputElem.value.trim());
    formData.append("body", articleBodyEditor.getData());
    formData.append("shortName", shortNameInputElem.value.trim());
    formData.append("categoryID", articleCategoryID);
    formData.append("cover", articleCover);
  
    const res = await fetch(`http://localhost:4000/v1/articles`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
      body: formData,
    });
    if (res.ok) {
      showSwal("مقاله جدید با موفقیت ایجاد شد", "success", "خیلی هم عالی", () => {
        getAndShowAllArticles();
      });
    }
    else{
        showSwal("   مقادیر را درست وارد کنید", "error", " تصحیح ", () => {
            getAndShowAllArticles();
          });
    }
  };
const getAndShowAllArticles = async () => {
    const articlesListTableElem = document.querySelector('#tbody-articles')
    articlesListTableElem.innerHTML = ''

    const res = await fetch(`http://localhost:4000/v1/articles`, {
        headers: {
            Authorization: `Bearer ${getToken()}`
        }
    })

    const articles = await res.json()

    articles.forEach((article, index) => {
        articlesListTableElem.insertAdjacentHTML('beforeend', `
            <tr>                               
                <td>${index + 1}</td>
                <td>${article.title}</td>
                <td>
                    ${article.publish === 1 ? "منتشر شده" : "پیش نویس"}
                </td>
                <td>${article.createdAt.slice(0, 10)}</td>
                <td>${article.creator.name}</td>
                <td>
                    <button type="button" class="w-full py-1 cursor-pointer  rounded-sm text-slate-100 bg-orange-2" id="edit-btn">ویرایش</button>
                </td>
                <td>
                    <button type="button" onclick=removeArticle('${article._id }') class="w-full py-1  cursor-pointer  rounded-sm text-slate-100 bg-orange-1" id="delete-btn">حذف</button>
                </td>
            </tr>
            <tr class="divider-row">
            <td  colspan="9"><hr class="border-gray-3"></td>
        </tr>
        `)
    })

    console.log(articles);

}
const removeArticle = async (articleID) => {
    showSwal(
      "آیا از حذف مقاله اطمینان دارید؟",
      "warning",
      ["نه", "آره"],
      async (result) => {
        if (result) {
          const res = await fetch(
            `http://localhost:4000/v1/articles/${articleID}`,
            {
              method: "DELETE",
              headers: {
                Authorization: `Bearer ${getToken()}`,
              },
            }
          );
  
          if (res.ok) {
            showSwal(
              "مقاله مورد نظر با موفقیت حذف شد",
              "success",
              "خیلی هم عالی",
              () => {
                getAndShowAllArticles();
              }
            );
          }
        }
      }
    );
  };
export {
    getAndShowAllArticles,prepareCreateNewArticleForm,createNewArticle,removeArticle
}