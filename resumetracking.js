window.onload = () => {
    loadResumes()
}
function loadResumes() {
    let s = document.getElementById("tbody")
    resumes = JSON.parse(localStorage.getItem("resumes"));
    result = ''
    if (resumes.length > 0) {
        i = 0
        resumes.forEach(e => {
            i++
            result += '<tr><td>#' + (i) + '</td>' +
                '<td>' + (e.company) + '</td>' +
                '<td><a target="_blank" href="' + (e.url_job) + '">Link</a></td>' +
                '<td><time datetime="' + (e.date_submit) + '">' + new Date(e.date_submit).toLocaleDateString() + '</time></td>' +
                '<td>' + (e.status) + '</td>' +
                '<td><button type="button" class="btn-delete" onclick="deleteResume(' + i + ')" >X</button></td>' +
                '</tr>';
        });
    } else {
        result = '<td style="text-align:center" colspan="6">NO DATA</td>'
    }
    s.innerHTML = result;
}
//button add
document.getElementById("add-btn").onclick = function () {
    document.getElementById("myModal").style.display = "block";
}

window.onclick = function (event) {
    var modal = document.getElementById("myModal");
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

document.getElementsByClassName("ok")[0].addEventListener("click", function () {
    addResume()
})
document.getElementsByClassName("close")[0].addEventListener("click", () => {
    document.getElementById("myModal").style.display = "none"
})

function addResume() {
    let company = document.getElementsByName("company")[0]
    let link = document.getElementsByName("link")[0]
    let dateSubmit = document.getElementsByName("date-submit")[0]
    let status = document.getElementsByName("status")[0]
    console.log(company, link, dateSubmit, status)

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

    console.log(resumes.length)
    resumes.push(resume)
    localStorage.setItem("resumes", JSON.stringify(resumes));
    loadResumes();

    company.value = '', link.value = '', dateSubmit.value = '', status.value = 'Pending';
    document.getElementById("myModal").style.display = "none";
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