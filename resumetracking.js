// window.onload = () => {
//     loadResumes()
// }

// window.onclick = function (event) {
//     var modal = document.getElementById("myModal");
//     if (event.target == modal) {
//         modal.style.display = "none";
//     }

//     document.getElementById("add-btn").onclick = function () {
//         document.getElementById("myModal").style.display = "block";
//     }
// }

// document.addEventListener('DOMContentLoaded', () => {
//     let company = document.getElementsByName("company")[0]
//     let link = document.getElementsByName("link")[0]
//     let dateSubmit = document.getElementsByName("date-submit")[0]
//     let status = document.getElementsByName("status")[0]

//     // Lấy dữ liệu từ chrome.storage khi mở popup
//     chrome.storage.local.get(['company', 'link', 'dateSubmit', 'status'], function (result) {
//         company.value = result.company || '';
//         link.value = result.link || '';
//         dateSubmit.value = result.dateSubmit || '';
//         status.value = result.status || 'Pending';

//     });

//     // Lưu dữ liệu vào chrome.storage khi có sự thay đổi trong input
//     company.addEventListener('input', function () {
//         chrome.storage.local.set({ 'company': company.value });
//     });
//     link.addEventListener('input', function () {
//         chrome.storage.local.set({ 'link': link.value });
//     });
//     dateSubmit.addEventListener('input', function () {
//         chrome.storage.local.set({ 'dateSubmit': dateSubmit.value });
//     });
//     status.addEventListener('change', function () {
//         chrome.storage.local.set({ 'status': status.value });
//     });    
// });

// function loadResumes() {
//     let s = document.getElementById("tbody")
//     resumes = JSON.parse(localStorage.getItem("resumes"));
//     result = ''
//     if (resumes.length > 0) {
//         i = 0
//         resumes.forEach(e => {
//             i++
//             result += `<tr><td>#${i}</td>
//                 <td>${e.company}</td>
//                 <td><a target="_blank" href="${e.url_job}">Link</a></td>
//                 <td><time datetime="${e.date_submit}">${new Date(e.date_submit).toLocaleDateString()}</time></td>
//                 <td>${e.status}</td>
//                 <td><button type="button" class="btn-delete" onclick="deleteResume(${i})" >X</button>
//                 <button type="button" class="btn-detail" onclick="updateResume(${i})" >?</button></td>
//                 </tr>`;
//         });
//     } else {
//         result = '<td style="text-align:center" colspan="6">NO DATA</td>'
//     }
//     s.innerHTML = result;
// }
// //button add

// document.getElementsByClassName("ok")[0].addEventListener("click", function () {
//     addResume()
// })

// document.getElementsByClassName("close")[0].addEventListener("click", () => {
//     document.getElementById("myModal").style.display = "none"
// })

// function addResume() {
//     let company = document.getElementsByName("company")[0]
//     let link = document.getElementsByName("link")[0]
//     let dateSubmit = document.getElementsByName("date-submit")[0]
//     let status = document.getElementsByName("status")[0]
//     console.log(company, link, dateSubmit, status)

//     let resumes = []
//     //first time
//     if (localStorage.getItem("resumes") === null) {
//         alert("Initialize resume !");
//     } else {
//         resumes = JSON.parse(localStorage.getItem("resumes"));
//     }
//     const resume = {
//         id: resumes.length,
//         company: company.value,
//         url_job: link.value,
//         date_submit: new Date(dateSubmit.value).toLocaleString("en-US", { timeZone: "Asia/Ho_Chi_Minh" }),
//         status: status.value
//     };

//     console.log(resumes.length)
//     resumes.push(resume)
//     localStorage.setItem("resumes", JSON.stringify(resumes));
//     loadResumes();

//     company.value = '', link.value = '', dateSubmit.value = '', status.value = 'Pending';
//     document.getElementById("myModal").style.display = "none";
// }

// function updateResume(id) {
//     let resumes = JSON.parse(localStorage.getItem("resumes"));
//     let resume = resumes[id - 1];
//     console.log(resume)

//     let company = document.getElementsByName("company")[0]
//     let link = document.getElementsByName("link")[0]
//     let dateSubmit = document.getElementsByName("date-submit")[0]
//     let status = document.getElementsByName("status")[0]
//     console.log(company, link, dateSubmit, status)

//     company.value = resume.company
//     link.value = resume.url_job
//     dateSubmit.value = new Date(resume.date_submit).toISOString().substring(0, 10)
//     status.value = resume.status

//     document.getElementsByClassName("ok")[0].value = "Save"
//     document.getElementById("myModal").style.display = "block"
// }

// function deleteResume(id) {
//     console.log(id - 1)
//     let resumes = JSON.parse(localStorage.getItem("resumes"));
//     resumes.splice(resumes.indexOf(resumes[id - 1]), 1);
//     localStorage.setItem("resumes", JSON.stringify(resumes));
//     loadResumes();
// }

// function searchResume() {
//     console.log('a')
// }

window.onload = () => {
    loadResumes()
}

document.getElementById("add-btn").onclick = function () {
    document.getElementById("myModal").style.display = "block";
}

