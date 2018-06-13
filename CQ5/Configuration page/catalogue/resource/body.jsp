<%@page session="false"%><%--
  Copyright 1997-2008 Day Management AG
  Barfuesserplatz 6, 4001 Basel, Switzerland
  All Rights Reserved.

  This software is the confidential and proprietary information of
  Day Management AG, ("Confidential Information"). You shall not
  disclose such Confidential Information and shall use it only in
  accordance with the terms of the license agreement you entered into
  with Day.

  ==============================================================================

  Scaffolding component

  Displays and provides editing of scaffoldings

--%><%@include file="/apps/mvno-ie/global.jsp"%><%
%><%@ page import="
        org.apache.sling.api.resource.ResourceUtil,
        com.day.cq.i18n.I18n,
        com.day.cq.wcm.api.WCMMode,
        com.day.cq.wcm.core.utils.ScaffoldingUtils" %><%
%>
<body>
    <cq:includeClientLib categories="apps.mvno.componentslibs.catalogue" />
    <script src="/libs/cq/ui/resources/cq-ui.js" type="text/javascript"></script>
<%

	
	String contentPath = component.getProperties().get( "contentPath", "" ); 
	String dlgPath = component.getPath() + "/dialog";
    String templatePath = ""; // "/apps/dcomm/unitymedia-de/catalogue/product"; // properties.get("cq:targetTemplate", "");
    String scaffoldPath = resourcePage.getPath();
    String formUrl = contentPath + "/*";
    boolean pageMode = templatePath.length() > 0;
    boolean isUpdate = false;
    if (!resourcePage.getPath().equals(currentPage.getPath())) {
        contentPath = currentPage.getPath();
        formUrl = currentPage.getPath();
        isUpdate = true;
        pageMode = true;
/*    } else if (request.getAttribute(ScaffoldingUtils.CONTEXT_RESOURCE_ATTR_NAME) != null) {
        contentPath = ((Resource) request.getAttribute(ScaffoldingUtils.CONTEXT_RESOURCE_ATTR_NAME)).getPath();
        formUrl = contentPath;
        isUpdate = true;
        pageMode = false;
*/    } else {
    	contentPath = resource.getPath();
        formUrl = contentPath;
        isUpdate = true;
        pageMode = false;
    }

%><%--
<textarea cols="130" rows="20">
resource: <%= resource.getPath() %>

resourcePage: <%= resourcePage.getPath() %>
currentPage: <%= currentPage.getPath() %>
equals: <%= resourcePage.getPath().equals(currentPage.getPath()) %>

CONTEXT_RESOURCE_ATTR_NAME: <%= ScaffoldingUtils.CONTEXT_RESOURCE_ATTR_NAME %>
getAttribute: <%= request.getAttribute(ScaffoldingUtils.CONTEXT_RESOURCE_ATTR_NAME) %>

contentPath: <%= contentPath %>
formUrl: <%= formUrl %>
isUpdate: <%= isUpdate %>
pageMode: <%= pageMode %>
</textarea>
--%><%

    String title = null;
    if (isUpdate) {
        Resource contentResource = resourceResolver.getResource(contentPath);
        ValueMap contentProperties = ResourceUtil.getValueMap(contentResource);
        title = contentProperties.get("title1", contentResource.getName()); %>
        <h1><%= currentPage.getTitle() %> | <%= title %></h1><%
    } else {
        title = pageProperties.get("title1", currentPage.getName()); %>
        <h1><%= title %></h1><%
        if (WCMMode.fromRequest(request) == WCMMode.DESIGN) { %>
            <%= i18n.get("You can edit this form using the dialog editor: ") %><a target="_new" href="<%= dlgPath %>.html"></a><br></body><%
            return;
        }
        String description = properties.get("jcr:description", "");
        if (description.length() > 0) {
            %><em><%= description %></em><br><br><%
        }
        if (scaffoldPath.equals("/etc/scaffolding")) { %>
            </body><%
            return;
        }
        if (contentPath.length() == 0) { %>
            <%= i18n.get("Please define the target path in the page properties of this scaffolding.")%><br></body><%
            return;
        } else if (pageMode) { %>
            <h3><%= i18n.get("Create pages below: ")%><span id="parentpath"><%= contentPath %></span> (<a href="javascript:changeParentPath()"><%= i18n.get("change")%></a>)</h3>
            <ul id="linklist"></ul><%
        } else { %>
            <h3><%= i18n.get("Create resources below: ")%><span id="parentpath"><%= contentPath %></span> (<a href="javascript:changeParentPath()"><%= i18n.get("change")%></a>)</h3>
            <ul id="linklist"></ul><%
        }
    }
    %><br>

<div id="CQ">
    <div id="dlg"></div>
</div>

