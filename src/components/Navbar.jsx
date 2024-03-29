import React, { useEffect } from 'react';
import { AiOutlineMenu } from 'react-icons/ai';
import { FiShoppingCart } from 'react-icons/fi';
import { BsChatLeft } from 'react-icons/bs';
import { RiNotification3Line } from 'react-icons/ri';
import { MdKeyboardArrowDown } from 'react-icons/md';
import { TooltipComponent } from '@syncfusion/ej2-react-popups';
import avatar from '../data/avatar.jpg';
import { Cart, Chat, Notification, UserProfile } from '.';
import { useStateContext } from '../context/ContextProvider';

const NavButton = ({ title, customFunc, icon, color, dotColor}) => (
  <TooltipComponent content={title} position='BottomCenter'>
    <button type='button' onClick={customFunc} style={{ color }} className='relative text-xl rounded-full p-3 hover:bg-light-gray'>
      <span style={{ background: dotColor }} className='absolute inline-flex rounded-full h-2 w-2 right-2 top-2' />{icon}
    </button>
  </TooltipComponent>
)

const Navbar = () => {
  const { activeMenu, setActiveMenu, handleClick, isClicked, setisClicked, screenSize, setScreenSize, currentColor } = useStateContext();

  useEffect(() => {
    const handleResize = () => setScreenSize(window.innerWidth);

    window.addEventListener('resize', handleResize);

    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect (() => {
    if(screenSize <= 900) {
      setActiveMenu(false);
    } else {
      setActiveMenu(true);
    }

    //screenSize <= 900 ? setActiveMenu(false) : setActiveMenu(true);
  }, [screenSize]);

  return (
    <div className='flex justify-between p-2 md:mx-6 relative'>
      <NavButton title='Menu' customFunc={() => setActiveMenu((prevActiveMenu) => !prevActiveMenu)} color={currentColor} icon={<AiOutlineMenu />}/>

      <div className='flex'>
        <NavButton title='Menu' customFunc={() => handleClick ('cart')} color={currentColor} icon={<FiShoppingCart />}/>

        <NavButton title='Chat' dotColor='#03C9D7' customFunc={() => handleClick ('chat')} color={currentColor} icon={<BsChatLeft />}/>

        <NavButton title='Notifications' customFunc={() => handleClick ('notification')} color= {currentColor} icon={<RiNotification3Line />}/>

        <TooltipComponent content='Profile' position='BottomCenter'>
          <div className='flex items-center cursor-pointer p-1 hover:bg-light-gray rounded-lg' onClick={() => handleClick('userProfile')}>
            <img src={avatar} className='rounded-full w-8 h-8 mr-1'/>
            <p>
              <span className='text-gray-400 text-14'>Hi, </span> {' '}
              <span className='text-gray-400 font-bold ml-1 text-14'>ANJI</span>
            </p>
            <MdKeyboardArrowDown className='text-gray-400 font-bold ml-1 text-14'/>
          </div>
        </TooltipComponent>

        {isClicked.cart && <Cart />}
        {isClicked.chat && <Chat />}
        {isClicked.notification && <Notification />}
        {isClicked.usetProfile && <UserProfile />}
      </div>
    </div>
  )
}

export default Navbar

//line 22, from that prevActiveMenu, it's a toggle function, it switches the ActiveMenu state, if it was opened before, it turns it on and vice versa
//line 44: the isClicked function has been defined in the contextProvider. "if you click on the cart, display the cart component"
//line 25: the array([]) there is called the dependecy array, meaning "when is the useEffect going to be called". If the array is empty, it's going to be called only at the start