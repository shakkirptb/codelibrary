package com.lgi.mycare.app.taglibs;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import javax.jcr.Node;
import javax.jcr.PathNotFoundException;
import javax.jcr.Property;
import javax.jcr.RepositoryException;
import javax.jcr.Value;

import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.api.resource.ResourceUtil;
import org.apache.sling.commons.json.JSONObject;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.upc.taglib.UpcTagSupportImpl;


@SuppressWarnings("serial")
public class MyCareAppTaglibFunctions extends UpcTagSupportImpl {
	
	private static final Logger LOGGER = LoggerFactory.getLogger(MyCareAppTaglibFunctions.class);

	public static List<String> getTooltip(SlingHttpServletRequest request, String key) {
		String componentPath = "/content/phonegap/mycare-app-pl/en/mobile-content/tooltip-config/jcr:content/content-par/tooltipconfig"; // path to component
		List<String> result=new ArrayList<String>();
		
		try{
			Node node = request.getResourceResolver().getResource(componentPath).adaptTo(Node.class);
			List<Value> ValueList= new ArrayList<Value>();
			Property property=node.getProperty("tooltip");
			if(property!=null){
				if(property.isMultiple()){
					ValueList =new ArrayList<Value>(Arrays.asList(property.getValues()));
				}else{
					ValueList.add(property.getValue());
				}
				for(Value item:ValueList){
					JSONObject obj =new JSONObject(item.toString());
					if(obj.get("key").toString().equals(key)){
						if(obj.get("hide").toString().equals("false")){
							result.add(obj.get("header").toString());
							result.add(obj.get("text").toString());
						}
						return result;
					}
				}
			}else{
				LOGGER.info("No Tooltip properties set");
			}
		}catch(PathNotFoundException e){
			LOGGER.error("No Tooltip properties found on the given Node");
		}catch(NullPointerException e){
			LOGGER.error("No Tooltip component on the given node",e);
		}catch(Exception e){
			LOGGER.error("Error retriving tooltip values!",e);
		}
		return result;
	}
}
