const hdsd = document.getElementById('hdsd');
const hdsd_popup = document.getElementById('hdsd_popup');
const Close = document.getElementById('Close');

hdsd.addEventListener('click', () => {
    hdsd_popup.style.display = 'block';
});

Close.addEventListener('click', () => {
    hdsd_popup.style.display = 'none';
});
