import Link from 'next/link'
import React, { Fragment, useEffect, useState } from 'react';
import { ThemeChanger } from "../../redux/action";
import { connect } from 'react-redux';
import Modalsearch from '../modal-search/modalsearch';
import { basePath } from '@/next.config';
import { useGetUserQuery, useLogoutUserMutation } from '@/shared/redux/services/auth';
import { User } from '../../../Interface/types';
import { useRouter } from 'next/router';
import Cookies from "js-cookie";
const Header = () => {
  const cartProduct = [
    {
      id: 1,
      src: "/assets/images/ecommerce/jpg/1.jpg",
      name: 'SomeThing Phone',
      price: '$1,299.00',
      color: 'Metallic Blue',
      text: '6gb Ram',
      class: '',
    },

  ];
  const [user, setUser] = useState<User | null>(null);
  const { data, isSuccess } = useGetUserQuery(undefined);
  const [logoutUser] = useLogoutUserMutation()
  const router = useRouter();


  const handleLogout = async () => {
    try {
      const response = await logoutUser(undefined);
      if (response) {
        // Redirect to home page after logout
        router.push('/');
      }
    } catch (err) {
      console.error("Error during logout: ", err);

      if (err) {
        const { message, stack } = data || {};
        console.error(`Error message: ${message}, Stack: ${stack}`);
      }
    }
  };



  useEffect(() => {
    if (data && isSuccess) {
      setUser(data.user);
    }
  }, [data, isSuccess]);





  const [cartItems, setCartItems] = useState([...cartProduct]);
  const [cartItemCount, setCartItemCount] = useState(cartProduct.length);
  const handleRemove = (itemId: number, event: { stopPropagation: () => void; }) => {
    event.stopPropagation();
    const updatedCart = cartItems.filter((item) => item.id !== itemId);
    setCartItems(updatedCart);
    setCartItemCount(updatedCart.length);
  };

  //Notifications
  const notifydata = [
    { id: 1, class: "Your Order Has Been Shipped", data: "Order No: 123456 Has Shipped To Your Delivery Address", icon: "gift", class2: "", color: "!bg-primary/10", color2: "primary" },
  ]

  const [notifications, setNotifications] = useState([...notifydata]);

  const handleNotificationClose = (index: number, event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    if (event) {
      event.stopPropagation();
    }
    const updatedNotifications = [...notifications];
    updatedNotifications.splice(index, 1);
    setNotifications(updatedNotifications);
  };

  const handleRemoveNotification = (notificationId: number, event: { stopPropagation: () => void; }) => {
    if (event) {
      event.stopPropagation();
    }
    const updatedNotifications = notifications.filter((notification) => notification.id !== notificationId);
    setNotifications(updatedNotifications);
  };



  //full screen
  const [isFullscreen, setIsFullscreen] = useState(false);

  const toggleFullscreen = () => {
    const element = document.documentElement;
    if (
      !document.fullscreenElement) {
      // Enter fullscreen mode
      if (element.requestFullscreen) {
        element.requestFullscreen();
      }
    } else {
      // Exit fullscreen mode
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
  };

  useEffect(() => {
    const fullscreenChangeHandler = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener('fullscreenchange', fullscreenChangeHandler);

    return () => {
      document.removeEventListener('fullscreenchange', fullscreenChangeHandler);
    };
  }, []);


  useEffect(() => {
    const handleResize = () => {
      const windowObject = window;
      if (windowObject.innerWidth <= 991) {
        // ThemeChanger({ ...local_varaiable, "dataToggled": "close" })
      } else {
        // ThemeChanger({...local_varaiable,"dataToggled":""})
      }
    };
    handleResize(); // Check on component mount
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // useEffect(() => {
  //   SetStoreData(local_varaiable);
  // }, [local_varaiable]);

  // function menuClose() {
  //   const theme = store.getState();
  //   ThemeChanger({ ...theme, "dataToggled": "close" });
  // }





  useEffect(() => {
    const navbar = document?.querySelector(".header");
    const navbar1 = document?.querySelector(".app-sidebar");
    const sticky: any = navbar?.clientHeight;
    // const sticky1 = navbar1.clientHeight;

    function stickyFn() {
      if (window.pageYOffset >= sticky) {
        navbar?.classList.add("sticky-pin");
        navbar1?.classList.add("sticky-pin");
      } else {
        navbar?.classList.remove("sticky-pin");
        navbar1?.classList.remove("sticky-pin");
      }
    }

    window.addEventListener("scroll", stickyFn);
    window.addEventListener("DOMContentLoaded", stickyFn);

    // Cleanup event listeners when the component unmounts
    return () => {
      window.removeEventListener("scroll", stickyFn);
      window.removeEventListener("DOMContentLoaded", stickyFn);
    };
  }, []);

  return (
    <Fragment>
      <div className="app-header">
        <nav className="main-header !h-[3.75rem]" aria-label="Global">
          <div className="main-header-container ps-[0.725rem] pe-[1rem] ">

            <div className="header-content-left">
              <div className="header-element">
                <div className="horizontal-logo">
                  <Link href="/components/dashboards/crm/" className="header-logo">
                    <img src={`${process.env.NODE_ENV === "production" ? basePath : ""}/assets/images/brand-logos/desktop-logo.png`} alt="logo" className="desktop-logo" />
                    <img src={`${process.env.NODE_ENV === "production" ? basePath : ""}/assets/images/brand-logos/toggle-logo.png`} alt="logo" className="toggle-logo" />
                    <img src={`${process.env.NODE_ENV === "production" ? basePath : ""}/assets/images/brand-logos/desktop-dark.png`} alt="logo" className="desktop-dark" />
                    <img src={`${process.env.NODE_ENV === "production" ? basePath : ""}/assets/images/brand-logos/toggle-dark.png`} alt="logo" className="toggle-dark" />
                    <img src={`${process.env.NODE_ENV === "production" ? basePath : ""}/assets/images/brand-logos/desktop-white.png`} alt="logo" className="desktop-white" />
                    <img src={`${process.env.NODE_ENV === "production" ? basePath : ""}/assets/images/brand-logos/toggle-white.png`} alt="logo" className="toggle-white" />
                  </Link>
                </div>
              </div>
              <div className="header-element md:px-[0.325rem] !items-center" >
                <Link aria-label="Hide Sidebar"
                  className="sidemenu-toggle animated-arrow  hor-toggle horizontal-navtoggle inline-flex items-center" href="#!"><span></span></Link>
              </div>
            </div>
            <div className="header-content-right">

              <div className="header-element py-[1rem] md:px-[0.65rem] px-2 header-search">
                <button aria-label="button" type="button" data-hs-overlay="#search-modal"
                  className="inline-flex flex-shrink-0 justify-center items-center gap-2  rounded-full font-medium focus:ring-offset-0 focus:ring-offset-white transition-all text-xs dark:bg-bgdark dark:hover:bg-black/20 dark:text-[#8c9097] dark:text-white/50 dark:hover:text-white dark:focus:ring-white/10 dark:focus:ring-offset-white/10">
                  <i className="bx bx-search-alt-2 header-link-icon"></i>
                </button>
              </div>


              <div className="header-element header-theme-mode hidden !items-center sm:block !py-[1rem] md:!px-[0.65rem] px-2" >
                <Link aria-label="anchor"
                  className="hs-dark-mode-active:hidden flex hs-dark-mode group flex-shrink-0 justify-center items-center gap-2  rounded-full font-medium transition-all text-xs dark:bg-bgdark dark:hover:bg-black/20 dark:text-[#8c9097] dark:text-white/50 dark:hover:text-white dark:focus:ring-white/10 dark:focus:ring-offset-white/10"
                  href="#!" data-hs-theme-click-value="dark">
                  <i className="bx bx-moon header-link-icon"></i>
                </Link>
                <Link aria-label="anchor"
                  className="hs-dark-mode-active:flex hidden hs-dark-mode group flex-shrink-0 justify-center items-center gap-2  rounded-full font-medium text-defaulttextcolor  transition-all text-xs dark:bg-bodybg dark:bg-bgdark dark:hover:bg-black/20 dark:text-[#8c9097] dark:text-white/50 dark:hover:text-white dark:focus:ring-white/10 dark:focus:ring-offset-white/10"
                  href="#!" data-hs-theme-click-value="light">
                  <i className="bx bx-sun header-link-icon"></i>
                </Link>
              </div>
              <div className="header-element cart-dropdown hs-dropdown ti-dropdown md:!block !hidden py-[1rem] md:px-[0.65rem] px-2 [--placement:bottom-right] rtl:[--placement:bottom-left]">
                <button id="dropdown-cart" type="button"
                  className="hs-dropdown-toggle relative ti-dropdown-toggle !p-0 !border-0 flex-shrink-0  !rounded-full !shadow-none align-middle text-xs">
                  <i className="bx bx-cart header-link-icon"></i>
                  <span className="flex absolute h-5 w-5 -top-[0.25rem] end-0 -me-[0.6rem]">
                    <span className="relative inline-flex rounded-full h-[14.7px] w-[14px] text-[0.625rem] bg-primary text-white justify-center items-center"
                      id="cart-icon-badge">{cartItemCount}</span>
                  </span>
                </button>

                <div className="main-header-dropdown bg-white !-mt-3 !p-0 hs-dropdown-menu ti-dropdown-menu w-[22rem] border-0 border-defaultborder hidden"
                  aria-labelledby="dropdown-cart">

                  <div className="ti-dropdown-header !bg-transparent flex justify-between items-center !m-0 !p-4">
                    <p className="text-defaulttextcolor  !text-[1.0625rem] dark:text-[#8c9097] dark:text-white/50 font-semibold">Cart Items</p>
                    <Link href="#!"
                      className="font-[600] py-[0.25/2rem] px-[0.45rem] rounded-[0.25rem] bg-success/10 text-success text-[0.75em] "
                      id="cart-data">{cartItemCount} Item{cartItemCount !== 1 ? 's' : ''}</Link>
                  </div>
                  <div>
                    <hr className="dropdown-divider dark:border-white/10" />
                  </div>
                  <ul className="list-none mb-0" id="header-cart-items-scroll">
                    {cartItems.map((idx) => (
                      <li className={`ti-dropdown-item border-b dark:border-defaultborder/10 border-defaultborder ${idx.class}`} key={Math.random()}>
                        <div className="flex items-start cart-dropdown-item">

                          <img src={`${process.env.NODE_ENV === "production" ? basePath : ""}${idx.src}`} alt="img"
                            className="!h-[1.75rem] !w-[1.75rem] leading-[1.75rem] text-[0.65rem] rounded-[50%] br-5 me-3" />

                          <div className="grow">
                            <div className="flex items-start justify-between mb-0">
                              <div className="mb-0 !text-[0.8125rem] text-[#232323] font-semibold dark:text-[#8c9097] dark:text-white/50">
                                <Link href="/components/pages/ecommerce/cart/">{idx.name}</Link>
                              </div>

                              <div className="inline-flex">
                                <span className="text-black mb-1 dark:text-white !font-medium">{idx.price}</span>
                                <Link aria-label="anchor" href="#!" className="header-cart-remove ltr:float-right rtl:float-left dropdown-item-close" onClick={(event) => handleRemove(idx.id, event)}><i
                                  className="ti ti-trash"></i></Link>
                              </div>
                            </div>
                            <div className="min-w-fit flex  items-start justify-between">
                              <ul className="header-product-item dark:text-white/50 flex">
                                <li>{idx.color}</li>
                                <li>{idx.text}</li>
                              </ul>
                            </div>
                          </div>
                        </div>
                      </li>

                    ))}
                  </ul>
                  <div className={`p-3 empty-header-item border-t ${cartItemCount === 0 ? 'hidden' : 'block'}`}>
                    <div className="grid">
                      <Link href="/components/pages/ecommerce/checkout/" className="w-full ti-btn ti-btn-primary-full p-2">Proceed to checkout</Link>
                    </div>
                  </div>
                  <div className={`p-[3rem] empty-item ${cartItemCount === 0 ? 'block' : 'hidden'}`}>
                    <div className="text-center">
                      <span className="!w-[4rem] !h-[4rem] !leading-[4rem] rounded-[50%] avatar bg-warning/10 !text-warning">
                        <i className="ri-shopping-cart-2-line text-[2rem]"></i>
                      </span>
                      <h6 className="font-bold mb-1 mt-3 text-[1rem] text-defaulttextcolor dark:text-[#8c9097] dark:text-white/50">Your Cart is Empty</h6>
                      <span className="mb-3 !font-normal text-[0.8125rem] block text-defaulttextcolor dark:text-[#8c9097] dark:text-white/50">Add some items to make me happy :)</span>
                      <Link href="/components/pages/ecommerce/products/" className="ti-btn ti-btn-primary btn-wave ti-btn-wave btn-sm m-1 !text-[0.75rem] !py-[0.25rem] !px-[0.5rem]"
                        data-abc="true">continue shopping <i className="bi bi-arrow-right ms-1"></i></Link>
                    </div>
                  </div>

                </div>
              </div>
              <div className="header-element py-[1rem] md:px-[0.65rem] px-2 notifications-dropdown header-notification hs-dropdown ti-dropdown !hidden md:!block [--placement:bottom-right]">
                <button id="dropdown-notification" type="button"
                  className="hs-dropdown-toggle relative ti-dropdown-toggle !p-0 !border-0 flex-shrink-0  !rounded-full !shadow-none align-middle text-xs">
                  <i className="bx bx-bell header-link-icon  text-[1.125rem]"></i>
                  <span className="flex absolute h-5 w-5 -top-[0.25rem] end-0  -me-[0.6rem]">
                    <span
                      className="animate-slow-ping absolute inline-flex -top-[2px] -start-[2px] h-full w-full rounded-full bg-secondary/40 opacity-75"></span>
                    <span
                      className="relative inline-flex justify-center items-center rounded-full  h-[14.7px] w-[14px] bg-secondary text-[0.625rem] text-white"
                      id="notification-icon-badge">{notifications.length}</span>
                  </span>
                </button>
                <div className="main-header-dropdown !-mt-3 !p-0 hs-dropdown-menu ti-dropdown-menu bg-white !w-[22rem] border-0 border-defaultborder hidden !m-0"
                  aria-labelledby="dropdown-notification">

                  <div className="ti-dropdown-header !m-0 !p-4 !bg-transparent flex justify-between items-center">
                    <p className="mb-0 text-[1.0625rem] text-defaulttextcolor font-semibold dark:text-[#8c9097] dark:text-white/50">Notifications</p>
                    <span className="text-[0.75em] py-[0.25rem/2] px-[0.45rem] font-[600] rounded-sm bg-secondary/10 text-secondary"
                      id="notifiation-data">{`${notifications.length} Unread`}</span>
                  </div>
                  <div className="dropdown-divider"></div>
                  <ul className="list-none !m-0 !p-0 end-0" id="header-notification-scroll">
                    {notifications.map((idx, index) => (
                      <li className="ti-dropdown-item dropdown-item" key={Math.random()}>
                        <div className="flex items-start">
                          <div className="pe-2">
                            <span
                              className={`inline-flex text-${idx.color2} justify-center items-center !w-[2.5rem] !h-[2.5rem] !leading-[2.5rem] !text-[0.8rem] ${idx.color} !rounded-[50%]`}><i
                                className={`ti ti-${idx.icon} text-[1.125rem]`}></i></span>
                          </div>
                          <div className="grow flex items-center justify-between">
                            <div>
                              <p className="mb-0 text-defaulttextcolor dark:text-[#8c9097] dark:text-white/50 text-[0.8125rem] font-semibold"><Link
                                href="/components/pages/notifications/">{idx.class} {idx.class2}</Link></p>
                              <span className="text-[#8c9097] dark:text-white/50 font-normal text-[0.75rem] header-notification-text">{idx.data}</span>
                            </div>
                            <div>
                              <Link aria-label="anchor" href="#!" className="min-w-fit text-[#8c9097] dark:text-white/50 me-1 dropdown-item-close1" onClick={(event) => handleNotificationClose(index, event)}><i
                                className="ti ti-x text-[1rem]"></i></Link>
                            </div>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>

                  <div className={`p-4 empty-header-item1 border-t mt-2 ${notifications.length === 0 ? 'hidden' : 'block'}`}>
                    <div className="grid">
                      <Link href="/components/pages/notifications/" className="ti-btn ti-btn-primary-full !m-0 w-full p-2">View All</Link>
                    </div>
                  </div>
                  <div className={`p-[3rem] empty-item1 ${notifications.length === 0 ? 'block' : 'hidden'}`}>
                    <div className="text-center">
                      <span className="!h-[4rem]  !w-[4rem] avatar !leading-[4rem] !rounded-full !bg-secondary/10 !text-secondary">
                        <i className="ri-notification-off-line text-[2rem]  "></i>
                      </span>
                      <h6 className="font-semibold mt-3 text-defaulttextcolor dark:text-[#8c9097] dark:text-white/50 text-[1rem]">No New Notifications</h6>
                    </div>
                  </div>
                </div>
              </div>

              <div className="header-element header-fullscreen py-[1rem] md:px-[0.65rem] px-2">
                <Link aria-label="anchor"
                  onClick={() => toggleFullscreen()}
                  href="#!"
                  className="inline-flex flex-shrink-0 justify-center items-center gap-2  !rounded-full font-medium dark:hover:bg-black/20 dark:text-[#8c9097] dark:text-white/50 dark:hover:text-white dark:focus:ring-white/10 dark:focus:ring-offset-white/10">
                  {isFullscreen ? (
                    <i className="bx bx-exit-fullscreen full-screen-close header-link-icon"></i>
                  ) : (
                    <i className="bx bx-fullscreen full-screen-open header-link-icon"></i>
                  )}
                </Link>
              </div>
              <div className="header-element md:!px-[0.65rem] px-2 hs-dropdown !items-center ti-dropdown [--placement:bottom-left]">

                <button id="dropdown-profile" type="button"
                  className="hs-dropdown-toggle ti-dropdown-toggle !gap-2 !p-0 flex-shrink-0 sm:me-2 me-0 !rounded-full !shadow-none text-xs align-middle !border-0 !shadow-transparent ">
                  <img className="inline-block rounded-full " src={`${process.env.NODE_ENV === "production" ? basePath : ""}/assets/images/faces/9.jpg`} width="32" height="32" alt="Image Description" />
                </button>
                <div className="md:block hidden dropdown-profile">
                  <p className="font-semibold mb-0 leading-none text-[#536485] text-[0.813rem] ">{user?.name}</p>
                  <span className="opacity-[0.7] font-normal text-[#536485] block text-[0.6875rem] ">{user?.roles[0]}</span>
                </div>
                <div
                  className="hs-dropdown-menu ti-dropdown-menu !-mt-3 border-0 w-[11rem] !p-0 border-defaultborder hidden main-header-dropdown  pt-0 overflow-hidden header-profile-dropdown dropdown-menu-end"
                  aria-labelledby="dropdown-profile">

                  <ul className="text-defaulttextcolor font-medium dark:text-[#8c9097] dark:text-white/50">
                    <li>
                      <Link className="w-full ti-dropdown-item !text-[0.8125rem] !gap-x-0  !p-[0.65rem] !inline-flex" href="/components/pages/profile/">
                        <i className="ti ti-user-circle text-[1.125rem] me-2 opacity-[0.7]"></i>Profile
                      </Link>
                    </li>
                    <li>
                      <Link className="w-full ti-dropdown-item !text-[0.8125rem] !gap-x-0  !p-[0.65rem] !inline-flex" href="/components/pages/email/mail-app/"><i
                        className="ti ti-inbox text-[1.125rem] me-2 opacity-[0.7]"></i>Inbox <span
                          className="!py-1 !px-[0.45rem] !font-semibold !rounded-sm text-success text-[0.75em] bg-success/10 ms-auto">25</span>
                      </Link>
                    </li>
                    <li><Link className="w-full ti-dropdown-item !text-[0.8125rem] !gap-x-0 !p-[0.65rem] !inline-flex" href="/components/pages/todo-list/"><i
                      className="ti ti-clipboard-check text-[1.125rem] me-2 opacity-[0.7]"></i>Task Manager</Link></li>
                    <li><Link className="w-full ti-dropdown-item !text-[0.8125rem] !gap-x-0 !p-[0.65rem] !inline-flex" href="/components/pages/email/mail-settings/"><i
                      className="ti ti-adjustments-horizontal text-[1.125rem] me-2 opacity-[0.7]"></i>Settings</Link></li>
                    {/* <li><Link className="w-full ti-dropdown-item !text-[0.8125rem] !gap-x-0 !p-[0.65rem] !inline-flex " href="#!"><i
                      className="ti ti-wallet text-[1.125rem] me-2 opacity-[0.7]"></i>Bal: $7,12,950</Link></li> */}
                    <li><Link className="w-full ti-dropdown-item !text-[0.8125rem] !p-[0.65rem] !gap-x-0 !inline-flex" href="/components/pages/chat/"><i
                      className="ti ti-headset text-[1.125rem] me-2 opacity-[0.7]"></i>Support</Link></li>
                    <li><button onClick={handleLogout} className="w-full ti-dropdown-item !text-[0.8125rem] !p-[0.65rem] !gap-x-0 !inline-flex"><i
                      className="ti ti-logout text-[1.125rem] me-2 opacity-[0.7]"></i>Log Out</button></li>
                  </ul>
                </div>
              </div>
              <div className="header-element md:px-[0.48rem]">
                {/* <button aria-label="button" type="button"
                  className="hs-dropdown-toggle switcher-icon inline-flex flex-shrink-0 justify-center items-center gap-2  rounded-full font-medium  align-middle transition-all text-xs dark:text-[#8c9097] dark:text-white/50 dark:hover:text-white dark:focus:ring-white/10 dark:focus:ring-offset-white/10"
                  data-hs-overlay="#hs-overlay-switcher">
                  <i className="bx bx-cog header-link-icon animate-spin-slow"></i>
                </button> */}
              </div>
            </div>
          </div>
        </nav>
      </div>
      <Modalsearch />
    </Fragment>
  )
}

const mapStateToProps = (state: any) => ({
  local_varaiable: state
});
export default connect(mapStateToProps, { ThemeChanger })(Header);
