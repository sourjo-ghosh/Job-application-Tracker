// cards container
const allCards = document.getElementById('all-cards')
const interviewCards = document.getElementById('interview-cards')
const rejectedCards = document.getElementById('rejected-cards')

// console.log(allCards, interviewCards , rejectedCards)

// Tab switching function
let tabSection = document.getElementsByClassName('btn');
for (let tab of tabSection) {
    tab.addEventListener('click', function (e) {
        console.log(e.target.innerText)
        allCards.classList.add('hidden')
        interviewCards.classList.add('hidden')
        rejectedCards.classList.add('hidden')
        for (let btn of tabSection) {
            btn.classList.remove('bg-[#3B82F6]', 'text-white')
            btn.classList.add('bg-white', 'text-[#64748B]')
        }
        e.target.classList.remove('bg-white', 'text-[#64748B]')
        e.target.classList.add('bg-[#3B82F6]', 'text-white')
        if (e.target.id === "all-btn") {
            allCards.classList.remove('hidden')
        } else if (e.target.id === "interview-btn") {
            interviewCards.classList.remove('hidden')
        } else if (e.target.id === "rejected-btn") {
            rejectedCards.classList.remove('hidden')
        }
    })
}
// By default all tab will be visible 
allCards.classList.remove('hidden')


// Dashboard section updating 
let totalCount = document.getElementById("total-count");
let interviewCount = document.getElementById("interview-count");
let rejectedCount = document.getElementById("rejected-count");
// console.log(totalCount, interviewCount, rejectedCount)

totalCount.innerText = allCards.children.length;
interviewCount.innerText = interviewCards.children.length;
rejectedCount.innerText = rejectedCards.children.length;