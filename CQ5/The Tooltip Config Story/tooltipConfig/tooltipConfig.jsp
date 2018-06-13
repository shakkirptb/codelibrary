    <%@page session="false" %><%
%> <%@include file="/apps/myproj/global/global.jsp"%><%
    String headerText = currentPage.getTitle();
%><%
%>
<%@ page import="org.apache.sling.commons.json.JSONObject" %>
<%@ page import="org.apache.sling.commons.json.JSONArray" %>
<%
%>
<upc:action bean="com.lgi.mycare.app.page.TooltipConfiguration" id="tooltipValues" />
<div id="tootipConfig">
	<table border="1" style="width:100%">
		<tr>
			<td><b>SlNo.</b></td>
			<td><b>Key</b></td>
			<td><b>Header</b></td>
			<td><b>Value</b></td>
			<td><b>Hide</b></td>
		</tr>
		<c:forEach var="item" items="${tooltipValues.tooltipList}" varStatus="loop">
			<tr>
				<td>${loop.count}</td>
				<td>${item[0]}</td>
				<td>${item[1]}</td>
				<td>${item[2]}</td>
				<td><input type="checkbox" disabled="disabled" ${item[3] == "true"?"checked='checked'":""}/></td>
				<td> <span class="toolTipOverLay">
					<span class="tHeader">${item[1]}</span>
					<span class="tText">${item[2]}</span>
					<img src="/etc/designs/phonegap/myproj/clientlibsall/css/image/tooltip.png">		  
			     	</span> 
			     </td>
			</tr>
			<c:set var="rowNum" value="1"/>
		</c:forEach>
	</table>
	<br>
	Tooltip Structure demo
	<br>
	<div id="demoToolTipBody" class="toolTipBody">
		<div class="ttHeader"> Header Text </div>
		<div class="ttText"><p>This is how your Tooltip content will be displayed in the Toolip popup.</p></div>
		<div class="ttClose"><a title="Close" href="#" class=""><img src="/etc/designs/phonegap/myproj/clientlibsall/css/image/CloseButton.png"><span>Close</span></a></div>
	</div>
	<br>
	This is a sampleTooltip<cq:include resourceType="/apps/myproj/components/tooltipComponent" path="sampleTooltip" />
	<br>
</div>
