const observer = new MutationObserver(() => {
  const app = document.getElementById("app");
  const scene = document.getElementById("scene");

  if (app) {
    observer.disconnect();
  } else {
    return;
  }

  //
  // resize logic
  //
  function resizeDependent() {
    const vh = window.innerHeight * 0.01;
    const vw = window.innerWidth * 0.01;
    document.documentElement.style.setProperty("--vh", `${vh}px`);
    document.documentElement.style.setProperty("--vw", `${vw}px`);
  }

  window.addEventListener("resize", () => {
    resizeDependent();
  });

  resizeDependent();

  //
  // show/hide screens
  //
  function goToScreen(screen = "") {
    const nameScreenShow = screen;
    const nameScreenHide = window.store.activeScreen;

    const screenHide = document.getElementById(`screen-${nameScreenHide}`);
    const screenShow = document.getElementById(`screen-${nameScreenShow}`);

    if (nameScreenHide !== nameScreenShow) {
      // show/hide screens
      if (screenHide) {
        screenHide.classList.remove("show");
      }

      if (screenShow) {
        screenShow.classList.add("show");
        window.store.activeScreen = nameScreenShow;
        const screenshow = document.querySelectorAll(".show");
        screenshow.forEach((item) => {
          console.log(item.id);
        });
      }
      // } else {
      //   console.error('No such screen exists: "', nameScreenShow, '" or "', nameScreenHide, '"')
      // }
    }
  }

  function hideScreen(screen = "") {
    const nameScreenShow = screen;

    const screenShow = document.getElementById(`screen-${nameScreenShow}`);

    if (nameScreenShow) {
      if (screenShow) {
        screenShow.classList.remove("show");
        window.store.activeScreen = "";
      }
    }
  }

  window.goToScreen = goToScreen;
  window.hideScreen = hideScreen;

  //
  // switch screens on buttons
  //
  function switchScreen() {
    const btns = document.querySelectorAll("[data-switch-screen]");
    if (btns && btns.length) {
      btns.forEach((btn) => {
        btn.addEventListener("click", (event) => {
          const currentBtn = event.currentTarget;
          const nextScreen = currentBtn.getAttribute("data-switch-screen");
          const hideScene = currentBtn.getAttribute("data-hide-scene");
          const recorder = document.getElementById("recorder");
          //   const buttonName = currentBtn.getAttribute('data-name')

          if (nextScreen === "close") {
            hideScreen(window.store.activeScreen);
          } else if (nextScreen !== "close" && hideScene) {
            // portalScreenButtonClick(buttonName)

            window.refreshPortal();

            goToScreen(nextScreen);

            // XR8.recenter()
          } else if (nextScreen === "share") {
            recorder.style.display = "none";
            goToScreen(nextScreen);
          } else {
            goToScreen(nextScreen);
          }
        });
      });
    }
  }

  window.switchScreen = switchScreen;

  //
  // switch portal
  //

  const portalButtons = document.querySelectorAll(".choose-portal");

  function switchPortal(portalType) {
    const scene_content = document.getElementById("scene_content");
    const before_portal = document.getElementById("screen-before-portal");
    scene_content.setAttribute("visible", true);
    setTimeout(() => {
      before_portal.addEventListener("click", window.firstPlaceEvent);
    }, 300);
    const portalA = document.getElementById("portalA");
    const portalB = document.getElementById("portalB");

    if (portalType === "portalA") {
      console.log("portalA");
      portalA.setAttribute("visible", true);
      portalB.setAttribute("visible", false);

      window.portalType = "portal-a";
      window.history.pushState("portal_a", "Portal A", "portal-a");
    } else if (portalType === "portalB") {
      console.log("portalB");
      portalA.setAttribute("visible", false);
      portalB.setAttribute("visible", true);

      window.portalType = "portal-b";
      window.history.pushState("portal_b", "Portal B", "portal-b");
    }
  }

  window.switchPortal = switchPortal;

  portalButtons.forEach((portalButton) => {
    const portalType = portalButton.getAttribute("data-name");
    portalButton.addEventListener("click", () => {
      console.log(portalType);
      switchPortal(portalType);
    });
  });

  //
  // function portal screen click handler
  //

  //   function portalScreenButtonClick(buttonName) {
  //     const recorder = document.getElementById('recorder')
  //     const scene_content = document.getElementById('scene_content')
  //     recorder.style.display = 'none'
  //     scene_content.setAttribute('visible', false)
  //     if (buttonName === 'back') {
  //       window.goToScreen('choose-portal')
  //     }
  //   }

  ///
  /// Initialize Kakao
  ///

  //Kakao.init('7387fec3bc4d857e4f4fe7711a04c3b8')
  //Kakao.isInitialized()

  //   function sendLink() {
  //     Kakao.Link.sendCustom({
  //       templateId: 3135,
  //       templateArgs: {
  //         title: '2022 HAPPY NEW YEAR CARD',
  //         description: '호랑이처럼 기운 넘치는 한 해 되세요',

  //       },
  //     })
  //   }

  //   window.sendLink = sendLink

  //   ///
  //   /// Share click handler
  //   ///

  //   const shareButtons = document.querySelectorAll('.share')

  //   function shareScreenClick(name) {
  //     if (name === 'kakao') {
  //       sendLink()
  //     } else if (name === 'mobile') {

  //     }
  //   }

  //   shareButtons.forEach((shareButton) => {
  //     const name = shareButton.getAttribute('data-name')
  //     shareButton.addEventListener('click', (e) => {
  //       e.preventDefault()
  //       shareScreenClick(name)
  //     })
  //   })

  //
  // other logic
  //
  const startListen = () => {
    switchScreen();

    // goToScreen('before-start')

    // off before-start screen
    // setTimeout(() => {
    //   goToScreen('start')
    // }, 1000)
  };

  console.log(document.querySelector(".prompt-box-8w"), "hi");

  if (document.querySelector(".prompt-box-8w")) {
    document.querySelector(".prompt-box-8w p").innerHTML =
      "AR 경험을 위해 기기 동작 센서 허용 및 마이크˙카메라에 대한 접근이 필요합니다";
    document.querySelector(".prompt-button-8w").innerHTML = "취소 Cancel";
    document.querySelector(".button-primary-8w").innerHTML = "허용 Continue";
  }
  console.log(window.XR8);
  window.XR8
    ? startListen()
    : window.addEventListener("xrextrasloaded", startListen);
});
observer.observe(document.body, { childList: true });

let inDom = false;
const observerPopup = new MutationObserver(() => {
  if (document.querySelector(".prompt-box-8w")) {
    if (!inDom) {
      const cub = document.createElement("div");
      cub.classList.add("cub");
      document.querySelector(".prompt-box-8w").prepend(cub);
      document.querySelector(".prompt-box-8w p").innerHTML =
        "AR 체험을 위해 기기 동작 센서 허용 및<br>마이크·카메라에 대한 접근이 필요합니다.";
      document.querySelector(".prompt-button-8w").innerHTML =
        '취소<br><span class="button-text">Cancel</span>';
      document.querySelector(".button-primary-8w").innerHTML =
        "허용<br><span>Continue</span";
    }
    inDom = true;
  } else if (inDom) {
    inDom = false;
    observer.disconnect();
  }
});
observerPopup.observe(document.body, { childList: true });
