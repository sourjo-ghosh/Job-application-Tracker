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
        // console.log('Interview button clicked');
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
        // console.log('Rejected button clicked');
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

        // console.log('Interview List:', interviewList);
        // console.log('Rejected List:', rejectedList);
        
        calculateCount();
        updateShowingCount();
    }

    // delete button click korle - card remove korbo
    if (event.target.classList.contains('delete-btn') || event.target.closest('.delete-btn')) {
        const deleteBtn = event.target.classList.contains('delete-btn') ? event.target : event.target.closest('.delete-btn');
        const parentNode = deleteBtn.parentNode.parentNode;
        const companyName = parentNode.querySelector('h2').innerText;

        // allCards theke card oo ta remove korbo
        parentNode.remove();

        // interviewList theke oo remove korbo
        interviewList = interviewList.filter(item => item.companyName != companyName);

        // rejectedList theke oo remove korbo
        rejectedList = rejectedList.filter(item => item.companyName != companyName);

        calculateCount();

        // jeita filtered view active ache seita re-render korbo
        if (!filteredSection.classList.contains('hidden')) {
            if (interviewBtn.classList.contains('bg-[#3B82F6]')) {
                renderInterview();
            } else if (rejectedBtn.classList.contains('bg-[#3B82F6]')) {
                renderRejected();
            }
        }

        updateShowingCount();
    }
})


// tab button gulo select kora
const buttons = document.querySelectorAll('.btn')

buttons.forEach(button => {
    button.addEventListener('click', (e) => {

        // sob button theke active style soriya felbo
        buttons.forEach(btn => {
            btn.classList.remove('bg-[#3B82F6]', 'text-white')
            btn.classList.add('bg-white', 'text-[#64748B]')
        })

        // clicked button ei just oi active stule ta add korbo e parametar diya
        e.target.classList.remove('bg-white', 'text-[#64748B]')
        e.target.classList.add('bg-[#3B82F6]', 'text-white')

        // konta click hoise tar upor depend kore cards show korbo 
        if (e.target == interviewBtn) {
            allCards.classList.add('hidden')
            filteredSection.classList.remove('hidden')
            renderInterview()
            updateShowingCount()
        } else if (e.target == rejectedBtn) {
            allCards.classList.add('hidden')
            filteredSection.classList.remove('hidden')
            renderRejected()
            updateShowingCount()
        } else if (e.target == allBtn) {
            allCards.classList.remove('hidden')
            filteredSection.classList.add('hidden')
            noJobs.classList.add('hidden')
            noJobs.classList.remove('flex')
            updateShowingCount()
        }
    })
})


// interview tab er jonno cards render korar function
function renderInterview() {
    filteredSection.innerHTML = '';
    filteredSection.classList.add('space-y-4');

    if (interviewList.length === 0) {
        filteredSection.classList.add('hidden')
        noJobs.classList.remove('hidden')
        noJobs.classList.add('flex')
        return
    }

    noJobs.classList.add('hidden')
    noJobs.classList.remove('flex')

    for (let job of interviewList) {
        let div = document.createElement('div')
        div.className = 'bg-white border-1 border-gray-100 p-6 flex flex-col md:flex-row justify-between gap-4 md:gap-0'
        // template literal interpolation diya info gulu ke update korbo
        div.innerHTML = `
            <div class="part-one space-y-3">
                <h2>${job.companyName}</h2>
                <p class="text-[#64748B]">${job.position}</p>
                <p class="text-[#64748B]">${job.details}</p>
                <button class="status py-2 px-5 rounded-lg bg-[white] text-[#3B82F6] shadow cursor-pointer">${job.status}</button>
                <p>${job.description}</p>
                <div class="flex gap-3">
                    <button class="interview-action py-2 px-5 rounded-lg bg-[#10B981] text-white shadow cursor-pointer">Interview</button>
                    <button class="rejected-action py-2 px-5 rounded-lg bg-[#EF4444] text-white shadow cursor-pointer">Rejected</button>
                </div>
            </div>
            <div class="delete-btn">
                <button class="delete-btn border border-gray-200 rounded-full p-2 text-[#64748B] cursor-pointer"><i class="fa-solid fa-trash-can"></i></button>
            </div>
        `
        filteredSection.appendChild(div)
    }
}


// rejected tab er jonno cards render korar function
function renderRejected() {
    filteredSection.innerHTML = '';
    filteredSection.classList.add('space-y-4');

    if (rejectedList.length === 0) {
        filteredSection.classList.add('hidden')
        noJobs.classList.remove('hidden')
        noJobs.classList.add('flex')
        return
    }

    noJobs.classList.add('hidden')
    noJobs.classList.remove('flex')

    for (let job of rejectedList) {
        let div = document.createElement('div')
        div.className = 'bg-white border-1 border-gray-100 p-6 flex flex-col md:flex-row justify-between gap-4 md:gap-0'
        div.innerHTML = `
            <div class="part-one space-y-3">
                <h2>${job.companyName}</h2>
                <p class="text-[#64748B]">${job.position}</p>
                <p class="text-[#64748B]">${job.details}</p>
                <button class="status py-2 px-5 rounded-lg bg-[white] text-[#3B82F6] shadow cursor-pointer">${job.status}</button>
                <p>${job.description}</p>
                <div class="flex gap-3">
                    <button class="interview-action py-2 px-5 rounded-lg bg-[#10B981] text-white shadow cursor-pointer">Interview</button>
                    <button class="rejected-action py-2 px-5 rounded-lg bg-[#EF4444] text-white shadow cursor-pointer">Rejected</button>
                </div>
            </div>
            <div class="delete-btn">
                <button class="delete-btn border border-gray-200 rounded-full p-2 text-[#64748B] cursor-pointer"><i class="fa-solid fa-trash-can"></i></button>
            </div>
        `
        filteredSection.appendChild(div)
    }
}
