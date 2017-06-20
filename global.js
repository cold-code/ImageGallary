// Global

function addLoadEvent(func) {
  var oldonload = window.onload;
  if (typeof window.onload != 'function') {
    window.onload = func;
  } else {
    window.onload = function() {
      oldonload();
      func();
    }
  }
}

function insertAfter(newElement,targetElement) {
  var parent = targetElement.parentNode;
  if (parent.lastChild == targetElement) {
    parent.appendChild(newElement);
  } else {
    parent.insertBefore(newElement,targetElement.nextSibling);
  }
}

function addClass(element,value) {
  if (!element.className) {
    element.className = value;
  } else {
    newClassName = element.className;
    newClassName+= " ";
    newClassName+= value;
    element.className = newClassName;
  }
}

function highlightPage() {
  if (!document.getElementsByTagName) return false;
  if (!document.getElementById) return false;  
  var headers = document.getElementsByTagName('header');
  if (headers.length == 0) return false;
  var navs = headers[0].getElementsByTagName('nav');
  if (navs.length == 0) return false;
  
  var links = navs[0].getElementsByTagName("a");
  for (var i=0; i<links.length; i++) {
	  var linkurl;
	  for (var i=0; i<links.length; i++) {
	    linkurl = links[i].getAttribute("href");
	    if (window.location.href.indexOf(linkurl) != -1) {
	      links[i].className = "here";
	      var linktext = links[i].lastChild.nodeValue.toLowerCase();
	      document.body.setAttribute("id",linktext);
	    }
	  }
  }
}


// Index
function moveElement(elementID,final_x,final_y,interval) {
  if (!document.getElementById) return false;
  if (!document.getElementById(elementID)) return false;
  var elem = document.getElementById(elementID);
  if (elem.movement) {
    clearTimeout(elem.movement);
  }
  if (!elem.style.left) {
    elem.style.left = "0px";
  }
  if (!elem.style.top) {
    elem.style.top = "0px";
  }
  var xpos = parseInt(elem.style.left);
  var ypos = parseInt(elem.style.top);
  if (xpos == final_x && ypos == final_y) {
    return true;
  }
  if (xpos < final_x) {
    var dist = Math.ceil((final_x - xpos)/10);
    xpos = xpos + dist;
  }
  if (xpos > final_x) {
    var dist = Math.ceil((xpos - final_x)/10);
    xpos = xpos - dist;
  }
  if (ypos < final_y) {
    var dist = Math.ceil((final_y - ypos)/10);
    ypos = ypos + dist;
  }
  if (ypos > final_y) {
    var dist = Math.ceil((ypos - final_y)/10);
    ypos = ypos - dist;
  }
  elem.style.left = xpos + "px";
  elem.style.top = ypos + "px";
  var repeat = "moveElement('"+elementID+"',"+final_x+","+final_y+","+interval+")";
  elem.movement = setTimeout(repeat,interval);
}

function prepareSlideshow() {
  if (!document.getElementsByTagName) return false;
  if (!document.getElementById) return false;
  if (!document.getElementById("intro")) return false;
  var intro = document.getElementById("intro");
  var slideshow = document.createElement("div");
  slideshow.setAttribute("id","slideshow");
  var frame = document.createElement("img");
  frame.setAttribute("src","images/frame.gif");
  frame.setAttribute("alt","");
  frame.setAttribute("id","frame");
  slideshow.appendChild(frame);
  var preview = document.createElement("img");
  preview.setAttribute("src","images/slideshow.gif");
  preview.setAttribute("alt","a glimpse of what awaits you");
  preview.setAttribute("id","preview");
  slideshow.appendChild(preview);
  insertAfter(slideshow,intro);
  var links = document.getElementsByTagName("a");
  for (var i=0; i<links.length; i++) {
    links[i].onmouseover = function() {
      var destination = this.getAttribute("href");
      if (destination.indexOf("Beijing") != -1) {
        moveElement("preview",0,0,5);
      }
      if (destination.indexOf("Guangzhou") != -1) {
        moveElement("preview",-150,0,5);
      }
      if (destination.indexOf("Sanya") != -1) {
        moveElement("preview",-300,0,5);
      }
      if (destination.indexOf("Xiamen") != -1) {
        moveElement("preview",-450,0,5);
      }
      if (destination.indexOf("Changchun") != -1) {
        moveElement("preview",-600,0,5);
      }
      if (destination.indexOf("Haerbing") != -1) {
        moveElement("preview",-750,0,5);
      }
      if (destination.indexOf("QingHaiHu") != -1) {
        moveElement("preview",-900,0,5);
      }
      if (destination.indexOf("YanHu") != -1) {
        moveElement("preview",-1050,0,5);
      }
      if (destination.indexOf("DunHuang") != -1) {
        moveElement("preview",-1200,0,5);
      }
      if (destination.indexOf("YaDan") != -1) {
        moveElement("preview",-1350,0,5);
      }
      if (destination.indexOf("JiaYuGuan") != -1) {
        moveElement("preview",-1500,0,5);
      }
      if (destination.indexOf("DanXia") != -1) {
        moveElement("preview",-1650,0,5);
      }
    }
  }
}


