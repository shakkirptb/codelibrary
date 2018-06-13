<%@page session="false" %><%
%><%@include file="/apps/generic/global.jsp"%><%
    String headerText = currentPage.getTitle();
%>
<div class="modal">
	Configurations
	<%--int rowCount=0; --%>
	<%--=properties.get("tooltip", "") --%>
	<table border="1">
		<thead>
			<tr>
				<th>SlNo.</th>
				<th>Key</th>
				<th>Value</th>
				<th>Hide</th>
			</tr>
		</thead>
		<tbody>
			<tr>
				<td><%--=++rowCount --%></td>
				<td></td>
				<td></td>
				<td></td>
			</tr>
		</tbody>
	</table>
</div>