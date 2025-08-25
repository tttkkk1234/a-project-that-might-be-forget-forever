// Open a new tab for creating a member account
document.getElementById('Tao-tk-thanh-vien').addEventListener('click', function() {
    window.open('/python/Tao-tk-thanh-vien/index.html', '_blank');
});

// Open a new tab for managing competitions
document.getElementById('Quan-ly-thi-dua').addEventListener('click', function() {
    window.open('/python/Quan-ly-thi-dua/index.html', '_blank');
});

// Open a new tab for printing categories
document.getElementById('Danh-muc-in-an').addEventListener('click', function() {
    window.open('/python/Danh-muc-in-an/index.html', '_blank');
});

// Open a new tab for search categories
document.getElementById('Danh-muc-tim-kiem').addEventListener('click', function() {
    window.open('/python/Danh-muc-tim-kiem/index.html', '_blank');
});

// Close the current window
document.getElementById('out').addEventListener('click', function() {
    alert('Cannot close the window directly. Please close it manually.');
});