const mysql = require('mysql2/promise');

// MySQL 연결 설정
const pool = mysql.createPool({
  host: 'localhost', // DB 호스트
  user: 'root',      // 사용자 이름
  password: '0000', // 비밀번호
  database: 'test',  // 데이터베이스 이름
  waitForConnections: true,
  connectionLimit: 10, // 풀 크기
  queueLimit: 0
});

module.exports = pool;