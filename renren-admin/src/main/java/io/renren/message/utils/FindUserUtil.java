package io.renren.message.utils;

import io.netty.channel.ChannelId;
import org.apache.http.util.TextUtils;

import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.ConcurrentMap;

// TODO: 2020/8/17 后期加入redis
// TODO: 2020/8/17 多value问题 需加入判断
//用户关系存放
public class FindUserUtil {
    private static ConcurrentMap<String, List<String>> ChannelMap = new ConcurrentHashMap();//项目key--通道id
    private static ConcurrentMap<String, String> flagMap = new ConcurrentHashMap();//通道id--标识名字//唯一
    private static ConcurrentMap<String, List<String>> labelMap = new ConcurrentHashMap();//通道id--标签名字//多标签

    /**
     * 插入用户
     *
     * @param key
     * @param id
     */
    public static void addChannel(String key, String id) {
        if (ChannelMap.containsKey(key)) {
            List<String> datas = ChannelMap.get(key);
            datas.add(id);
        } else {
            List<String> datas = new ArrayList<>();//非线程安全
            datas.add(id);
            ChannelMap.put(key, datas);
        }
    }

    public static void addFlag(String id, String flag) {
        if(TextUtils.isBlank(flag)){
            return;
        }
        flagMap.put(id, flag);
    }


    public static void addLabel(String id, List<String> labels) {
        if(labels.size()<=0){
            return;
        }
        labelMap.put(id, labels);
    }

    public static void remove(String id) {
        boolean isCarry = true;
        for (String k : ChannelMap.keySet()) {
            List<String> v = ChannelMap.get(k);
            for (String it : v) {
                if (it.equals(id)) {
                    v.remove(it);
                    isCarry = false;
                    break;
                }
            }
            if (!isCarry) {
                break;
            }
        }

        flagMap.remove(id);
        labelMap.remove(id);
    }
}
