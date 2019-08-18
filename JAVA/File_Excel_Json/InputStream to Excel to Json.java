    /**
     * Gets the ports json.
     *
     * @param s3object
     *            the s 3 object
     * @return the ports json
     * @throws InvalidFormatException
     *             the invalid format exception
     * @throws IOException
     *             Signals that an I/O exception has occurred.
     * @throws JSONException
     *             the JSON exception
     */
    public static String getContentJsonFromExcel(S3Object s3object) throws InvalidFormatException, IOException, JSONException {
        JSONArray rows = new JSONArray();
        InputStream in = s3object.getObjectContent();
        Workbook workbook = WorkbookFactory.create(in);
        Sheet sheet = workbook.getSheetAt(0);
        Row headerRow = sheet.getRow(0);
        for (int i = 2; i <= sheet.getLastRowNum(); i++) {
            Row row = sheet.getRow(i);
            JSONObject jCell = new JSONObject();
            DataFormatter formatter = new DataFormatter();
            int count = 0;
            while (count <= headerRow.getLastCellNum()) {
                jCell.put(formatter.formatCellValue(headerRow.getCell(count)), formatter.formatCellValue(row.getCell(count)));
                count++;
            }
            if (jCell.length() > 0) {
                rows.put(jCell);
            }
        }
        return rows.toString();
    }