final StringWriter writer = new StringWriter();
                IOUtils.copy(s3object.getObjectContent(), writer, FeedPipeConstants.UTF_8);
                finalJson = writer.toString();