document.addEventListener('DOMContentLoaded', () => {
    let company = document.getElementsByName("company")[0]
    let link = document.getElementsByName("link")[0]
    let dateSubmit = document.getElementsByName("date-submit")[0]
    let status = document.getElementsByName("status")[0]

    // Load data from chrome.storage when popup opens
    chrome.storage.local.get(['company', 'link', 'dateSubmit', 'status'], function (result) {
        company.value = result.company || '';
        link.value = result.link || '';
        dateSubmit.value = result.dateSubmit || '';
        status.value = result.status || 'Pending';
    });

    // Save data to chrome.storage on input change
    company.addEventListener('input', function () {
        chrome.storage.local.set({ 'company': company.value });
    });
    link.addEventListener('input', function () {
        chrome.storage.local.set({ 'link': link.value });
    });
    dateSubmit.addEventListener('input', function () {
        chrome.storage.local.set({ 'dateSubmit': dateSubmit.value });
    });
    status.addEventListener('change', function () {
        chrome.storage.local.set({ 'status': status.value });
    });
});

function loadResumes() {
    let s = document.getElementById("tbody")
    let resumes = JSON.parse(localStorage.getItem("resumes") || "[]");
    let result = ''

    if (resumes.length > 0) {
        resumes.forEach((e, i) => {
            result += `<tr>
                <td>#${i + 1}</td>
                <td>${e.company}</td>
                <td><a target="_blank" href="${e.url_job}">Link</a></td>
                <td><time datetime="${e.date_submit}">${new Date(e.date_submit).toLocaleDateString()}</time></td>
                <td>${e.status}</td>
                <td>
                    <button type="button" class="btn-delete" data-id="${i}">X</button>
                </td>
            </tr>`;
        });
        //<button type="button" class="btn-detail" data-id="${i}">?</button>
    } else {
        result = '<td style="text-align:center" colspan="6">NO DATA</td>';
    }
    s.innerHTML = result;

    // Delegate events for dynamically created buttons
    s.addEventListener('click', function (event) {
        if (event.target.classList.contains('btn-delete')) {
            deleteResume(event.target.dataset.id);
        }
        if (event.target.classList.contains('btn-detail')) {
            updateResumeButton(event.target.dataset.id);
        }
    });
}

document.getElementsByClassName("ok")[0].addEventListener("click", function () {
    addResume()
});

document.getElementsByClassName("close")[0].addEventListener("click", () => {
    document.getElementById("myModal").style.display = "none"
});

function addResume() {
    let company = document.getElementsByName("company")[0]
    let link = document.getElementsByName("link")[0]
    let dateSubmit = document.getElementsByName("date-submit")[0]
    let status = document.getElementsByName("status")[0]

    let resumes = JSON.parse(localStorage.getItem("resumes") || "[]");
    const resume = {
        id: resumes.length,
        company: company.value,
        url_job: link.value,
        date_submit: new Date(dateSubmit.value).toLocaleString("en-US", { timeZone: "Asia/Ho_Chi_Minh" }),
        status: status.value
    };

    resumes.push(resume);
    localStorage.setItem("resumes", JSON.stringify(resumes));
    loadResumes();
    company.value = '', link.value = '', dateSubmit.value = '', status.value = 'Applied';

    chrome.storage.local.set({ 'company': company.value });
    chrome.storage.local.set({ 'link': link.value });
    chrome.storage.local.set({ 'dateSubmit': dateSubmit.value });
    chrome.storage.local.set({ 'status': status.value });

    document.getElementById("myModal").style.display = "none";
}
// 
function updateResume(id) {
    let resumes = JSON.parse(localStorage.getItem("resumes"));
    let resume = resumes[id];
    let company = document.getElementsByName("company")[0]
    let link = document.getElementsByName("link")[0]
    let dateSubmit = document.getElementsByName("date-submit")[0]
    let status = document.getElementsByName("status")[0]

    company.value = resume.company;
    link.value = resume.url_job;
    resume.date_submit = new Date(dateSubmit).toISOString().substring(0, 10);
    resume.status = status.value;

    document.getElementById("myModal").style.display = "none";
}

function updateResumeButton(id) {
    let resumes = JSON.parse(localStorage.getItem("resumes"));
    let resume = resumes[id];
    let company = document.getElementsByName("company")[0]
    let link = document.getElementsByName("link")[0]
    let dateSubmit = document.getElementsByName("date-submit")[0]
    let status = document.getElementsByName("status")[0]

    company.value = resume.company;
    link.value = resume.url_job;
    dateSubmit.value = isNaN(resume.date_submit) ? new Date(resume.date_submit).toISOString().substring(0, 10) : '';
    status.value = resume.status;

    document.getElementsByClassName("ok")[0].value = "save";
    document.getElementsByClassName("ok")[0].className = "save";

    document.getElementById("myModal").style.display = "block";
    document.getElementsByClassName("save")[0].onclick=updateResume(id)
}
// 


function deleteResume(id) {
    let resumes = JSON.parse(localStorage.getItem("resumes"));
    resumes.splice(id, 1);
    localStorage.setItem("resumes", JSON.stringify(resumes));
    loadResumes();
}

function searchResume() {
    console.log('search functionality can be added here');
}
