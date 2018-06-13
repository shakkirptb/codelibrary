package com.lgi.mycare.app.page;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import javax.jcr.Node;
import javax.jcr.PathNotFoundException;
import javax.jcr.Property;
import javax.jcr.Value;

import org.apache.sling.commons.json.JSONObject;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.lgi.mycare.app.service.MyCareAppConfiguration;
import com.upc.component.AbstractComponent;

public class TooltipConfiguration extends AbstractComponent{

	private static final Logger LOGGER = LoggerFactory.getLogger(TooltipConfiguration.class);
	private List<List<String>> tooltipList=new ArrayList<List<String>>();
	String serverUrl;
	
	public String getServerUrl() {
		return serverUrl;
	}
	
	@Override
	public void doAction() {
		serverUrl = getService(MyCareAppConfiguration.class).getServerUrl();
		getAllTooltips();
	}
	private void getAllTooltips() {
		String componentPath = "/content/phonegap/mycare-app-pl/en/mobile-content/tooltip-config/jcr:content/content-par/tooltipconfig"; // path to component
		tooltipList.clear();
		try{
			Node node = getResourceResolver().getResource(componentPath).adaptTo(Node.class);
			List<Value> ValueList= new ArrayList<Value>();
			Property property=node.getProperty("tooltip");
			if(property!=null){
				if(property.isMultiple()){
					ValueList =new ArrayList<Value>(Arrays.asList(property.getValues()));
				}else{
					ValueList.add(property.getValue());
				}
				List<String> result=null;
				JSONObject obj=null;
				for(Value item:ValueList){
					result=new ArrayList<String>();
					obj =new JSONObject(item.toString());
					result.add(obj.get("key").toString());
					result.add(obj.get("header").toString());
					result.add(obj.get("text").toString());
					result.add(obj.get("hide").toString());
					tooltipList.add(result);
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
	}
	public List<List<String>> getTooltipList() {
		return tooltipList;
	}

	public void setTooltipList(List<List<String>> tooltipDialogList) {
		this.tooltipList = tooltipDialogList;
	}
}
