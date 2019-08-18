    /**
     * This method constructs the JSON from the given Excel sheet.
     *
     * @param s3object
     *            the s3object
     * @return the JSON string
     * @throws InvalidFormatException
     *             Signals that an Invalid Format exception has occurred.
     * @throws IOException
     *             Signals that an I/O exception has occurred.
     * @throws JSONException
     *             Signals that an JSON exception has occurred.
     */
    public static String getFaqJson(S3Object s3object) throws InvalidFormatException, IOException, JSONException {
        JSONArray rows = new JSONArray();
        InputStream in = s3object.getObjectContent();
        Workbook workbook = WorkbookFactory.create(in);
        Sheet sheet = workbook.getSheetAt(0);

        for (int i = 1; i <= sheet.getLastRowNum(); i++) {
            Row row = sheet.getRow(i);
            JSONObject jCell = new JSONObject();
            JSONArray tagsArray = new JSONArray();
            DataFormatter formatter = new DataFormatter();
            jCell.put("ID", formatter.formatCellValue(row.getCell(0)));
            jCell.put("Question", formatter.formatCellValue(row.getCell(1)));
            jCell.put("Answer", formatter.formatCellValue(row.getCell(2)));

            String[] tags = formatter.formatCellValue(row.getCell(3)).split("\r?\n");
            for (String tagName : tags) {
                tagsArray.put(tagName);
            }
            jCell.put("Tags", tagsArray);

            if (jCell.length() > 0) {
                rows.put(jCell);
            }
        }
        return rows.toString();
    }