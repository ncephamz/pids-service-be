const responseMessages = {
  AUTH: {
    LOGIN: {
      200: 'login has been succesfully',
      401: 'Pasangan Surel dan Kata Sandi anda salah.',
      404: 'Surel belum terdaftar.',
      406: 'Pendaftaran belum selesai, silahkan lakukan pendaftaran kembali!',
    }
  },
};

const general = {
  FAIL: 'fail',
  SUCCESS: 'success'
};


module.exports = {
  responseMessages,
  general,
};