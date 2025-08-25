let fileImported = false;

document.getElementById('inputfile').addEventListener('change', function(event) {
  if (fileImported) {
    alert('1 Tài liệu khác đã được tải lên, vui lòng reload lại page để tải lên file mới.');
    return; 
  }

  const selectedFile = event.target.files[0]; 
  if (selectedFile) {
    const reader = new FileReader();

    reader.onload = function(e) {
      try {
        const data = new Uint8Array(e.target.result);
        const workbook = XLSX.read(data, { type: 'array' });

        const firstSheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[firstSheetName];

        const rows = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

        const dropdown = document.getElementById('ten_hs');
        dropdown.innerHTML = ''; 

        rows.forEach((row, index) => {
          if (index > 0) { 
            const fullName = row[3]; 
            if (fullName && fullName.trim() !== 'Họ và tên') { 
              const option = document.createElement('option');
              option.textContent = fullName.trim();
              option.value = fullName.trim();
              dropdown.appendChild(option);
            }
          }
        });

        fileImported = true; 
      } catch (error) {
        alert('Có lỗi không xác định khi đang đọc file: ' + error.message);
      }
    };

    reader.readAsArrayBuffer(selectedFile); 
  } else {
    alert('Không có tệp nào được tải lên hoặc không phải định dạng file yêu càu.');
  }
});
