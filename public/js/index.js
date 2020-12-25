window.onload = function() {

  const openNavVar = document.getElementById("open-nav")
  if(openNavVar){
  openNavVar.addEventListener("click", openNav);
  }

  const closeNavVar = document.getElementById("open-nav")
  if(closeNavVar){
  closeNavVar.addEventListener("click", closeNav);
  }

  function openNav() {
    document.getElementById("mySidenav").style.width = "250px";
    console.log('clicked once')
  }

  /* Set the width of the side navigation to 0 */
  function closeNav() {
  document.getElementById("mySidenav").style.width = "0";
  }
}