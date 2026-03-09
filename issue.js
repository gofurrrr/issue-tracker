const allBtn = document.querySelector("#allBtn");
const openBtn = document.querySelector("#openBtn");
const closedBtn = document.querySelector("#closedBtn");
const issueContainer = document.querySelector("#issueContainer");
const issueCount = document.querySelector("#issueCount");
const searchInput = document.querySelector("#searchOption");

async function searchIssues(searchText){
const res = await fetch(`https://phi-lab-server.vercel.app/api/v1/lab/issues/search?q=${searchText}`);
const data = await res.json();
displayIssues(data.data);

}


searchInput.addEventListener("keyup", function(){
const text = searchInput.value;

    if(text === ""){
        displayIssues(allIssues);
        return;
    }

searchIssues(text);
});


const loadIssueDetail = async(id) => {
    const url = `https://phi-lab-server.vercel.app/api/v1/lab/issue/${id}`;
    const res = await fetch(url);
    const details = await res.json();
    displayIssueDetails(details.data);
}

const displayIssueDetails = (issue) => {
    console.log(issue);
    const detailsIssue = document.getElementById("details-container");
     detailsIssue.innerHTML= `
     
            <h2 class="text-lg font-semibold pb-2">${issue.title}</h2>
        <div class="flex gap-3 items-center pb-2 text-gray-500 ">
            <button class="text-white bg-green-500 rounded-3xl border-1 border-green-400 text-sm px-4 py-2">${issue.status}</button>
            <p>-</p>
            <p>Opened by ${issue.assignee}</p>
            <p>-</p>
            <p>${issue.createdAt}</p>
        </div>
        <div class="flex items-center gap-3">
            <button class="text-[#EF4444] border-[#EF4444] bg-[#FEECEC] rounded-3xl border-1 text-sm px-4 py-2 ">Bug</button>
            <button class="text-[#D97706] bg-[#FFF8DB] rounded-3xl  text-sm px-4 py-2 border-1 border-[#D97706]">help wanted</button>
        </div>
            <p class="pb-6 pt-3 text-gray-500">${issue.description}</p>
        <div class="flex items-center gap-36 text-gray-500">
            <p >Assignee:</p>
            <p>Priority:</p>
        </div>
        <div class="flex items-center gap-36">
            <p class="font-semibold text-sm">${issue.assignee}</p>
            <button class="text-white bg-red-500 rounded-3xl border-none text-sm px-3 py-1">${issue.priority}</button>
        </div>
     `;
    document.getElementById("my_modal_5").showModal();
}

let allIssues= [];

    async function loadIssues(){

    const res = await fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues");
    const data = await res.json();
    allIssues = data.data;
displayIssues(allIssues);
}

loadIssues();


function displayIssues(issues){

issueContainer.innerHTML = "" ;
issueCount.innerText = issues.length;

issues.forEach(issue => {
let shadowColor = "";


if(issue.status ==="open"){
shadowColor = "border-t-4 border-green-500";

}
else{
shadowColor = "border-t-4 border-purple-500";

}

const div = document.createElement("div");

div.className = `bg-white shadow-md rounded-lg p-4 ${shadowColor}`;

div.innerHTML = `
<div onClick="loadIssueDetail(${issue.id})"> 

<h3 class="font-bold text-lg mb-2">${issue.title}</h3>

<p class="text-gray-500 text-sm mb-2">${issue.description || ""}</p>

<hr class="text-gray-200 ">

<p class="text-gray-500 text-sm mb-2">#1 by ${issue.author}</p>

<p class="text-gray-500 text-sm mb-2">${issue.createdAt}</p>

</div>
`;
 issueContainer.appendChild(div);

}
);

}

function activeButton(btn){

allBtn.classList.remove("btn-primary");
openBtn.classList.remove("btn-primary");
closedBtn.classList.remove("btn-primary")
btn.classList.add("btn-primary");
}

allBtn.addEventListener("click", ()=>{

    activeButton(allBtn);
    displayIssues(allIssues);

});

openBtn.addEventListener("click", ()=>{
activeButton(openBtn);
const openIssues = allIssues.filter(issue => issue.status === "open");

        displayIssues(openIssues);

});

closedBtn.addEventListener("click", ()=>{
activeButton(closedBtn);
const closedIssues = allIssues.filter(issue => issue.status === "closed");
displayIssues(closedIssues);

});

// fiinish