// About

function showSection(id) {
  var sections = document.getElementsByTagName("section");
  for (var i=0; i<sections.length; i++ ) {
    if (sections[i].getAttribute("id") != id) {
      sections[i].style.display = "none";
    } else {
      sections[i].style.display = "block";
    }
  }
}

function prepareInternalnav() {
  if (!document.getElementsByTagName) return false;
  if (!document.getElementById) return false;
  var articles = document.getElementsByTagName("article");
  if (articles.length == 0) return false;
  var navs = articles[0].getElementsByTagName("nav");
  if (navs.length == 0) return false;
  var nav = navs[0];
  var links = nav.getElementsByTagName("a");
  for (var i=0; i<links.length; i++ ) {
    var sectionId = links[i].getAttribute("href").split("#")[1];
    if (!document.getElementById(sectionId)) continue;
    document.getElementById(sectionId).style.display = "block";
    links[i].destination = sectionId;
    links[i].onclick = function() {
      showSection(this.destination);
      return false;
    }
  }
}


// Photos

function showPic(whichpic) {
  if (!document.getElementById("placeholder")) return true;
  var source = whichpic.getAttribute("href");
  var placeholder = document.getElementById("placeholder");
  placeholder.setAttribute("src",source);
  if (!document.getElementById("description")) return false;
  if (whichpic.getAttribute("title")) {
    var text = whichpic.getAttribute("title");
  } else {
    var text = "";
  }
  var description = document.getElementById("description");
  if (description.firstChild.nodeType == 3) {
    description.firstChild.nodeValue = text;
  }
  return false;
}

function preparePlaceholder() {
  if (!document.createElement) return false;
  if (!document.createTextNode) return false;
  if (!document.getElementById) return false;
  if (!document.getElementById("imagegallery")) return false;
  var placeholder = document.createElement("img");
  placeholder.setAttribute("id","placeholder");
  placeholder.setAttribute("src","images/tourism/photos/B10-1.jpg");
  placeholder.setAttribute("alt","my image gallery");
  var description = document.createElement("p");
  description.setAttribute("id","description");
  var desctext = document.createTextNode("你值得拥有的精彩 !");
  description.appendChild(desctext);
  var gallery = document.getElementById("imagegallery");
  insertAfter(description,gallery);
  insertAfter(placeholder,description);
}

function prepareGallery() {
  if (!document.getElementsByTagName) return false;
  if (!document.getElementById) return false;
  if (!document.getElementById("imagegallery")) return false;
  var gallery = document.getElementById("imagegallery");
  var links = gallery.getElementsByTagName("a");
  for ( var i=0; i < links.length; i++) {
    links[i].onclick = function() {
      return showPic(this);
    }
  }
}

function highlightNav() {
    if (!document.getElementsByTagName) return false;
    if (!document.getElementById) return false;
    if(!document.getElementById("aside"))return false;
    var aside = document.getElementById("aside");
    var aUls = document.getElementById("imagegallery").getElementsByTagName("ul");
    if (aUls.length == 0) return false;
    var aLis = aside.getElementsByTagName("li");
    if (aLis.length == 0) return false;
    var index = 0;
    for (var i=0; i<aLis.length; i++) {
        aLis[i].index = i;
        aLis[i].onclick = function () {
            aLis[index].className = " ";
            index = this.index;
            aLis[index].className = "here";
       }
    }
}

function showUl(id) {
    if (!document.getElementById("imagegallery")) return false;
    var uls = document.getElementById("imagegallery").getElementsByTagName("ul");
    for (var i=0; i<uls.length; i++ ) {
        if (uls[i].getAttribute("id") != id) {
            uls[i].style.display = "none";
            uls[i].className = "";
        } else {
            uls[i].style.display = "block";
            uls[i].className = "on";
        }
    }
}

