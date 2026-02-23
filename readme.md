1. What is the difference between getElementById, getElementsByClassName, and querySelector / querySelectorAll?

ans- getelementbyid ba class diya amra just kunu akta speacefic ba element ke pete pari, and class diya oi same class ar sob gulu element pete pari
and queryselector diya css ar moto . ba # diya element ba class ba id pete pari, and queryselectorall diya oi same class ar sob gulu element pete pari.


2. How do you create and insert a new element into the DOM?

ans- first a oi element ta ke create korbo 

const p = document.createElement('p');
inntertext add kora 
p.innterText = 'Hi this is joy ghosh sourjo, and am really happpy to learn  and do codinggggggggggg'

than amra jei parent element a add korte chai oitar sathe append kore dibo 

const parent = document.getElementById('parent');
parent.appendChild(p);

3. What is Event Bubbling? And how does it work?

ans- event bubbling hocce, jokhon amra kunu akta element a event lister add kori tokhon aita sudhu oi akta element a eii lage oita tar parent tar parent tar parent oo lage,

jemon, 

<main>
    <section>
        <div>
            <header>
                <nav>
                    <ul>
                        <li><a href="#">Home</a></li>
                        <li><a href="#">About</a></li>
                        <li><a href="#">Contact</a></li>
                    </ul>
                </nav>
            </header>
        </div>
    </section>
</main>


ei khane jodi amra home(a tag) ba about a event lister add kori toh aita a tag theke li, ul, nav, header amon kore main section porjonto chole jay, 
and normally aitakei event bubbling bole.

4. What is Event Delegation in JavaScript? Why is it useful?

ans- event delegation hocce kunu akta parent ar bhitor jodi akadik element thake and amra cai oi parent bhitor 4 button thakle 4 button ke diya char type ar kaj korate chai, akhon 4 button a jodi 4 event delegation add kori toh aita memory ar opor pressure create kore, and jodi oi parent ar bhitor 4 button thake and amra oi parent a event lister add kori toh aita memory ar opor pressure create kore na, and aitakei event delegation bole. 
aita akta event delegation ar example 

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



ei khane amra bolci je event ar target ar classlist a rejected action btn thake oi akta oparation ghotbe.

5. What is the difference between preventDefault() and stopPropagation() methods?

ans- preventdefault ei topic ta amer clear hoy ni but ami joto jani je aita tar normall behaviour ke prevent kore.

and stoppropagation hocce event bubbling ke stop kore, jemon amra jodi akta a tag a click kori toh aita normally 
ar parent element ar jay aita aber oitar parent a element ooo jay kintu jodi stopProgation() add kori toh aita ar parent element ba tar upor a uthe na oikhane ar kaj ses hoye jay.