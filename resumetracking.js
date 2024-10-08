window.onload = () => {
    loadResumes()
}

document.getElementsByClassName("close")[0].addEventListener("click", () => {
    document.getElementById("myModal").style.display = "none"
})

window.onclick = function (event) {
    // 
    var modal = document.getElementById("myModal");
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

document.getElementById("add-btn").onclick = function () {
    let company = document.getElementsByName("company")[0]
    let link = document.getElementsByName("link")[0]
    let dateSubmit = document.getElementsByName("date-submit")[0]
    let status = document.getElementsByName("status")[0]
    company.value = '', link.value = '', dateSubmit.value = '', status.value = 'Applied';
    document.getElementsByClassName("ok")[0].onclick = () => {
        addResume()
    }
    document.getElementById("myModal").style.display = "block";
}

function loadResumes() {
    let s = document.getElementById("tbody")
    resumes = JSON.parse(localStorage.getItem("resumes"));
    result = ''
    if (resumes == null) {
        return s.innerHTML = '<td style="text-align:center" colspan="6">NO DATA</td>';
    }
    if (resumes.length > 0) {
        i = 0
        resumes.forEach(e => {
            i++
            result += `<tr><td>#${i}</td>
                <td>${e.company}</td>
                <td><a target="_blank" href="${e.url_job}">Link</a></td>
                <td><time datetime="${e.date_submit}">${new Date(e.date_submit).toLocaleDateString()}</time></td>
                <td>${e.status}</td>
                <td><button type="button" class="btn-delete" onclick="deleteResume(${i})" >X</button>
                <button type="button" class="btn-detail" onclick="detailResume(${i})" >?</button></td>
                </tr>`;
        });
    } else {
        result = '<td style="text-align:center" colspan="6">NO DATA</td>'
    }
    s.innerHTML = result;
}

function addResume() {
    let company = document.getElementsByName("company")[0]
    let link = document.getElementsByName("link")[0]
    let dateSubmit = document.getElementsByName("date-submit")[0]
    let status = document.getElementsByName("status")[0]
    // console.log(company, link, dateSubmit, status)

    let resumes = []
    //first time
    if (localStorage.getItem("resumes") === null) {
        alert("Initialize resume !");
    } else {
        resumes = JSON.parse(localStorage.getItem("resumes"));
    }
    const resume = {
        id: resumes.length,
        company: company.value,
        url_job: link.value,
        date_submit: new Date(dateSubmit.value).toLocaleString("en-US", { timeZone: "Asia/Ho_Chi_Minh" }),
        status: status.value
    };

    // console.log(resumes.length)
    resumes.push(resume)
    localStorage.setItem("resumes", JSON.stringify(resumes));
    loadResumes();

    company.value = '', link.value = '', dateSubmit.value = '', status.value = 'Applied';
    document.getElementById("myModal").style.display = "none";
}

function updateResume(id) {
    console.log(id)
    let resumes = JSON.parse(localStorage.getItem("resumes"));
    let resume = resumes[id];
    console.log(resumes, resume)

    let company = document.getElementsByName("company")[0]
    let link = document.getElementsByName("link")[0]
    let dateSubmit = document.getElementsByName("date-submit")[0]
    let status = document.getElementsByName("status")[0]
    console.log(company.value, link.value, dateSubmit.value, status.value)

    resume.company = company.value
    resume.url_job = link.value
    resume.date_submit = dateSubmit.value
    resume.status = status.value

    localStorage.setItem("resumes", JSON.stringify(resumes))
    loadResumes();
    company.value = '', link.value = '', dateSubmit.value = '', status.value = 'Applied';
    // document.getElementsByClassName("ok")[0].onclick = () => {
    //     addResume()
    // }
    document.getElementById("myModal").style.display = "none";
}

function detailResume(id) {
    console.log('id: ' + (id - 1))
    let resumes = JSON.parse(localStorage.getItem("resumes"));
    // console.log(resumes[id-1])
    let resume = resumes[id - 1];
    let company = document.getElementsByName("company")[0]
    let link = document.getElementsByName("link")[0]
    let dateSubmit = document.getElementsByName("date-submit")[0]
    let status = document.getElementsByName("status")[0]

    company.value = resume.company;
    link.value = resume.url_job;
    dateSubmit.value = new Date(resume.date_submit).toISOString().substring(0, 10);
    status.value = resume.status;

    document.getElementById("myModal").style.display = "block";
    document.getElementsByClassName("ok")[0].onclick = () => {
        updateResume(id - 1)
    }
}

function deleteResume(id) {
    console.log(id - 1)
    let resumes = JSON.parse(localStorage.getItem("resumes"));
    resumes.splice(resumes.indexOf(resumes[id - 1]), 1);
    localStorage.setItem("resumes", JSON.stringify(resumes));
    loadResumes();
}

function searchResume() {
    console.log('a')
}

// only extension
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
//         status.value = result.status || 'Applied';
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
