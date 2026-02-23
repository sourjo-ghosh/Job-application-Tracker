let interviewList = [];
let rejectedList = [];

let totalCount = document.getElementById("total-count");
let interviewCount = document.getElementById("interview-count");
let rejectedCount = document.getElementById("rejected-count");

const allBtn = document.getElementById('all-btn');
const interviewBtn = document.getElementById('interview-btn');
const rejectedBtn = document.getElementById('rejected-btn');
const filteredSection = document.getElementById('filtered-section');

const allCards = document.getElementById('all-cards');
const showingCount = document.getElementById('showing-count');
const noJobs = document.getElementById('no-jobs');

const mainContainer = document.querySelector('main');
// // check kore nai thik moto paisi kina 
// console.log(totalCount, interviewCount, rejectedCount);
// console.log(allBtn, interviewBtn, rejectedBtn);
// console.log(mainContainer);


// count update korar jonno akta function
function calculateCount() {
    totalCount.innerText = allCards.children.length;
    interviewCount.innerText = interviewList.length;
    rejectedCount.innerText = rejectedList.length;
}

// showing count update (tab onujei)
function updateShowingCount() {
    if (allBtn.classList.contains('bg-[#3B82F6]')) {
        showingCount.innerText = allCards.children.length;
    } else if (interviewBtn.classList.contains('bg-[#3B82F6]')) {
        showingCount.innerText = interviewList.length;
    } else if (rejectedBtn.classList.contains('bg-[#3B82F6]')) {
        showingCount.innerText = rejectedList.length;
    }
}

calculateCount()
updateShowingCount()


// Interview & Rejected button click - event delegation
mainContainer.addEventListener('click', function (event) {

    // Interview button click korle
    if (event.target.classList.contains('interview-action')) {
        console.log('Interview button clicked');
        const parentNode = event.target.parentNode.parentNode;
        const companyName = parentNode.children[0].innerText;
        const position = parentNode.children[1].innerText;
        const details = parentNode.children[2].innerText;
        const status = parentNode.querySelector('.status').innerText;
        const description = parentNode.children[4].innerText;

        const jobData = {
            companyName,
            position,
            details,
            status,
            description
        }

        // age theke rejected list e thakle, eikhan theke soriya felbo
        rejectedList = rejectedList.filter(item => item.companyName != jobData.companyName);

        // status update korbo
        parentNode.querySelector('.status').innerText = 'Interview';

        // already interview list e na thakle add korbo
        const jobExist = interviewList.find(item => item.companyName == jobData.companyName);
        if (!jobExist) {
            jobData.status = 'Interview';
            interviewList.push(jobData);
        }

        // console.log('Interview List:', interviewList);
        // console.log('Rejected List:', rejectedList);

        calculateCount();
        updateShowingCount();
    }

    // Rejected button click korle
    if (event.target.classList.contains('rejected-action')) {
        console.log('Rejected button clicked');
        const parentNode = event.target.parentNode.parentNode;
        const companyName = parentNode.children[0].innerText;
        const position = parentNode.children[1].innerText;
        const details = parentNode.children[2].innerText;
        const status = parentNode.querySelector('.status').innerText;
        const description = parentNode.children[4].innerText;

        const jobData = {
            companyName,
            position,
            details,
            status,
            description
        }

        // age theke interview list e thakle, eikhan theke soriya felbo
        interviewList = interviewList.filter(item => item.companyName != jobData.companyName);

        // status update korbo
        parentNode.querySelector('.status').innerText = 'Rejected';

        // already rejected list e na thakle add korbo
        const jobExist = rejectedList.find(item => item.companyName == jobData.companyName);
        if (!jobExist) {
            jobData.status = 'Rejected';
            rejectedList.push(jobData);
        }

        console.log('Interview List:', interviewList);
        console.log('Rejected List:', rejectedList);

        calculateCount();
        updateShowingCount();
    }
})
