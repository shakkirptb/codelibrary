        final CopyObjectRequest copyObjRequest = new CopyObjectRequest((String) bindingsMap.get(FeedPipeConstants.BUCKET_NAME), filePath,
                (String) bindingsMap.get(FeedPipeConstants.BUCKET_NAME), archivePath);
        s3client.copyObject(copyObjRequest);
        s3client.deleteObject(new DeleteObjectRequest((String) bindingsMap.get(FeedPipeConstants.BUCKET_NAME), filePath));