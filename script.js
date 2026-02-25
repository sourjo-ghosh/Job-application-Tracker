let currentTab = "all"
// cards container
const allCards = document.getElementById('all-cards')
const interviewCards = document.getElementById('interview-cards')
const rejectedCards = document.getElementById('rejected-cards')

// Dashboard section updating 
let totalCount = document.getElementById("total-count");
let interviewCount = document.getElementById("interview-count");
let rejectedCount = document.getElementById("rejected-count");

const showingCount = document.getElementById('showing-count')

const jobsContainer = document.getElementById('jobs-container')

// no-jobs container
const noJobs = document.getElementById('no-jobs');



// Tab switching function
let tabSection = document.getElementsByClassName('btn');
for (let tab of tabSection) {
    tab.addEventListener('click', function (e) {
        allCards.classList.add('hidden')
        interviewCards.classList.add('hidden')
        rejectedCards.classList.add('hidden')
        for (let btn of tabSection) {
            btn.classList.remove('bg-[#3B82F6]', 'text-white')
            btn.classList.add('bg-white', 'text-[#64748B]')
        }
        e.target.classList.remove('bg-white', 'text-[#64748B]')
        e.target.classList.add('bg-[#3B82F6]', 'text-white')
        noJobs.classList.add('hidden')
        if (e.target.id === "all-btn") {
            currentTab = "all"
            allCards.classList.remove('hidden')
            noJobs.classList.remove('hidden')
            updateCount()
        } else if (e.target.id === "interview-btn") {
            interviewCards.classList.remove('hidden')
            if (interviewCards.children.length < 1) {
                currentTab = "interview"
                noJobs.classList.remove('hidden')
                updateCount()
            }
        } else if (e.target.id === "rejected-btn") {
            rejectedCards.classList.remove('hidden');
            if (rejectedCards.children.length < 1) {
                currentTab = "rejected"
                noJobs.classList.remove('hidden')
                updateCount()
            }
        }
    })
}
// By default all tab will be visible 
allCards.classList.remove('hidden')

jobsContainer.addEventListener('click', function (e) {
    const clickedElement = e.target;
    const card = clickedElement.closest('.card')
    const cardParent = card.parentNode;
    const status = document.querySelector('.status')
    if (clickedElement.classList.contains("interview-btn")) {
        interviewCards.appendChild(card)
        updateCount()
        status.innerText = "Interviewed"
    } else if (clickedElement.classList.contains("rejected-btn")) {
        rejectedCards.appendChild(card)
        updateCount()
        status.innerText = "Rejected"
    } else if (clickedElement.classList.contains("delete-btn")) {
        cardParent.removeChild(card)
        updateCount()
        if (cardParent.children.length < 1) {
            noJobs.classList.remove('hidden')
        }
    }
})

function updateCount() {
    const counts = {
        all: allCards.children.length,
        interview: interviewCards.children.length,
        rejected: rejectedCards.children.length
    }
    totalCount.innerText = counts.all + counts.interview + counts.rejected
    interviewCount.innerText = counts.interview;
    rejectedCount.innerText = counts.rejected;
    if (currentTab === "all") {
        showingCount.innerText = counts.all
    } else if (currentTab === "interview") {
        showingCount.innerText = counts.interview
    } else if (currentTab === "rejected") {
        showingCount.innerText = counts.rejected
    }
}

updateCount()