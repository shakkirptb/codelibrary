import java.util.Arrays;
import java.io.*;
import java.util.*;

class FileDeduplicator {
	public static void main(String[] args) {
		if(args.length >= 2  && args[0].equals("-d") ){
			System.out.println("compressing... " + args[1]);
			dedup(args[1],args[1]+".compressed");
			System.out.println("completed : " + args[1] + ".compressed");
			return;
		}else if(args.length >= 2 && args[0].equals("-r") && args[1].indexOf(".compressed") != -1){
			System.out.println("decompressing " + args[1] + "...");
			redup(args[1],args[1].replace(".compressed",""));
			System.out.println("completed..");
			return;
		}
		System.out.println("something went wrong!");
	}
    public static void dedup(String inpath, String outpath) {
        try(FileInputStream is = new FileInputStream(new File(inpath));
                FileOutputStream os = new FileOutputStream(new File(outpath));
        		ObjectOutputStream obs=new ObjectOutputStream(os);){
            
            
            final int BUFF_SIZE=1024;
            
            List<byte[]> lookup=new ArrayList<>();
            List<Integer> fileIndex = new ArrayList<>();
            Map<Integer,Object> outMap=new HashMap<>();
            outMap.put(0,lookup);
            outMap.put(1,fileIndex);

            byte[] bufObj=new byte[BUFF_SIZE];
            while((is.read(bufObj)) != -1){
                Integer existObjIndex = chunkExist(lookup,bufObj);
                
                if(existObjIndex == null){
                    existObjIndex = lookup.size();
                    lookup.add(bufObj);
                    
                }
                fileIndex.add(existObjIndex);
                bufObj=new byte[BUFF_SIZE];
            }
            
            obs.writeObject(outMap);
        }catch(Exception e){
        }
    }
    private static Integer chunkExist(List<byte[]> lookup,byte[] newby){
        int i=0;
        for(byte[] by:lookup){
            if(Arrays.equals(by,newby)){
                return i;
            }
            i++;
        }
        return null;
    }
    
    public static boolean redup(String inpath, String outpath) {
        
    	try (FileInputStream is = new FileInputStream(new File(inpath));
        		FileOutputStream os = new FileOutputStream(new File(outpath));
        		ObjectInputStream obs=new ObjectInputStream(is);){
            
            Map<Integer,Object> outMap = (HashMap)obs.readObject();

            List<byte[]> lookup=(ArrayList)outMap.get(0);
            List<Integer> fileIndex = (ArrayList)outMap.get(1);
            for(Integer i:fileIndex){
                os.write(lookup.get(i));
            }

            return true;
        }catch(Exception e){
        }
        return false;
        
    }
}