function prepareAsideUl() {
    if (!document.getElementsByTagName) return false;
    if (!document.getElementById) return false;
    var asides = document.getElementsByTagName("aside");
    if (asides.length == 0) return false;
    var uls = asides[0].getElementsByTagName("ul");
    if (uls.length == 0) return false;
    var ul = uls[0];
    var links = ul.getElementsByTagName("a");
    for (var i=0; i<links.length; i++ ) {
        var ulId = links[i].getAttribute("href").split("#")[1];
        links[i].destination = ulId;
        links[i].onclick = function() {

            showUl(this.destination);
            return false;
        }
    }
}
turnaround();
function turnaround() {
    if(!document.getElementById) return false;
    if(!document.getElementsByTagName) return false;
    if(!document.getElementById("imagegallery")) return false;
    var oGall = document.getElementById("imagegallery");
    var aDiv = oGall.getElementsByTagName("div");
    var len = aDiv.length;
    var aSpan = document.getElementsByTagName("span");
    var asideA = document.querySelector("#aside");
    var oUl = "";
    var aLilen = "";
    var timer;
    var start = 0;
    var min = 0;
    for (var k = 0,length = asideA.length;k < length;k++) {
        asideA[k].onmouseenter = function() {
            start = 0;
        };
    }

    for (var i = 0;i < len; i++) {
        aDiv[i].index = i;
        oUl = document.querySelectorAll("#imagegallery .on");
        aDiv[i].onmouseenter = function () {
            aSpan[this.index].style.display = "block";
        };
        aDiv[i].onmouseleave = function () {
            aSpan[this.index].style.display = "none";
        };

        aSpan[i].onmouseenter = function () {
            oUl = document.querySelector("#imagegallery .on");
            aLi = document.querySelectorAll("#imagegallery .on li");
            min = -100 * aLi.length + 420;
            aLilen = aLi.length;
           timer = setInterval(function() {
               start -= 10;
               start = Math.max(start,min);
               oUl.style.left = start + "px";
           },13);
            console.log(start);
        };
        aSpan[1].onmouseenter = function () {
            oUl = document.querySelector("#imagegallery .on");
            aLi = document.querySelectorAll("#imagegallery .on li");
            min = -150 * aLi.length + 600;
            aLilen = aLi.length;
            timer = setInterval(function() {
                start += 10;
                start = Math.min(start,0);
                oUl.style.left = start + "px";
            },13);
        };
        aSpan[i].onmouseleave = function () {
            clearInterval(timer);
        };
    }
}
function move (obj,mJson,time,callBack) {
    var sVal = {},
        tVal = {},
        sTime = new Date();
    for (var key in mJson ) {
        sVal[key] = parseFloat(getStyle(obj,key));
        tVal[key] = parseFloat(mJson[key]);
    }
    m();
    function m () {
        var prop = (new Date() - sTime)/time;
        prop >= 1?prop = 1:requestAnimationFrame(m);
        for (var key in mJson) {
            if (key === 'opacity') {
                var o =sVal[key] + prop*(tVal[key] - sVal[key]);
                obj.style[key] = o;
                obj.style.filter = 'alpha(opacity'+ 100*o +')';
            }else{
                obj.style[key] = sVal[key] + prop*(tVal[key] - sVal[key]) + 'px';
            }
        }
        if (prop === 1) {
            callBack && callBack().call(obj);
        }
    }
    function getStyle(obj,atr) {
        return obj.currentStyle?obj.currentStyle[atr]:getComputedStyle(obj)[atr];
    }
}

// Favorite

function stripeTables() {
  if (!document.getElementsByTagName) return false;
  var tables = document.getElementsByTagName("table");
  for (var i=0; i<tables.length; i++) {
    var odd = false;
    var rows = tables[i].getElementsByTagName("tr");
    for (var j=0; j<rows.length; j++) {
      if (odd == true) {
        addClass(rows[j],"odd");
        odd = false;
      } else {
        odd = true;
      }
    }
  }
}

function highlightRows() {
  if(!document.getElementsByTagName) return false;
  var rows = document.getElementsByTagName("tr");
  for (var i=0; i<rows.length; i++) {
    rows[i].oldClassName = rows[i].className
    rows[i].onmouseover = function() {
      addClass(this,"highlight");
    }
    rows[i].onmouseout = function() {
      this.className = this.oldClassName
    }
  }
}

function displayAbbreviations() {
  if (!document.getElementsByTagName || !document.createElement || !document.createTextNode) return false;
  var abbreviations = document.getElementsByTagName("abbr");
  if (abbreviations.length < 1) return false;
  var defs = new Array();
  for (var i=0; i<abbreviations.length; i++) {
    var current_abbr = abbreviations[i];
    if (current_abbr.childNodes.length < 1) continue;
    var definition = current_abbr.getAttribute("title");
    var key = current_abbr.lastChild.nodeValue;
    defs[key] = definition;
  }
  var dlist = document.createElement("dl");
  for (key in defs) {
    var definition = defs[key];
    var dtitle = document.createElement("dt");
    var dtitle_text = document.createTextNode(key);
    dtitle.appendChild(dtitle_text);
    var ddesc = document.createElement("dd");
    var ddesc_text = document.createTextNode(definition);
    ddesc.appendChild(ddesc_text);
    dlist.appendChild(dtitle);
    dlist.appendChild(ddesc);
  }
  if (dlist.childNodes.length < 1) return false;
  var header = document.createElement("h3");
  var header_text = document.createTextNode("Abbreviations");
  header.appendChild(header_text);
  var articles = document.getElementsByTagName("article");
  if (articles.length == 0) return false;
  articles[0].appendChild(header);
  articles[0].appendChild(dlist);
}


