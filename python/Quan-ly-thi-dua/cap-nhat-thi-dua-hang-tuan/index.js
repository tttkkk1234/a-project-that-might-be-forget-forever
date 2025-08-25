document.addEventListener("DOMContentLoaded", () => {
  const elements = {
      ten_hs: document.getElementById("ten_hs"),
      weekSelect: document.getElementById("week"),
      classSelect: document.getElementById("classes"),
      violationSelect: document.getElementById("loi"),
      deductionInput: document.getElementById("deductionInput"),
      violationCountInput: document.getElementById("violationCountInput"),
      ngay: document.getElementById("ngay"),
  };

  for (const [key, el] of Object.entries(elements)) {
    if (!el) {
      console.error(`Missing element with id: ${key}`);
      alert(`Thiếu phần tử HTML với id: ${key}`);
      return;
    }
  }

  const addBtn = document.getElementById("addViolation");
  const delBtn = document.getElementById("deleteViolation");
  if (!addBtn || !delBtn) {
    alert("Thiếu nút addViolation hoặc deleteViolation trong HTML.");
    return;
  }

  const API_URL = "http://127.0.0.1:5501/loi";

  const violationMapping = {
      "late": "Đi trễ",
      "dong-phuc": "Không đồng phục",
      "nc": "Nói chuyện riêng",
      "ko-bt": "Không làm bài tập",
      "ko-sach-vo": "Không mang sách vở",
      "thieu-do-dung": "Không mang dụng cụ học tập",
      "ko-chep-bai": "Không chép bài",
      "no_test": "Không làm bài kiểm tra",
      "ko-thuoc-bai": "Không học bài",
      "ban": "Không giữ vệ sinh",
      "mat-trat-tu": "Gây mất trật tự",
      "ko-the-hs": "Không đeo thẻ học sinh",
      "luoi-qua": "Không tham gia hoạt động ngoại khóa",
      "ko-ld": "Không tham gia lao động",
      "ko-tap-td": "Không tham gia thể dục",
      "ko-tham-gia-van-nghe": "Không tham gia văn nghệ",
      "ko-tham-gia-tt": "Không tham gia thể thao",
      "ko-sinh-hoat-lop": "Không tham gia sinh hoạt lớp",
      "ko-sinh-hoat-doan": "Không tham gia sinh hoạt đoàn",
      "ko-sinh-hoat-doi": "Không tham gia sinh hoạt đội",
  };

  const fetchViolations = async () => {
      try {
          const response = await fetch(API_URL);
          if (!response.ok) {
              throw new Error(`HTTP error: ${response.statusText}`);
          }
          const data = await response.json();
          const tableBody = document.querySelector("tbody");
          if (!tableBody) {
            alert("Không tìm thấy <tbody> trong HTML.");
            return;
          }
          tableBody.innerHTML = "";
          data.forEach((item) => {
              const violationText = violationMapping[item.violation] || item.violation;
              const row = document.createElement("tr");
              row.innerHTML = `
                  <td>${item.className}</td>
                  <td>${item.week}</td>
                  <td>${violationText}</td>
                  <td>${item.count}</td>
                  <td>${item.deduction}</td>
                  <td>${item.student}</td>
                  <td>${item.date}</td>
              `;
              tableBody.appendChild(row);
          });
      } catch (error) {
          console.error("Error fetching violations:", error);
          alert("Không thể tải dữ liệu vi phạm. Kiểm tra kết nối hoặc server.");
      }
  };

  const sendRequest = async (method, body) => {
      try {
          const response = await fetch(API_URL, {
              method,
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(body),
          });
          let data;
          try {
            data = await response.json();
          } catch (e) {
            throw new Error("Phản hồi server không hợp lệ hoặc không phải JSON.");
          }
          if (!response.ok) {
              throw new Error(data.error || "Request failed");
          }
          alert(data.message || "Thành công!");
          await fetchViolations();
      } catch (error) {
          console.error(`Error during ${method} request:`, error);
          alert(`Operation failed: ${error.message}`);
      }
  };

  addBtn.addEventListener("click", () => {
      const count = parseInt(elements.violationCountInput.value, 10);
      const deduction = parseInt(elements.deductionInput.value, 10);
      if (isNaN(count) || isNaN(deduction)) {
          alert("Hãy nhập số hợp lệ cho số lỗi và điểm trừ.");
          return;
      }
      const newViolation = {
          className: elements.classSelect.value,
          week: elements.weekSelect.value,
          violation: elements.violationSelect.value,
          count,
          deduction,
          student: elements.ten_hs.value,
          date: elements.ngay.value,
      };
      sendRequest("POST", newViolation);
  });

  delBtn.addEventListener("click", () => {
      const className = elements.classSelect.value;
      const week = elements.weekSelect.value;
      const violation = elements.violationSelect.value;
      const student = elements.ten_hs.value;

      if (!className || !week || !violation || !student) {
          alert("Hãy điền đầy đủ thông tin trước khi xóa lỗi.");
          return;
      }

      const violationToDelete = {
          className,
          week,
          violation,
          student,
      };

      sendRequest("DELETE", violationToDelete);
  });

  fetchViolations(); 
});