const allBtn = document.querySelector("#allBtn");
const openBtn = document.querySelector("#openBtn");
const closedBtn = document.querySelector("#closedBtn");
const issueContainer = document.querySelector("#issueContainer");
const issueCount = document.querySelector("#issueCount");

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
<div onClick="my_modal_5.showModal()"> 

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