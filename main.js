// *--------------------------------------------------
//*Start Explore Button
let exploreBtn = document.querySelector('.title .btn'),
    HadithSection = document.querySelector('.hadith');
exploreBtn.addEventListener('click',()=>{
    HadithSection.scrollIntoView({
        behavior : "smooth"
    })
})
//*End Explore Button
// *--------------------------------------------------


// *--------------------------------------------------
//*Start NavBar
let fixedNav = document.querySelector('.header'),
     scrollBtn = document.querySelector('.scrollBtn');
window.addEventListener("scroll",()=>{
    window.scrollY > 100 ? fixedNav.classList.add('active') : fixedNav.classList.remove('active');
    window.scrollY > 500 ?  scrollBtn.classList.add('active') : scrollBtn.classList.remove('active') ;
})
scrollBtn.addEventListener('click',()=>{
    window.scrollTo({
        top : 0,
        behavior : "smooth"
    })
})
//*End NavBar
// *--------------------------------------------------




// *--------------------------------------------------
//* Start Hadith Changer

let hadithContainer = document.querySelector('.hadithContainer'),
    next = document.querySelector('.buttons .next'),
    prev = document.querySelector('.buttons .prev'),
    number = document.querySelector('.buttons .number');
    let hadithIndex = 0;
    //* End Hadith Changer
// *--------------------------------------------------


// *--------------------------------------------------
//* Start Hadith Changer (API)
HadithChanger();
function HadithChanger()
{
    fetch("https://cdn.jsdelivr.net/gh/MkBEt/quran-api@1/hadith.json")
    .then(response => response.json())
    .then(data =>{
        
        let Hadiths = data.hadith;
        changeHadith();
        next.addEventListener('click',()=>{
            hadithIndex == 41 ? hadithIndex = 0 : hadithIndex++;
            changeHadith()
        })
        prev.addEventListener('click',()=>{
            hadithIndex == 0 ? hadithIndex = 41 : hadithIndex--;
            changeHadith()
        })
        function changeHadith()
        {
            hadithContainer.innerText = Hadiths[hadithIndex].text;
            number.innerText = ` ${hadithIndex + 1} - 42`
        }
    })
}
//* End Hadith Changer(API)
// *--------------------------------------------------


// *------------------------------------------------------
//*Start Link Section Connect From nav BarLink To Section
let sections = document.querySelectorAll("section"),
    links = document.querySelectorAll('.header ul li');
links.forEach(link => {
    link.addEventListener('click',()=>{
        document.querySelector('.header ul li.active').classList.remove('active');
        link.classList.add('active');
        let target = link.dataset.filter;
        sections.forEach(section=>{
            if(section.classList.contains(target))
            {
                section.scrollIntoView({
                    behavior : "smooth"
                })
            }
        })
    })
})

//*End Link Section Connect From nav BarLink To Section
// *----------------------------------------------------


// *------------------------------------------------------
//*Start Surah APi
let SurahsContainer = document.querySelector('.surhasContainer');
getSurahs()

function getSurahs()
{
    //fetch Surahs meta data {Name of SuraHS}
    fetch("https://cdn.jsdelivr.net/gh/MkBEt/quran-api@1/apam.json")
    .then(response => response.json())
    .then(data=>{
        let surahs = data.data;
        let numberOfSurahs = 114;
        SurahsContainer.innerHTML = "";
        for (let i = 0; i < numberOfSurahs ; i++) {
            
            SurahsContainer.innerHTML += 
                `
                    <div class="surah">
                        <p>${surahs[i].ar}</p>
                        <p1>${surahs[i].am}</p1>
                    </div>
                `
        }

        let SurahsTitels = document.querySelectorAll('.surah');
        let popup = document.querySelector('.surah-popup'),
            AyatContainer = document.querySelector('.ayat');
        SurahsTitels.forEach((title,index)=>{
            title.addEventListener('click',()=>{
                fetch(`https://cdn.jsdelivr.net/gh/fawazahmed0/quran-api@1/editions/amh-muhammedsadiqan/${index + 1}.min.json`)
                /*fetch(`https://cdn.jsdelivr.net/gh/fawazahmed0/quran-api@1/editions/ara-quranindopak/${index + 1}.min.json`)*/
                .then(response => response.json())
                .then(data=>{
                    AyatContainer.innerHTML = `
<p1> بِسۡمِ ٱللَّهِ ٱلرَّحۡمَـٰنِ ٱلرَّحِی </p1> <p>በአላህ ስም እጅግ በጣም ሩኅሩህ በጣም አዛኝ በኾነው፡፡</p>
                        `;
                    let Ayat = data.chapter;
                    
                     getSur(Ayat)
                     })
                
            })
        })
        let closePopup = document.querySelector('.close-popup');
        closePopup.addEventListener('click',()=>{
            popup.classList.remove('active');
        })
    })   
}
 
