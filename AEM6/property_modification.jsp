<%@page import="java.util.Random"%>
<%@page import="java.io.PrintWriter"%>
<%@include file="/libs/foundation/global.jsp"%>
<%@page import="javax.jcr.Session"%>
<%@page session="false"
	import="
                  org.apache.sling.api.resource.Resource,
                  org.apache.sling.api.resource.ResourceUtil,
                  org.apache.sling.api.resource.ValueMap,
                  org.apache.sling.api.resource.ResourceResolver,
                  org.apache.sling.api.resource.ResourceMetadata,
                  org.apache.sling.api.wrappers.ValueMapDecorator,
                  java.util.List,
                  java.util.Random,
				  javax.servlet.jsp.JspWriter,
                  org.apache.sling.api.scripting.SlingScriptHelper,
                  java.util.ArrayList,
                  org.apache.jackrabbit.vault.packaging.JcrPackage,
                  org.apache.jackrabbit.vault.packaging.JcrPackageDefinition,
                  org.apache.jackrabbit.vault.fs.config.DefaultWorkspaceFilter,
                  java.util.HashMap,
                  org.apache.jackrabbit.vault.packaging.JcrPackageManager,
                  java.util.Map,
                  java.io.File,
                  org.apache.jackrabbit.vault.fs.api.PathFilterSet,
                  com.day.cq.dam.api.Asset,
                  java.util.Locale,
                  org.apache.jackrabbit.vault.packaging.PackagingService,
                  com.carnival.platform.utils.PageUtil,
                  java.text.SimpleDateFormat,
                  com.adobe.granite.ui.components.ds.DataSource,
                  com.adobe.granite.ui.components.ds.EmptyDataSource,
                  com.adobe.granite.ui.components.ds.SimpleDataSource,
                  com.adobe.granite.ui.components.ds.ValueMapResource,
                  com.day.cq.wcm.api.Page,
                  com.day.cq.wcm.api.PageManager,
                  javax.jcr.query.QueryManager,
                  javax.jcr.query.Query,
                  javax.jcr.query.QueryResult,
				  java.text.SimpleDateFormat,
				  java.text.ParseException,
				  java.util.Date;"%>
<%
	
%><%@taglib prefix="cq" uri="http://www.day.com/taglibs/cq/1.0"%>
<%
	
%><cq:defineObjects />
<%
	ResourceResolver resolver = resource.getResourceResolver();
    Session session=resolver.adaptTo(Session.class);
	QueryManager queryManager = session.getWorkspace().getQueryManager();

	String queryStatement ="SELECT * from [nt:base] AS t where ISDESCENDANTNODE('/content/myProjectchina') and contains(t.*, '/content/dam/myProject')";

	Query query = queryManager.createQuery(queryStatement, "JCR-SQL2");
	QueryResult queryResult = query.execute();
	Map<String,String> replacementMap=new HashMap();
	NodeIterator nodeIterator = queryResult.getNodes();
	int count=0;
	//out.println(nodeIterator.getSize()+"");
		while (nodeIterator.hasNext()) {
	       Node masterNode= nodeIterator.nextNode();
	       PropertyIterator pi = masterNode.getProperties(); 

	        //out.println(masterNode.getPath());
	        while(pi.hasNext())
	            {
	               Property p = pi.nextProperty(); 
	               if(!p.isMultiple())
                   {
	               	String val = p.getValue().getString();
	               	if (val.contains("/content/dam/myProject/"))
	               		{
%>
<table>
<tr>
<td><%out.println(p.getString()+"\n");%></td>
</tr>
</table>

                          <% 	String newVal=val.replace("/content/dam/myProject/","/content/dam/myProjectchina/");
                        p.setValue(newVal);
                        session.save();
							replacementMap.put(val,newVal);
	            			count++;
	               		}
              	   }
	            }
		} 
		out.println("Replaced no of items is "+count);
		for (Map.Entry<String,String> entry : replacementMap.entrySet())
		{
           // out.println("Key = " + entry.getKey() +", Value = " + entry.getValue()); 

            //out.println("Value = " + entry.getValue());
		}

	%>

	





