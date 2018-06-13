    <%@page session="false" %><%
%> <%@include file="/apps/myproj/global/global.jsp"%><%
%>
<%@page import="com.day.cq.wcm.api.components.IncludeOptions"%>
<%@page import="com.day.cq.wcm.api.WCMMode"%>
<%
    if (WCMMode.fromRequest(request) != WCMMode.EDIT && WCMMode.fromRequest(request) != WCMMode.DESIGN) {
              IncludeOptions.getOptions(request, true).forceSameContext(Boolean.TRUE);
    }
%>
<c:set var="tooltipKey" value="${property:singleValue(resource,'key','')}" />
<c:set var="tooltip" value="${myapp:getTooltip(slingRequest,tooltipKey)}"/>
<c:if test="${wcmModeIsEdit or (not empty tooltip[0]) or (not empty tooltip[1])}">
	<span class='toolTipOverLay' onclick="tooltipOpen(this)">
		<span class='tHeader'>${tooltip[0]}</span>
		<span class='tText'>${tooltip[1]}</span>
		<img src='/etc/designs/phonegap/myproj/clientlibsall/css/image/tooltip.png'>
	</span>
</c:if>
<c:remove var="tooltip"/>
<c:remove var="tooltipKey"/>

<%--
<cq:include resourceType="/apps/myproj/components/tooltipComponent" path="newTooltipNodeName" />
 --%>
