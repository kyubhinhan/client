import React from 'react';
import ModalFull from '../components/common/ModalFull';
import MyLotList from '../components/My/MyLotList';
import MyLotRegister from '../components/My/MyLotRegister';
import MySetting from '../components/My/MySetting';
import LogOut from '../components/My/LogOut';

const MyPage = () => {
  return (
    <ModalFull title="마이페이지">
      <MyLotList />
      <MyLotRegister />
      <MySetting />
      <LogOut />
    </ModalFull>
  );
};

export default MyPage;