function getSur(Ayat)
{
	let popup = document.querySelector('.surah-popup'),
            AyatContainer = document.querySelector('.ayat');
        var chaa =Ayat[0]. chapter;
 fetch(`https://cdn.jsdelivr.net/gh/fawazahmed0/quran-api@1/editions/ara-quranacademy/${chaa}.min.json`)
                .then(response => response.json())
                .then(data=>{
                	 var ama = data.chapter;
 Ayat.forEach(aya=>{
 	                popup.classList.add('active');
         var amm= aya.verse  - 1
                        AyatContainer.innerHTML += `
                            <p1>${aya.verse}. ${ama[amm].text}</p1> <p> ${aya.text}</p>
                        `}) })
}
	
//*End Surah APi
// *------------------------------------------------------




// *------------------------------------------------------
//*Start Awkat Elsalah

let cards = document.querySelector('.cards');
getPrayTimes();
function getPrayTimes()
{
	var ts = Math.floor(Date.now() / 1000)-46788
    fetch("https://api.aladhan.com/v1/timingsByAddress/"+ts+"?address=Addis+ababa&method=3")
    .then(response => response.json())
    .then(data =>{
        let times = data.data.timings;

let hd = data.data.date.hijri.date;
let hw = data.data.date.hijri.weekday.en;
let hm = data.data.date.hijri.month.en;
let gd = data.data.date.gregorian.date;
let gw = data.data.date.gregorian.weekday.en;
let gm = data.data.date.gregorian.month.en;
		let holi = data.data.date.hijri.holidays;
        let txt = gd+" "+gm+" "+gw;
let txh = " "+hd+" "+hm+" "+hw+" ";
        cards.innerHTML =             `
                <div class="date">
                
                    <p>📅 ዛሬ በግሪጎሪያን ቀን: </p>
                    <p>${txt} </p>
                    <p>📅 ዛሬ በሂጅራ ቀን: </p>
                    <p>${txh} </p>
                </div>
            `
        for (let time in times)
        {
            if((time=="Firstthird")|(time=="Lastthird")|(time=="Imsak")|(time=="Sunset")|(time=="Midnight")){
          }else{
            cards.innerHTML+= 
            `
                <div class="card">
                    <div class="circle">
                        <svg>
                            <Circle cx="50" cy = "50" r ="50"></Circle>
                        </svg>
                        <div class="praytime">${times[time]}</div>
                    </div>
                    <p>${time}</p>
                </div>
            `
        }}
    })
}

//*End Awkat Elsalah
// *------------------------------------------------------

// *------------------------------------------------------
//*Start Active SideBar
let bars = document.querySelector('.bars'),
    SideBar = document.querySelector('.header ul');
bars.addEventListener('click',()=>{
    SideBar.classList.toggle("active");
})

//*End Active SideBar
// *------------------------------------------------------

// *------------------------------------------------------
//*Start Active SideBar

$(document).ready(function(){
    $(".loading .lds-ring").fadeOut(2000,function(){
        $(".loading").fadeOut(1000)
    })
})





//*End Active SideBar
// *------------------------------------------------------



// fetch("https://api.aladhan.com/v1/calendar?latitude=30.007413&longitude=31.4913182&method=1&timezonestring=Africa/Cairo")
//     .then(response => response.json())
//     .then(data=>{
//         let allData = data.data;
//         console.log(allData)
        
//     })




// fetch("https://api.aladhan.com/v1/timingsByAddress/14-08-2022?address=Cairo,EGY&method=8")
// .then(response => response.json())
// .then(data=>{
//     let allTimes =data.data.timings;
//     console.log(allTimes)
//     for(let time in allTimes){
//         console.log(allTimes[time])
//     }
    
// })
