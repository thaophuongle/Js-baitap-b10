var dsnv = new DSNV();

var dataJson = localStorage.getItem("DSNV");
console.log("dataJson: ", dataJson);
if (dataJson !== null) {
  for (var i = 0; i < dsnv.staffs.length; i++) {
    dsnv.staffs[i] = new NhanVien(
      dsnv.staffs[i].taiKhoan,
      dsnv.staffs[i].hoTen,
      dsnv.staffs[i].email,
      dsnv.staffs[i].matKhau,
      dsnv.staffs[i].ngayLam,
      dsnv.staffs[i].luongCoBan,
      dsnv.staffs[i].chucVu,
      dsnv.staffs[i].gioLam
    );
  }
  renderTable(dsnv.staffs);
}

function getEle(selector) {
  return document.querySelector(selector);
}

function renderTable(listArr) {
  var htmlString = "";
  for (var i = 0; i < listArr.length; i++) {
    var nhanVien = listArr[i];
    htmlString += `
      <tr>
        <td>${nhanVien.taiKhoan}</td>
        <td>${nhanVien.hoTen}</td>
        <td>${nhanVien.email}</td>
        <td>${nhanVien.ngayLam}</td>
        <td>${nhanVien.chucVu}</td>
        <td>${nhanVien.tinhTongLuong()}</td>
        <td>${nhanVien.xepLoaiNhanVien()}</td>
        <td>
          <button class="btn btn-warning" onclick="editNV('${
            nhanVien.taiKhoan
          }')">Edit</button>
          <button class="btn btn-danger" onclick="deleteNV('${
            nhanVien.taiKhoan
          }')">Delete</button>
        </td>
      </tr>`;
  }
  getEle("#tableDanhSach").innerHTML = htmlString;
}

function resetForm() {
  getEle("#tknv").value = "";
  getEle("#tknv").disabled = false;
  getEle("#name").value = "";
  getEle("#email").value = "";
  getEle("#password").value = "";
  getEle("#datepicker").value = "";
  getEle("#luongCB").value = "";
  getEle("#chucvu").value = "";
  getEle("#gioLam").value = "";
}

function layThongTinTuForm() {
  var taiKhoan = getEle("#tknv").value;
  var hoTen = getEle("#name").value;
  var email = getEle("#email").value;
  var matKhau = getEle("#password").value;
  var ngayLam = getEle("#datepicker").value;
  var luongCoBan = +getEle("#luongCB").value;
  var chucVu = getEle("#chucvu").value;
  var gioLam = +getEle("#gioLam").value;

  return new NhanVien(
    taiKhoan,
    hoTen,
    email,
    matKhau,
    ngayLam,
    luongCoBan,
    chucVu,
    gioLam
  );
}

function themNV() {
  var nv = layThongTinTuForm();

  //Kiểm tra tài khoản
  var valid =
    kiemTraRong(
      nv.taiKhoan,
      "#tbTKNV",
      "Tài khoản viên không được để trống !"
    ) &&
    kiemTraTrung(
      nv.taiKhoan,
      dsnv.staffs,
      "#tbTKNV",
      "Tài khoản nhân viên đã tồn tại"
    ) &&
    kiemTraSo(nv.taiKhoan, "#tbTKNV", "Tài khoản chỉ được nhập số") &&
    kiemTraDoDai(
      nv.taiKhoan,
      4,
      6,
      "#tbTKNV",
      "Tài khoản nhân viên phải từ 4~6 ký tự !"
    );

  //kiểm tra tên
  valid &=
    kiemTraRong(nv.hoTen, "#tbTen", "Tên nhân viên không được để trống !") &&
    kiemTraChuoi(nv.hoTen, "#tbTen", "Tên nhân viên phải là chữ !");

  //kiểm tra định dạng email
  valid &=
    kiemTraRong(nv.email, "#tbEmail", "Email không được để trống !") &&
    kiemTraEmail(nv.email, "#tbEmail", "Email không đúng định dạng !");

  // kiểm tra mật khẩu
  valid &=
    kiemTraRong(nv.matKhau, "#tbMatKhau", "Mật khẩu không được để trống !") &&
    kiemTraMatKhau(
      nv.matKhau,
      "#tbMatKhau",
      "Mật khẩu phải có 8 đến 20 ký tự, trong đó có ít nhất một chữ thường, một chữ hoa, một chữ số và một ký tự đặc biệt"
    );

  //kiểm tra ngày lam
  valid &= kiemTraRong(nv.ngayLam, "#tbNgay", "Ngày làm không được để trống !");

  //kiểm tra lương cơ bản
  valid &=
    kiemTraRong(
      nv.luongCoBan,
      "#tbLuongCB",
      "Tên nhân viên không được để trống !"
    ) &&
    kiemTraSo(nv.luongCoBan, "#tbLuongCB", "Điểm chỉ được nhập số !") &&
    kiemTraNumberRange(
      nv.luongCoBan,
      1000000,
      20000000,
      "#tbLuongCB",
      "Lương cơ bản phải từ 1,000,000 - 20,000,000"
    );

  //kiểm tra chuc vu
  valid &= kiemTraRong(nv.chucVu, "#tbChucVu", "Chức vụ không được để trống !");

  //kiểm tra giờ làm
  valid &=
    kiemTraRong(
      nv.gioLam,
      "#tbGiolam",
      "Tên nhân viên không được để trống !"
    ) &&
    kiemTraSo(nv.gioLam, "#tbGiolam", "Điểm chỉ được nhập số !") &&
    kiemTraNumberRange(
      nv.gioLam,
      80,
      200,
      "#tbGiolam",
      "Giờ làm phải từ 80 - 200 giờ"
    );

  if (valid) {
    dsnv._themNhanVien(nv);
    var data = JSON.stringify(dsnv.staffs);
    console.log("data: ", data);
    localStorage.setItem("DSNV", data);
    resetForm();
    renderTable(dsnv.staffs);
  }
}
