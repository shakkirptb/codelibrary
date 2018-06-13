/*
//Tooltip
$(function(){
	var clickHandler = "click touchstart";
	if($('#tooltipModal.toolTip').length==0){
		$('body').append('<div id="tooltipModal" class="toolTip"><div class="toolTipBody"><div class="ttHeader"> Header Text </div><div class="ttText"><p></p></div><div class="ttClose">	<a href="#" title="Close"><img src="/etc/designs/phonegap/mycare-app-pl/clientlibsall/css/image/CloseButton.png"><span>Close</span></a></div></div></div>');
	}	
	$("div.toolTip").on(clickHandler,function(){
		this.style.opacity=0;
		this.style.style.visibility="hidden";
		return false;
	});
	
	$('.toolTipOverLay').on(clickHandler,function(){
		var tooltip=$("div.toolTip");
		tooltip.find('.ttHeader').html($(this).find('.tHeader').html());
		tooltip.find('.ttText p').html($(this).find('.tText').html());
		tooltip[0].style.visibility="visible";
		tooltip[0].style.opacity=1;
		return false;
	});	
});
*/

/*JS alternative for toooltip*/
function fadeOut($element){
	$element.style.opacity=0;
	$element.style.visibility="hidden";
}
var tModal=document.getElementById("tooltipModal");
if(tModal == undefined || tModal == null){
  var tModalDiv=document.createElement('div'); 
  tModalDiv.innerHTML='<div id="tooltipModal" class="toolTip" onClick="fadeOut(this)"><div class="toolTipBody"><div class="ttHeader"> Header Text </div><div class="ttText"></div><div class="ttClose"><img src="/etc/designs/phonegap/mycare-app-pl/clientlibsall/css/image/CloseButton.png"><span>Close</span></div></div></div>';
  var bd=document.getElementsByTagName("BODY")[0];
	bd.appendChild(tModalDiv);
}

function tooltipOpen(element){
	var tModal=document.getElementById("tooltipModal");
	tModal.getElementsByClassName('ttHeader')[0].innerHTML = element.getElementsByClassName('tHeader')[0].innerHTML;
	tModal.getElementsByClassName('ttText')[0].innerHTML = element.getElementsByClassName('tText')[0].innerHTML;	
	tModal.style.visibility="visible";
	tModal.style.opacity=1;
}
