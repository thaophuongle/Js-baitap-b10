function DSNV() {
  this.staffs = [];

  this._themNhanVien = function (nv) {
    this.staffs.push(nv);
  };

  this._timViTriNhanVien = function (taiKhoan) {
    var index = -1;

    for (var i = 0; i < this.staffs.length; i++) {
      var nv = this.staffs[i];
      if (nv.taiKhoan === taiKhoan) {
        index = i;
        break;
      }
    }
    return index;
  };

  this._layThongTinNhanVien = function (taiKhoan) {
    var index = this._timViTriNhanVien(taiKhoan);
    if (index !== -1) {
      var nv = this.staffs[index];
      return nv;
    }
  };

  // Sửa
  this._capNhatNhanVien = function (nhanVien) {
    var index = this._timViTriNhanVien(nhanVien.taiKhoan);
    if (index !== -1) {
      this.staffs[index] = nhanVien;
    }
  };

  // Xoá
  this._xoaNhanVien = function (taiKhoan) {
    var index = this._timViTriNhanVien(taiKhoan);
    if (index !== -1) {
      this.staffs.splice(index, 1);
    }
  };
}