// Contact

function focusLabels() {
  if (!document.getElementsByTagName) return false;
  var labels = document.getElementsByTagName("label");
  for (var i=0; i<labels.length; i++ ) {
    if (!labels[i].getAttribute("for")) continue;
    labels[i].onclick = function() {
      var id = this.getAttribute("for");
      if (!document.getElementById(id)) return false;
      var element = document.getElementById(id);
      element.focus();
    } 
  }
}

function resetFields(whichform) {
  if (Modernizr.input.placeholder) return;
  for (var i=0; i<whichform.elements.length; i++) {
    var element = whichform.elements[i];
    if (element.type == "submit") continue;
    if (!element.getAttribute('placeholder')) continue;
    element.onfocus = function() {
        if (this.value == this.getAttribute('placeholder')) {
            this.value = "";
        }
    };
    element.onblur = function() {
        if (this.value == "") {
            this.value = this.getAttribute('placeholder');
        }
    };
    element.onblur();
  }
}

function validateForm(whichform) {
  for (var i=0; i<whichform.elements.length; i++) {
    var element = whichform.elements[i];
    if (element.getAttribute("required") == 'required') {
      if (!isFilled(element)) {
        alert("Please fill in the "+element.name+" field.");
        return false;
      }
    }
    if (element.getAttribute("type") == 'email') {
      if (!isEmail(element)) {
        alert("The "+element.name+" field must be a valid email address.");
        return false;
      }
    }
  }
  return true;
}

function isFilled(field) {
  if (field.value.replace(' ','').length == 0) return false;
  var placeholder = field.placeholder || fied.getAttribute('placeholder');
  return (field.value != placeholder);
}

function isEmail(field) {
  return (field.value.indexOf("@") != -1 && field.value.indexOf(".") != -1);
}

function prepareForms() {
  for (var i=0; i<document.forms.length; i++) {
    var thisform = document.forms[i];
    resetFields(thisform);
    thisform.onsubmit = function() {
      if (!validateForm(this)) return false;
      var article = document.getElementsByTagName('article')[0];
      if (submitFormWithAjax(this, article)) return false;
      return true;
    }
  }
}

// Ajax

function getHTTPObject() {
  if (typeof XMLHttpRequest == "undefined")
    XMLHttpRequest = function () {
      try { return new ActiveXObject("Msxml2.XMLHTTP.6.0"); }
        catch (e) {}
      try { return new ActiveXObject("Msxml2.XMLHTTP.3.0"); }
        catch (e) {}
      try { return new ActiveXObject("Msxml2.XMLHTTP"); }
        catch (e) {}
      return false;
  };
  return new XMLHttpRequest();
}

function displayAjaxLoading(element) {
    // Remove the existing content.
  while (element.hasChildNodes()) {
      element.removeChild(element.lastChild);
  }
  //  Create a loading image.
  var content = document.createElement("img");
  content.setAttribute("src","images/loading.gif");
  content.setAttribute("alt","Loading...");
  // Append the loading element.
  element.appendChild(content);
}

function submitFormWithAjax( whichform, thetarget ) {
  
  var request = getHTTPObject();
  if (!request) { return false; }

  // Display a loading message.
  displayAjaxLoading(thetarget);

  // Collect the data.
  var dataParts = [];
  var element;
  for (var i=0; i<whichform.elements.length; i++) {
    element = whichform.elements[i];
    dataParts[i] = element.name + '=' + encodeURIComponent(element.value);
  }
  var data = dataParts.join('&');

  request.open('POST', whichform.getAttribute("action"), true);
  request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

  request.onreadystatechange = function () {
    if (request.readyState == 4) {
        if (request.status == 200 || request.status == 0) {
          var matches = request.responseText.match(/<article>([\s\S]+)<\/article>/);
          if (matches.length > 0) {
            thetarget.innerHTML = matches[1];
          } else {
            thetarget.innerHTML = '<p>Oops, there was an error. Sorry.</p>';
          }
        } else {
          thetarget.innerHTML = '<p>' + request.statusText + '</p>';
        }
    }
  };
  request.send(data);
  return true;
};


function loadEvents() {
  // home
  prepareSlideshow();
  // about
  prepareInternalnav();
  highlightPage();
  // photos
  preparePlaceholder();
  prepareGallery();
  highlightNav();
  prepareAsideUl();
  // favorite
  stripeTables();
  highlightRows();
  displayAbbreviations();
  // contact
  focusLabels();
  prepareForms();
}

// Load events
addLoadEvent(highlightPage);
addLoadEvent(loadEvents);