<script type="text/javascript">

    // undo/redo is not allowed when in scaffolding mode (but undo history is active, as
    // we're recording the update)
    if (CQ.undo.UndoManager.isEnabled()) {
        CQ.undo.UndoManager.getHistory().block();
    }

    document.title = "<%= title %>";

    var parentPath = "<%= contentPath %>";
    var browseRoot = parentPath;
    var pageMode = <%= pageMode %>;
    var isUpdate = <%= isUpdate %>;

    var myForm;

    function changeParentPath() {
        var browseDialog = new CQ.BrowseDialog({
            treeRoot: {
                name: browseRoot.substring(1),
                text: browseRoot
            },
            treeLoader: {
                dataUrl: CQ.shared.HTTP.getXhrHookedURL(CQ.Util.externalize("/bin/tree/ext.json")),
                baseParams: {
                    "_charset_": "utf-8"
                },
                createNode: function(attr) {
                    attr.text = attr.name;   // use plain node name for tree nodes
                    return CQ.Ext.tree.TreeLoader.prototype.createNode.call(this, attr);
                }
            },
            path: parentPath,
            ok: function() {
                parentPath = browseDialog.getSelectedPath();
                browseDialog.hide();
                myForm.getForm().url = CQ.HTTP.externalize(parentPath + "/*");
                document.getElementById("parentpath").innerHTML = CQ.shared.XSS.getXSSValue(parentPath);
            }
        });
        browseDialog.show();
    }

    CQ.Ext.onReady(function() {
        /**
         * An array containing the xtype of widgets that need to call
         * their processRecord function even when creating a new page
         */
        var forcedFields = ["smartfile", "smartimage", "html5smartfile", "html5smartimage"];

        myForm = new CQ.Ext.form.FormPanel({
            //standardSubmit: false,
            url: CQ.HTTP.externalize("<%= formUrl %>"),
            buttonAlign: "left",
            border:false,
            processExternalDialog: function(data) {
                if (data && data.items) {
                    if (data.items instanceof Array) {
                        for (var i = 0; i < data.items.length; i++) {
                            this.processExternalItem(data.items[i]);
                        }
                    } else {
                        this.processExternalItem(data.items);
                    }
                }
            },

            processExternalItem: function(tab) {
                if (tab["xtype"] == "tabpanel") {
                    this.processExternalDialog(tab);
                } else {
                    if (tab instanceof Array) {
                        for (var i=0; i<tab.length; i++) {
                            this.processExternalItem(tab[i]);
                        }
                    } else {
                        var include = tab;
                        if (tab["xtype"] == "panel") {
                            include = CQ.Util.applyDefaults(include, {
                                layout: "form",
                                autoScroll: true,
                                border: true,
                                bodyStyle: CQ.themes.Dialog.TAB_BODY_STYLE,
                                labelWidth: CQ.themes.Dialog.LABEL_WIDTH,
                                defaultType: "textfield",
                                "stateful": false,
                                defaults: {
                                    msgTarget: CQ.themes.Dialog.MSG_TARGET,
                                    anchor: CQ.themes.Dialog.ANCHOR,
                                    "stateful": false
                                }
                            });
                        }
                        include.header = true;
                        include.border = true;
                        include.headerAsText = true;
                        if (!include.title) {
                            include.title = "untitled";
                        }
                        this.add(include);
                    }
                }
            },

            /**
             * Loads the content from the given data store or path.
             * @param {Store/String} content The data store or path
             */
            loadContent: function(content) {
                var store;
                if (typeof(content) == "string") {
                    this.path = content;
                    var url = CQ.HTTP.externalize(this.path);
                    if (pageMode) {
                        url += "/jcr:content";
                    }
                    store = new CQ.data.SlingStore({"url": url + ".infinity.json"});
                } else if (content instanceof CQ.Ext.data.Store) {
                    store = content;
                }
                if (store) {
                    store.load({
                        callback: this.processRecords,
                        scope: this
                    });
                }
            },

            /**
             * Processes the given records. This method should only be used as
             * a callback by the component's store when loading content.
             * @param {CQ.Ext.data.Record[]} recs The records
             * @param {Object} opts The options such as the scope (optional)
             * @param {Boolean} success <code>true</code> if retrieval of records was
             *        successful, <code>false</code> otherwise
             * @private
             */
            processRecords: function(recs, opts, success) {
                var rec;
                if (success) {
                    rec = recs[0];
                    if (pageMode) {
                        rec.data = { "jcr:content" : rec.data };
                    }
                } else {
                    CQ.Log.warn("scaffolding processRecords: retrieval of records unsuccessful");
                    rec = new CQ.data.SlingRecord();
                    rec.data = {};
                }
                rec.data.allowUpload = isUpdate;
                CQ.Log.debug("scaffolding processRecords: processing records for fields");
                var scope = opts.scope ? opts.scope : this;
                var fields = CQ.Util.findFormFields(this);
                for (var name in fields) {
                    for (var i = 0; i < fields[name].length; i++) {
                        try {
                            if (fields[name][i].processPath) {
                                CQ.Log.debug("scaffolding processRecords: calling processPath of field '{0}'", [name]);
                                fields[name][i].processPath(this.path);
                            }
                            if (isUpdate || ($CQ && $CQ.inArray(fields[name][i].xtype, forcedFields) !== -1)) {
                                if (!fields[name][i].initialConfig.ignoreData) {
                                    CQ.Log.debug("scaffolding processRecords: calling processRecord of field '{0}'", [name]);
                                    fields[name][i].processRecord(rec, this.path);
                                }
                            }
                        }
                        catch (e) {
                            CQ.Log.debug("scaffolding processRecords: {0}", e.message);
                        }
                    }
                }
                //this.fireEvent("loadContent", this);

                // prepare creating an undo step from the update operation
                if (CQ.undo.UndoManager.isEnabled()) {
                    CQ.undo.util.UndoUtils.addUndoMarker(this);
                    CQ.undo.UndoManager.getHistory().prepareUndo(
                            new CQ.undo.util.OriginalData(this.path, rec, this, true));
                }
            },


            /**
             * Processes the given records. This method should only be used as
             * a callback by the component's store when loading content.
             */
            processPath: function(path) {
                var fields = CQ.Util.findFormFields(this);
                for (var name in fields) {
                    for (var i = 0; i < fields[name].length; i++) {
                        try {
                            if (fields[name][i].processPath) {
                                fields[name][i].processPath(path);
                            }
                        }
                        catch (e) {
                            CQ.Log.debug("scaffolding processPath: {0}", e.message);
                        }
                    }
                }
            },

            getActiveTab: function() {
                return this;
            }
        });
        myForm.addButton({
            text: isUpdate ? CQ.I18n.getMessage("Update") : CQ.I18n.getMessage("Create"),
            handler: function() {
                var frm = myForm.getForm();
                var title;
                var params = {
                    "_charset_": "utf-8"
                };
                if (pageMode) {
                    params["./jcr:content/cq:scaffolding"] = "<%= scaffoldPath %>";
                    title = frm.findField("./jcr:content/title1");
                } else {
                    params["./cq:scaffolding"] = "<%= scaffoldPath %>";
                    title = frm.findField("./title1");
                }
                if (!isUpdate) {
                    if (pageMode) {
                        params["./jcr:primaryType"] = "cq:Page";
                        params["./jcr:content@CopyFrom"] = "<%= templatePath %>/jcr:content";
                        params["./jcr:content/jcr:primaryType"] = "cq:PageContent";
                        // Note: cq:PageContent inherits from cq:Taggable; no need to check for ./cq:tags field
                    } else {
                        params["./jcr:primaryType"] = "nt:unstructured";
                        if (frm.findField("./cq:tags")) {
                            params["./jcr:mixinTypes"] = "cq:Taggable";
                            params["./jcr:mixinTypes@TypeHint"] = "String[]";
                        }
                    }
                }
                if (title) {
                    var hint = title.getValue();
                    if (hint) {
                        params[":nameHint"] = hint;
                    }
                }

                var action = new CQ.form.SlingSubmitAction(frm, {
                    params: params,
                    success: function(frm, resp) {
                        var contentPath = resp.result["Path"];
                        var url = CQ.HTTP.externalize(contentPath);
                        if (pageMode) {
                            url += ".html";
                        } else {
                            url += ".scaffolding.html";
                        }
                        if (isUpdate) {
                            //CQ.Ext.Msg.alert("Success", "Updated " + contentPath);
                            CQ.Util.reload(CQ.WCM.getContentWindow(), url);
                        } else {
                            //CQ.Ext.Msg.alert("Success", "Created page " + contentPath);
                            var title = contentPath;
                            var html = "<li><a href='"+ CQ.shared.XSS.getXSSValue(url) + "'>" + CQ.shared.XSS.getXSSValue(title) + "</a></li>";
                            CQ.Ext.DomHelper.append("linklist", html);
                            frm.reset();
                            window.scrollTo(0,0);
                            frm.findField(0).focus();
                        }
                    }
                });
                frm.doAction(action);
            }
        });
        var url = CQ.HTTP.externalize("<%= dlgPath %>.infinity.json");
        var data = CQ.HTTP.eval(url);
        if (data) {
            var ct = CQ.utils.Util.formatData(data);
            myForm.processExternalDialog(ct);
        }
        myForm.render("dlg");
        myForm.loadContent(parentPath);
        // hack: register ourselves as dialog, so that the DD from the contentfinder works
        CQ.WCM.registerDialog("<%= dlgPath %>", myForm);

        myForm.fireEvent("activate", myForm);
        myForm.getForm().findField(0).focus();
        window.scrollTo(0,0);
    });
</script>
</body>
