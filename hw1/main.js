const imagesURL = ["http://1.bp.blogspot.com/-Q1HHyxqpkSI/VEf3AZxniKI/AAAAAAAAALE/QXSYPrjzvn0/s1600/Wengen-Park.jpg",
    "https://i.pinimg.com/originals/01/ce/f4/01cef4a4def1dd93538cfee0544b76b8.jpg",
    "https://pictures.ozy.com/Pictures/1600x900/P/web/g/f/f/Switzerland_slide2.jpg",
    "https://i.pinimg.com/originals/24/bc/a0/24bca04533dbf3ff8f58aa012b9d85cf.jpg",
    "https://res.cloudinary.com/practicaldev/image/fetch/s--tQfqcc-w--/c_imagga_scale,f_auto,fl_progressive,h_900,q_auto,w_1600/https://dev-to-uploads.s3.amazonaws.com/i/v6jqzmz74v12jorz54ol.jpg",
    "https://d32oejzeinee6f.cloudfront.net/wp-content/uploads/2019/03/SHS_273262172_Salzburg-1600x900.jpg?x40791",
];
const imagesLength = imagesURL.length;
const tmpImg = new Image();
const loadGIF = 'images/loading.gif';
const backButton = document.getElementById("previous");
const nextButton = document.getElementById("next");
const displayImg = document.getElementById("display");
const displaySource = document.getElementById("source");
let imagesIdx = 0;

const setImage = () => {
    displayImg.src = loadGIF;
    tmpImg.src = imagesURL[imagesIdx];
    displaySource.innerText = imagesURL[imagesIdx];
    displaySource.href = imagesURL[imagesIdx];
    backButton.className = (imagesIdx === 0) ? "disabled" : "";
    nextButton.className = (imagesIdx === (imagesLength - 1)) ? "disabled" : "";
}

backButton.addEventListener('click', () => {
    if (imagesIdx !== 0) setImage(--imagesIdx);
});
nextButton.addEventListener('click', () => {
    if (imagesIdx !== (imagesLength - 1)) setImage(++imagesIdx);
});
tmpImg.addEventListener('load', () => { displayImg.src = tmpImg.src; });
window.addEventListener('load', setImage);