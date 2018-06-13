    <%@page session="false" %><%
%> <%@include file="/apps/myproj/global/global.jsp"%><%
%>
<%@ page import="org.apache.sling.commons.json.JSONObject" %>
<%@ page import="org.apache.sling.commons.json.JSONArray" %>
<upc:action bean="com.lgi.mycare.app.page.TooltipConfiguration" id="tooltipValues" />
[
<c:forEach var="item" items="${tooltipValues.tooltipList}" varStatus="loop">
{
value: "${item[0]}",
text: "${item[0]}",
qtip: "${item[1]}"
}
${!loop.last ? ',' : ''}
</c:forEach>
]