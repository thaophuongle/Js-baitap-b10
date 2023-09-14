function NhanVien(
  _taiKhoan,
  _hoTen,
  _email,
  _matKhau,
  _ngayLam,
  _luongCoBan,
  _chucVu,
  _gioLam
) {
  this.taiKhoan = _taiKhoan;
  this.hoTen = _hoTen;
  this.email = _email;
  this.matKhau = _matKhau;
  this.ngayLam = _ngayLam;
  this.luongCoBan = _luongCoBan;
  this.chucVu = _chucVu;
  this.gioLam = _gioLam;

  //method

  this.tinhTongLuong = function () {
    var tongLuong = 0;
    if (this.chucVu === "Sếp") {
      tongLuong = this.luongCoBan * 3;
    } else if (this.chucVu === "Trưởng Phòng") {
      tongLuong = this.luongCoBan * 2;
    } else if (this.chucVu === "Nhân Viên") {
      tongLuong = this.luongCoBan;
    }
    return tongLuong;
  };

  this.xepLoaiNhanVien = function () {
    var xepLoai = "";
    if (this.gioLam >= 192) {
      xepLoai = "Xuất Sắc";
    } else if (this.gioLam >= 176 && this.gioLam < 192) {
      xepLoai = "Giỏi";
    } else if (this.gioLam >= 160 && this.gioLam < 176) {
      xepLoai = "Khá";
    } else {
      xepLoai = "Trung Bình";
    }
    return xepLoai;
  };
}
