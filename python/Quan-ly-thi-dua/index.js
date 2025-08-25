document.getElementById('cap-nhat-thi-dua-hang-tuan').addEventListener('click', function() {
    window.open('cap-nhat-thi-dua-hang-tuan/index.html', '_blank');
});

document.getElementById('danh-sach-nhan-vien-toan-truong').addEventListener('click', function() {
    window.open('danh-sach-nhan-vien-nha-truong/index.html', '_blank');
});

document.getElementById('danh-sach-hoc-sinh-toan-truong').addEventListener('click', function() {
    window.open('danh-sach-hoc-sinh-toan-truong/index.html', '_blank');
});

document.getElementById('chi-tiet-tuan-hoc').addEventListener('click', function() {
    window.open('chi-tiet-tuan-hoc/index.html', '_blank');
});

document.getElementById('huong-dan-su-dung-phan-mem').addEventListener('click', function() {
    window.open('hdsd/index.html', '_blank');
});
const quayLaiTrangChu = document.getElementById('quay-lai-trang-chu');
if (quayLaiTrangChu) {
    quayLaiTrangChu.addEventListener('click', function() {
        window.open('../index.html', '_blank');
    });
} else {
    console.error("Element with ID 'quay-lai-trang-chu' not found in the DOM.");
}
