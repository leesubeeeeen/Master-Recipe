<?php
session_start();
session_unset();   // 모든 세션 변수 삭제
session_destroy(); // 세션 종료
echo "<script>
    alert('로그아웃 되었습니다.');
    window.location.href = 'login.html';
</script>";
