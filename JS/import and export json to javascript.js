  function exportJsonToFile(data) {   
    var fileName = 'university-settings';//prompt('Enter file name (without extension)');
    if (fileName === null) {
        return; //break out of the function early
    }
    var json = JSON.stringify(data);
    console.log(json);
    
    var blob = new Blob([json], {type: "application/json"});
    var url  = URL.createObjectURL(blob);

    var a = document.createElement('a');
    a.download    = (fileName || 'university-settings') +".json";
    a.href        = url;
    a.click();
    a.remove();
  };
  
   /**
   *
   * @param {any} file
   * @return {any}
   */
  async function importJsonFromFile(file) {  
      let jsonObj = await new Promise((resolve) => {
          let reader = new FileReader();
          reader.onload = (e) => resolve(JSON.parse(reader.result));
          reader.readAsText(file);
      });
      
      console.log(JSON.stringify(jsonObj));
      return jsonObj;   
  };
    //  import html
           //<label for="myfile" class="white-button button-s oj-flex-item">Import<span class="fa fa-download" style="padding-left: 7px;"></span>
           //<input accept="application/json" class="hidden oj-flex-item" type="file" id="myfile" name="myfile" on-change="[[$listeners.importButtonClick]]"></label>
